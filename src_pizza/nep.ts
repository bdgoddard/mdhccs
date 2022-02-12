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
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, kramcoCheck, md_uniform, setChoice, withMacro} from "./phredhccs-lib";

function topupMP() {

  if (myMp() < 100) {
    print(`Topping up MP at campground`);
    visitUrl('place.php?whichplace=campaway&action=campaway_tentclick');
  }
}

function hotTub(){
  if (myHp() < 0.9 * myMaxhp()) {
    cliExecute('hottub');
  }
}

function NEP(){

        setChoice(1324, 5); // pick a fight

        md_uniform();
        topupMP();
        hotTub();

        // equip($slot`off-hand`,$item`Kramco Sausage-o-Matic™`);

        Macro.skill($skill`saucegeyser`).setAutoAttack();

        while (get('_neverendingPartyFreeTurns') < 10) {
          adv1($location`The Neverending Party`, -1, '');

          while (myHp() < 0.8 * myMaxhp()) {
            useSkill(1, $skill`Cannelloni Cocoon`);
          }

        }

        // equip($slot`off-hand`,$item`Familiar Scrapbook`);
        topupMP();

        Macro.skill($skill`Shattering Punch`).setAutoAttack();

        while (get("_shatteringPunchUsed") < 3) {
          adv1($location`The Neverending Party`, -1, '');
        }

        equip($slot`acc3`, $item`Lil' Doctor™ bag`);


	Macro.skill($skill`Chest X-Ray`).setAutoAttack();

        while (get("_chestXRayUsed") < 3) {
          adv1($location`The Neverending Party`, -1, '');
        }

        setAutoAttack(0);

}


export function main() {
  NEP();
}

export function nep() {
  main();
}