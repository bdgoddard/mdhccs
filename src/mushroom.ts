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
    getProperty,
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
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $slot, get, have, set, Macro, SourceTerminal, TunnelOfLove,} from "libram";
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, hotTub, kramcoCheck, md_uniform, setChoice, topupMP, withMacro} from "./phredhccs-lib";


function garden(){

    md_uniform();

    // ensure we have portscan
    SourceTerminal.educate([$skill`Extract`, $skill`Portscan`]);

    // make it easy for non-myst classes by using a lantern
    if(!(getProperty("retroCapeSuperhero") == "heck") ||
               !(getProperty("retroCapeWashingInstructions") == "kill") ) {
      cliExecute("retrocape heck kill");
    }

    topupMP();
    hotTub();

    if (!get('_mushroomGardenVisited')) {

      if( !( getProperty('lastCopyableMonster')  === 'Elf Hobo' ) ){
        throw("Something went wrong with hobelf -> mushroom nostalgia")
      }

      // going to cast mus/meat buff
      // also get candies from nostalgiad hobelf
      equip($slot`back`, $item`vampyric cloake`);
      // original mushroom
      Macro.skill($skill`Feel Nostalgic`)
            .skill($skill`Feel Envy`)
            .skill($skill`Become a Wolf`)
            .skill($skill`Portscan`)
            .skill($skill`Saucegeyser`)
            .repeat()
            .setAutoAttack();
      adv1($location`Your Mushroom Garden`);

      // remove cloake
      md_uniform();

      topupMP();
      // 2 agents
      Macro.skill($skill`Portscan`)
            .skill($skill`Macrometeorite`)
            .skill($skill`Saucegeyser`)
            .repeat()
            .setAutoAttack();
      adv1($location`Your Mushroom Garden`);
      adv1($location`Your Mushroom Garden`);

      topupMP();
      // last agent
      Macro.skill($skill`Macrometeorite`)
           .skill($skill`Saucegeyser`)
           .repeat()
           .setAutoAttack();
      adv1($location`Your Mushroom Garden`);

      setAutoAttack(0);

      setChoice(1410, 2);
      adv1($location`Your Mushroom Garden`);
//      use($item`free-range mushroom`);
    }

}


export function main() {
  garden();
}

export function mushroom() {
  main();
}