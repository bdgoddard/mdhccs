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
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $slot, get, have, set, Macro, TunnelOfLove,} from "libram";
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, hotTub, kramcoCheck, md_uniform, setChoice, topupMP, withMacro} from "./phredhccs-lib";


function garden(){
    md_uniform();

    // make it easy for non-myst classes by using a lantern
    if(!(getProperty("retroCapeSuperhero") == "heck") ||
               !(getProperty("retroCapeWashingInstructions") == "kill") ) {
      cliExecute("retrocape heck kill");
    }

    topupMP();
    hotTub();

    if (!get('_mushroomGardenVisited')) {
    
      // going to cast meat buff
      equip($slot`back`, $item`vampyric cloake`);
      // original mushroom
      Macro.skill($skill`Become a Wolf`)
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