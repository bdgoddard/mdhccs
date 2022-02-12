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
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, kramcoCheck, md_uniform, multiFightAutoAttack, setChoice, withMacro} from "./phredhccs-lib";

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

function lobster(){
    
    if (get("_godLobsterFights") === 0) {

        md_uniform();
        topupMP();
        hotTub();

        Macro.skill($skill`Saucegeyser`).repeat().setAutoAttack();

        useFamiliar($familiar`God Lobster`);

        setChoice(1310, 1);

        visitUrl("main.php?fightgodlobster=1");

        runCombat();
        multiFightAutoAttack();
        runChoice(-1);

        equip($slot`familiar`, $item`God Lobster's Scepter`);

        visitUrl("main.php?fightgodlobster=1");

        runCombat();
        multiFightAutoAttack();
        runChoice(-1);

        equip($slot`familiar`, $item`God Lobster's Ring`);

        setAutoAttack(0);
    }

}


export function main() {
  lobster();
}

export function godLobster() {
  main();
}