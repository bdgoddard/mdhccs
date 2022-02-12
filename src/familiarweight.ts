import {
    cliExecute,
    cliExecuteOutput,
    create,
    equip,
    familiarWeight,
    logprint,
    maximize,
    mySign,
    myFamiliar,
    print,
    runChoice,
    use,
    useFamiliar,
    visitUrl,
    weightAdjustment,
} from "kolmafia";
import {
    $effect,
    $familiar,
    $item,
    $location,
    $monster,
    $skill,
    $slot,
    get,
    have,
    Macro,
    set,
    Witchess,
} from "libram";
import { defaultKill } from "./phccs-macros";
import {
    advMacroAA,
    ensureEffect,
    horse,
    setChoice,
    takeAShower,
    tuneMoon,
    tryHead,
    md_uniform,
} from "./phredhccs-lib";




export function universalWeightBuffs(): void {
    ensureEffect($effect`Empathy`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Do I Know You From Somewhere?`);

    if (!get("_freePillKeeperUsed")) {
        cliExecute("pillkeeper familiar");
    }

}



function testPrep() {
    useFamiliar($familiar`Exotic Parrot`);
    equip($slot`familiar`,$item`cracker`);

    equip($slot`hat`,$item`Daylight Shavings Helmet`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`Cargo Cultist Shorts`);
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    equip($slot`off-hand`, $item`familiar scrapbook`);
    if(have($item`Brutal brogues`)){
        equip($slot`acc1`, $item`Brutal brogues`);
    } else {
        equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    }
    equip($slot`acc2`, $item`hewn moon-rune spoon`);
    equip($slot`acc3`, $item`Beach Comb`);
    equip($slot`back`, $item`protonic accelerator pack`);

    if (have($item`short stack of pancakes`)) ensureEffect($effect`Shortly Stacked`);
    if (have($item`silver face paint`)) ensureEffect($effect`Robot Friends`);
}

export default function familiarTest(): number {
    tuneMoon();
    universalWeightBuffs();
    takeAShower();
    testPrep();

    const predictor = 60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5);

    logprint(cliExecuteOutput("modtrace familiar weight"));

    if (predictor > 32) {
      print(`Familiar weight predicted ${predictor}`);
      throw "Failed to cap familiar weight at 32";
    }

    return 60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5);
}
