import {
    availableAmount,
    buy,
    cliExecute,
    equip,
    getFuel,
    haveEffect,
    maximize,
    numericModifier,
    print,
    runChoice,
    runCombat,
    use,
    useFamiliar,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $effect, $familiar, $item, $skill, $slot, get, have, Macro, } from "libram";
import { universalWeightBuffs } from "./familiarweight";
import { defaultKill } from "./phccs-macros";
import { ensureEffect, fuelUp, heal, horse, setChoice, md_uniform } from "./phredhccs-lib";

const predictor = () => 60 + (20 + numericModifier("combat rate")) * 3;

function godLobster() {
    if (
        !have($effect`Silence of the God Lobster`) &&
        get("_godLobsterFights") < 3 &&
        have($item`God Lobster's Ring`)
    ) {
        md_uniform();
        useFamiliar($familiar`God Lobster`);
        equip($slot`familiar`, $item`God Lobster's Ring`);

        Macro.skill($skill`Saucegeyser`).repeat().setAutoAttack();

        heal();

        setChoice(1310, 2);
        visitUrl("main.php?fightgodlobster=1");
        runCombat();
        visitUrl("choice.php");
        runChoice(-1);
    }
}

function castBuffs() {
    universalWeightBuffs();
    ensureEffect($effect`Smooth Movements`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Feeling Lonely`);
    equip($slot`acc3`, $item`Powerful Glove`);
    ensureEffect($effect`Invisible Avatar`);


//    ensureEffect($effect`Blessing of the Bird`);

//    if (!get("_clanFortuneBuffUsed")) cliExecute("fortune buff familiar");

    if (haveEffect($effect`Fat Leon's Phat Loot Lyric`))
        cliExecute("shrug fat leon's phat loot lyric");
    ensureEffect($effect`The Sonata of Sneakiness`);

    if (!get("_olympicSwimmingPool")) cliExecute("swim sprints");


}


function testPrep() {
    if(availableAmount($item`porkpie-mounted popper`)<1) {
      cliExecute("acquire porkpie-mounted popper");
    }

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`pantogram pants`);
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    equip($slot`off-hand`, $item`familiar scrapbook`);
    equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    equip($slot`acc2`, $item`codpiece`);
    equip($slot`acc3`, $item`Beach Comb`); // familiar weight
    equip($slot`back`, $item`protonic accelerator pack`);

    useFamiliar($familiar`Disgeist`);

    horse("dark");

    // Tune moon sign to Wombat (for meat farming).
    if (!get('moonTuned')) {
     //   visitUrl('inv_use.php?whichitem=10254&doit=96&whichsign=7');
    }

  if(have($item`shady shades`)){
    use($item`shady shades`);
  }

}

export default function noncombatTest(): number {
    godLobster();
    castBuffs();
    testPrep();
//    print(`${predictor()}`);
    if (predictor() > 1) throw "Failed to cap noncombat";
    return predictor();
}
