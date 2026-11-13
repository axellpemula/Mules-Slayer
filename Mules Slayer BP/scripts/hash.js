import * as mc from '@minecraft/server';

mc.system.runInterval(() => {
    for (const player of mc.world.getPlayers()) {
        const hp = player.getComponent("minecraft:health").currentValue / player.getComponent("minecraft:health").effectiveMax * 100;
        const energy = getScore(player, "energy") / getScore(player, "energyMax") * 100;

        let chargeObj1 = mc.world.scoreboard.getObjective("hold");
        let chargeObj2 = mc.world.scoreboard.getObjective("holdS");
        let chargeScore = 0;

        if (chargeObj1 && chargeObj1.hasParticipant(player)) {
            chargeScore = chargeObj1.getScore(player);
        }
        if (chargeObj2 && chargeObj2.hasParticipant(player)) {
            chargeScore = Math.max(chargeScore, chargeObj2.getScore(player));
        }

        const charge = Math.min(100, Math.round((chargeScore / 10) * 100));
        const showChargeBar = charge > 1 ? "showChargeBar" : "hideChargeBar";
        const showBlockBar = (player.hasTag && player.hasTag("blocking")) ? "showBlockBar" : "hideBlockBar";

        player.onScreenDisplay.setTitle(
            `health:` + hp + "\n" +
            `energy:` + energy + "\n" +
            `power:` + charge + "\n" +
            showChargeBar + "\n" +
            showBlockBar
        );

        const energyOrBlockText = (player.hasTag && player.hasTag("blocking")) ? ("  §eBlock " + getScore(player, "energy") + "/" + getScore(player, "energyMax")) : ("  §bEN " + getScore(player, "energy") + "/" + getScore(player, "energyMax"));
        player.onScreenDisplay.updateSubtitle(
            `ui:§f` +
            "§aHP " + Math.round(player.getComponent("minecraft:health").currentValue) + "/" + player.getComponent("minecraft:health").defaultValue + "\n" +
            energyOrBlockText
        );
    }
})

function getScore(player, objective) {
    try {
        return mc.world.scoreboard.getObjective(objective)?.getScore(player.scoreboardIdentity);
    } catch (error) {
        return 0;
    }
};  