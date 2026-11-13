import * as mc from '@minecraft/server';

const { world, system } = mc;

// Configuration (tweak these to balance regen)
const REGEN_TICKS = 5;                // run every 5 ticks (≈0.25s)
const BASE_REGEN_PER_SECOND = 1;       // rank 0 regen (energy/sec)
const EXTRA_REGEN_PER_RANK = 0.5;      // additional energy/sec per rank
const MAX_REGEN_PER_SECOND = 50;       // hard cap to avoid runaway regen

export function regenPerSecondForRank(rank = 0) {
  const r = Math.floor(BASE_REGEN_PER_SECOND + (Number(rank) || 0) * EXTRA_REGEN_PER_RANK);
  return Math.max(0, Math.min(MAX_REGEN_PER_SECOND, r));
}

// Per-second (every REGEN_TICKS) energy regeneration.
system.runInterval(() => {
  const energyObj = world.scoreboard.getObjective("energy");
  const energyMaxObj = world.scoreboard.getObjective("energyMax");
  const rankObj = world.scoreboard.getObjective("rank");
  if (!energyObj || !energyMaxObj) return; // scoreboard not ready

  for (const player of world.getPlayers()) {
    try {
      // skip when any disabling tag is present or player is on a cooldown (cd != 0)
      const cdObj = world.scoreboard.getObjective("cd");
      const cdScore = cdObj ? (cdObj.getScore(player) ?? 0) : 0;
      if ((player.hasTag && (player.hasTag("nstd") || player.hasTag("stun") || player.hasTag("blocking"))) || cdScore !== 0) continue;

      const rank = rankObj ? (rankObj.getScore(player) ?? 0) : 0;
      const perSec = regenPerSecondForRank(rank);
      if (perSec <= 0) continue;

      const prev = energyObj.getScore(player) ?? 0;
      const max = energyMaxObj.getScore(player) ?? 100;
      const next = Math.min(max, prev + perSec);

      // only write when value changes (reduces scoreboard churn)
      if (next !== prev) energyObj.setScore(player, next);
    } catch (err) {
      // defensive: ignore per-player failures
      continue;
    }
  }
}, REGEN_TICKS);
