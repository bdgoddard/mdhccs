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
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, hotTub, kramcoCheck, md_uniform, setChoice, topupMP, withMacro} from "./phredhccs-lib";



function profFights(){

  setChoice(1324, 5); // pick a fight

  // open NEP
  if (!containsText($location`The Neverending Party`.noncombatQueue, 'The Beginning of the Neverend') && get("_pocketProfessorLectures") < 1) {

    visitUrl(toUrl($location`The Neverending Party`));
    if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
      print("Gerald/ine quest!", "blue");
    }
    if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
      runChoice(1); // Accept quest
    } else {
      runChoice(2); // Decline quest
    }
  }

  if (kramcoCheck()) {
        md_uniform();
        //topupMP();
        hotTub();

        equip($item`Kramco Sausage-o-Matic™`);
        useFamiliar($familiar`Pocket Professor`);
//        equip($item`Pocket Professor memory chip`);

        ensureEffect($effect`Empathy`);
        ensureEffect($effect`Leash of Linguini`);
        ensureEffect($effect`Blood Bond`);

        const profCopies = Math.ceil(Math.sqrt(familiarWeight(myFamiliar()) + weightAdjustment()));

        // set up bowl sideways for +50%? statgain for 5+7(?) adventures
 
        Macro.if_('!monstername "sausage goblin"', new Macro().step('abort'))
               .skill($skill`Curse of Weaksauce`)
               .trySkill($skill`Bowl Sideways`)
               .trySkill($skill`lecture on relativity`)
               .skill($skill`saucegeyser`)
               .repeat()
               .setAutoAttack();

        while (get("_pocketProfessorLectures") < profCopies) {
          //adv1($location`Noob Cave`, -1, '');
          // use NEP to maximise uses of bowling ball buff
          adv1($location`The Neverending Party`, -1, '');
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