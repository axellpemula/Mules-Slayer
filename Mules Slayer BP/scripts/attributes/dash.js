import { world, system } from "@minecraft/server";

const DASH_SPEED = 4;
const DASH_DURATION = 6;
const DOUBLE_TAP_WINDOW = 10;
const COOLDOWN_TICKS = 14;

const dashState = new Map();

function normalizeVector(vec) {
  const mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  if (mag === 0) return { x: 0, y: 0, z: 0 };
  return { x: vec.x / mag, y: vec.y / mag, z: vec.z / mag };
}

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const move = player.inputInfo.getMovementVector();
    const tick = system.currentTick;

    const dashcd = world.scoreboard.getObjective("dashcd")?.getScore(player) ?? 0;
    if (dashcd > 1) continue;
    const sp1 = world.scoreboard.getObjective("sp1")?.getScore(player) ?? 0;
    if (sp1 > 1 || sp1 < 0) continue;
    const m1 = world.scoreboard.getObjective("m1")?.getScore(player) ?? 0;
    if (m1 > 1) continue;
    const stun = world.scoreboard.getObjective("stun")?.getScore(player) ?? 0;
    if (stun > 1) continue;
    if (player.hasTag("blocking")) continue;

    const state = dashState.get(player.id) ?? {
      lastJumpTick: 0,
      jumpTapCount: 0,
      dashEndTick: 0,
      dashChain: 0,
      cooldownEndTick: 0,
      wasJumping: false,
    };

    // Handle active dash
    if (tick < state.dashEndTick) {
      const dashVec = state.dashVec ?? { x: 0, y: 0, z: 0 };
      player.runCommandAsync("scoreboard players set @s dashcd 10");
      player.runCommandAsync("playsound mob.witch.throw @a[r=5] ~~~ 1000 0.7 100");
      player.runCommandAsync("playsound mob.witch.throw @a[r=5] ~~~ 1000 0.47 100");
      player.runCommandAsync("playsound mob.witch.throw @a[r=5] ~~~ 1000 1.17 100");
      
      player.applyKnockback(dashVec.x, dashVec.z, DASH_SPEED, 0);


      // Play dash animation based on direction
      let anim = "";
      if (move.y > 0.5) anim = "forward";
      else if (move.y < -0.5) anim = "backward";
      else if (move.x < -0.5) anim = "right";
      else if (move.x > 0.5) anim = "left";
      if (anim) {
        player.runCommandAsync(`playanimation @s animation.dash.${anim}`);
      }

      dashState.set(player.id, state);
      continue;
    }

    // Detect direction
    let dir = null;
    if (move.y > 0.5) dir = "forward";
    else if (move.y < -0.5) dir = "backward";
    else if (move.x > 0.5) dir = "right";
    else if (move.x < -0.5) dir = "left";

    // Detect jump double tap
    const jumpScore = world.scoreboard.getObjective("jump")?.getScore(player) ?? 0;
    const isJumping = jumpScore === 1;
    if (!state.wasJumping && isJumping) {
      // Just pressed jump
      if (tick - state.lastJumpTick <= DOUBLE_TAP_WINDOW) {
        state.jumpTapCount++;
      } else {
        state.jumpTapCount = 1;
      }
      state.lastJumpTick = tick;

      // look up
      if (state.jumpTapCount === 2) {
        player.runCommandAsync("execute as @s[rxm=-90,rx=-30] at @s run scriptevent axell:up1");
        system.runTimeout(() => {
        }, 10)
      }
      
      if (dir && state.jumpTapCount === 2) {
        let dashVec = { x: 0, y: 0, z: 0 };
        const look = normalizeVector(player.getViewDirection());

        switch (dir) {
          case "forward": dashVec = { x: look.x, y: 0, z: look.z }; break;
          case "backward": dashVec = { x: -look.x, y: 0, z: -look.z }; break;
          case "right": dashVec = { x: look.z, y: 0, z: -look.x }; break;
          case "left": dashVec = { x: -look.z, y: 0, z: look.x }; break;
        }
        dashVec = normalizeVector(dashVec);

        state.dashVec = dashVec;
        state.dashEndTick = tick + DASH_DURATION;
        state.dashChain++;

        if (state.dashChain >= 2) {
          if (tick - state.lastJumpTick > DOUBLE_TAP_WINDOW) {
            state.cooldownEndTick = tick + COOLDOWN_TICKS;
          }
          state.dashChain = 0;
        }
        state.jumpTapCount = 0; // reset after dash
      }
    }
    state.wasJumping = isJumping;

    dashState.set(player.id, state);
  }
});
