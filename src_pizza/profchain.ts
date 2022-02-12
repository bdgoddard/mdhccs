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

function profFights(){

  if (kramcoCheck()) {
        md_uniform();
        topupMP();
        hotTub();

        equip($item`Kramco Sausage-o-Matic™`);
        useFamiliar($familiar`Pocket Professor`);
        equip($item`Pocket Professor memory chip`);

        ensureEffect($effect`Empathy`);
        ensureEffect($effect`Leash of Linguini`);
        ensureEffect($effect`Blood Bond`);

        const profCopies = 2 + Math.ceil(Math.sqrt(familiarWeight(myFamiliar()) + weightAdjustment()));
       
        Macro.if_('!monstername "sausage goblin"', new Macro().step('abort'))
             .trySkill($skill`lecture on relativity`)
             .skill($skill`saucegeyser`)
             .setAutoAttack();

        while (get("_pocketProfessorLectures") < profCopies) {
          adv1($location`Noob Cave`, -1, '');
        }

        setAutoAttack(0);
    }


}


export function main() {
  profFights();
}

export function profChain() {
  main();
}