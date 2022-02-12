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
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, get, have, set, Macro, TunnelOfLove,} from "libram";
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

function backups(){

        md_uniform();
        topupMP();
        hotTub();

        Macro.skill($skill`back-up to your last enemy`)
             .if_('!monstername "sausage goblin"', new Macro().step('abort'))
             .skill($skill`saucegeyser`)
             .setAutoAttack();

        while (get('_backUpUses') < 11) {
          adv1($location`Noob Cave`, -1, '');

          while (myHp() < 0.8 * myMaxhp()) {
            useSkill(1, $skill`Cannelloni Cocoon`);
          }

        }

        setAutoAttack(0);

}


export function main() {
  backups();
}

export function backupChain() {
  main();
}
