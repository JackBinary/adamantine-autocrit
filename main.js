Hooks.once("ready", () => {
  if (!game.modules.get("midi-qol")?.active) {
    ui.notifications.warn("Adamantine Auto-Crit requires Midi-QOL.");
    return;
  }

  Hooks.on("midi-qol.preAttackRollComplete", async workflow => {
    // Only proceed if there's a hit
    if (!workflow.hitTargets.size) return;

    // Check flag on the item first
    const item = workflow.item;
    const actor = workflow.actor;

    const flagItem = item?.getFlag("adamantine-autocrit", "alwaysCrit");
    const flagActor = actor?.getFlag("adamantine-autocrit", "alwaysCrit");

    if (flagItem || flagActor) {
      workflow.isCritical = true;
      console.log("Adamantine Auto-Crit: Forced crit!");
    }
  });
});
