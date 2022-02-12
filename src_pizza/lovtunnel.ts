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
    haveEffect,
    haveSkill,
    myHp,
    myLevel,
    myMp,
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
import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, get, have, set, Macro, TunnelOfLove,} from "libram";
import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, md_uniform, setChoice, withMacro} from "./phredhccs-lib";

function topupMP() {

  if (myMp() < 100) {
    print(`Topping up MP at campground`);
    visitUrl('place.php?whichplace=campaway&action=campaway_tentclick');
  }
}


function lov() {
    md_uniform();

    if (myHp() < 30) useSkill(1, $skill`Cannelloni Cocoon`);
 
    Macro.if_(
              "monstername LOV enforcer", 
              Macro.trySkill($skill`feel pride`).skill($skill`saucegeyser`).repeat()
          )             
        .if_(
            "monstername LOV Engineer",
            Macro.trySkill($skill`feel pride`).attack().repeat()
        )
        .if_(
            "monstername LOV equivocator",
            Macro.trySkill($skill`feel pride`).skill($skill`saucegeyser`).repeat()
        )
        .setAutoAttack();

    if (!get("_loveTunnelUsed")) {
        TunnelOfLove.fightAll(
            "LOV Epaulettes",
            "Open Heart Surgery",
            "LOV Extraterrestrial Chocolate"
        );
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