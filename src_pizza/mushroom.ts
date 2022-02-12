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

function garden(){
    md_uniform();
    topupMP();
    hotTub();
    if (!get('_mushroomGardenVisited')) {
        Macro.skill($skill`Saucegeyser`)
            .repeat()
            .setAutoAttack();
        adv1($location`Your Mushroom Garden`);
        setAutoAttack(0);
        setChoice(1410, 2);
        adv1($location`Your Mushroom Garden`);
        use($item`free-range mushroom`);
    }

}


export function main() {
  garden();
}

export function mushroom() {
  main();
}