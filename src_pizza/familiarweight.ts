import {
    cliExecute,
    create,
    equip,
    familiarWeight,
    maximize,
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

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`pantogram pants`);
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    equip($slot`off-hand`, $item`familiar scrapbook`);
    equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    equip($slot`acc2`, $item`hewn moon-rune spoon`);
    equip($slot`acc3`, $item`Beach Comb`); // familiar weight
    equip($slot`back`, $item`protonic accelerator pack`);

    if (have($item`silver face paint`)) ensureEffect($effect`Robot Friends`);
}

export default function familiarTest(): number {
    universalWeightBuffs();
    takeAShower();
    testPrep();

    const predictor = 60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5);

    if (predictor > 32) {
      print(`Familiar weight predicted ${predictor}`);
      throw "Failed to cap familiar weight at 32";
    }

    return 60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5);
}
