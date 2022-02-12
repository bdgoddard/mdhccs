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
    getProperty,
    haveEffect,
    haveSkill,
    myHp,
    myLevel,
    myMp,
    myPrimestat,
    mySpleenUse,
    print,
    runChoice,
    runCombat,
    toUrl,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $stat, get, have, set, Macro, TunnelOfLove,} from "libram";
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, md_uniform, setChoice, topupMP, withMacro} from "./phredhccs-lib";


function lov() {
    md_uniform();

    // make it easy for non-myst classes by using a lantern
    if(!(getProperty("retroCapeSuperhero") == "heck") ||
               !(getProperty("retroCapeWashingInstructions") == "kill") ) {
      cliExecute("retrocape heck kill");
    }

    

    if (myHp() < 50) useSkill(1, $skill`Cannelloni Cocoon`);
 
    Macro.if_(
              "monstername LOV enforcer", 
              //Macro.trySkill($skill`feel pride`).skill($skill`saucegeyser`).repeat()
              //Macro.attack().repeat()
              Macro.skill($skill`saucegeyser`).repeat()
          )             
        .if_(
            "monstername LOV Engineer",
            //Macro.trySkill($skill`feel pride`).attack().repeat()
            Macro.skill($skill`Weapon of the Pastalord`).repeat()
        )
        .if_(
            "monstername LOV equivocator",
            //Macro.trySkill($skill`feel pride`).skill($skill`saucegeyser`).repeat()
            Macro.skill($skill`saucegeyser`).repeat()
        )
        .setAutoAttack();

    if (!get("_loveTunnelUsed")) {
      if (myPrimestat() === $stat`Mysticality`){
        TunnelOfLove.fightAll(
          "LOV Epaulettes",
          "Open Heart Surgery",
          "LOV Extraterrestrial Chocolate"
        );
      }
      else if (myPrimestat() === $stat`Muscle`){
        TunnelOfLove.fightAll(
          "LOV Eardigan",
          "Open Heart Surgery",
          "LOV Extraterrestrial Chocolate"
        );
      }
      else if (myPrimestat() === $stat`Moxie`){
        TunnelOfLove.fightAll(
          "LOV Earring",
          "Open Heart Surgery",
          "LOV Extraterrestrial Chocolate"
        );
      }
        
        use(1, $item`LOV Extraterrestrial Chocolate`);
    }

}



export function main() {
  topupMP();
  lov();
}

export function lovTunnel() {
  main();
}