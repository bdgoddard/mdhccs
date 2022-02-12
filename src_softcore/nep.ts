import {
    adv1,
    autosell,
    availableAmount,
    buy,
    chew,
    cliExecute,
    containsText,
    create,
    equip,
    eudoraItem,
    familiarWeight,
    haveEffect,
    haveSkill,
    myFamiliar,
    myHp,
    myLevel,
    myMaxhp,
    myMp,
    mySpleenUse,
    print,
    runChoice,
    runCombat,
    setAutoAttack,
    toUrl,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
    weightAdjustment,
} from "kolmafia";
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $slot, get, have, set, Macro, TunnelOfLove,} from "libram";
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, hotTub, kramcoCheck, md_uniform, setChoice, topupMP, withMacro, ensureMp} from "./phredhccs-lib";

function NEP(){

  setChoice(1324, 5); // pick a fight

  // open NEP (should already be done by profchain)
  //if (!containsText($location`The Neverending Party`.noncombatQueue, 'The Beginning of the Neverend') && get('_neverendingPartyFreeTurns')<1 ) {

    // visitUrl(toUrl($location`The Neverending Party`));
    // if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
    //   print("Gerald/ine quest!", "blue");
    // }
    // if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
    //   runChoice(1); // Accept quest
    // } else {
    //   runChoice(2); // Decline quest
    // }
  //}

  md_uniform();

  // get +10lb potion
  useFamiliar($familiar`Shorter-Order Cook`);

  topupMP();
  hotTub();

  // fish for more free fights
  // bad as it may cause an extra bowling ball
  // equip($slot`off-hand`,$item`Kramco Sausage-o-Matic™`);

  setAutoAttack(0);

  Macro.skill($skill`Curse of Weaksauce`)
        .trySkill($skill`feel pride`)
        .trySkill($skill`Bowl Sideways`)
        .skill($skill`saucegeyser`)
        .repeat()
        .setAutoAttack();

  while (get('_neverendingPartyFreeTurns') < 10) {
    adv1($location`The Neverending Party`, -1, '');

    while (myHp() < 0.8 * myMaxhp()) {
      useSkill(1, $skill`Cannelloni Cocoon`);
    }
    ensureMp(200);

  }

  // should get here before bowling ball is back

  Macro.skill($skill`Shattering Punch`).setAutoAttack();

  while (get("_shatteringPunchUsed") < 3) {
    ensureMp(30);
    adv1($location`The Neverending Party`, -1, '');
  }

  equip($slot`acc3`, $item`Lil' Doctor™ bag`);

	Macro.skill($skill`Chest X-Ray`).setAutoAttack();

  while (get("_chestXRayUsed") < 3) {
    adv1($location`The Neverending Party`, -1, '');
  }

  

	Macro.skill($skill`Gingerbread Mob Hit`).setAutoAttack();

  while(!get("_gingerbreadMobHitUsed")) {
    ensureMp(30);
    adv1($location`The Neverending Party`,-1,'');
  }

  setAutoAttack(0);

}


export function main() {
  NEP();
}

export function nep() {
  main();
}