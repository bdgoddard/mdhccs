import {
    availableAmount,
    buy,
    cliExecute,
    cliExecuteOutput,
    equip,
    getFuel,
    haveEffect,
    logprint,
    maximize,
    numericModifier,
    print,
    runChoice,
    runCombat,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $effect, $familiar, $item, $skill, $slot, get, have, Macro, } from "libram";
import { universalWeightBuffs } from "./familiarweight";
import { defaultKill } from "./phccs-macros";
import { ensureEffect, ensureMp, fuelUp, heal, horse, setChoice, tuneMoon, md_uniform,Test, tests, testWrapper, testDone } from "./phredhccs-lib";

export function fuelAsdon() {

    
    if(have($skill`Prevent Scurvy and Sobriety`)){
        ensureMp(50);
        useSkill(1,$skill`Prevent Scurvy and Sobriety`);
    }

    if(have($item`candy cane`)){
        cliExecute(`asdonmartin fuel 3 candy cane`); // 3
        cliExecute(`asdonmartin fuel 3 eggnog`); // 15
        cliExecute(`asdonmartin fuel 3 white lightning`); // 15
        cliExecute(`asdonmartin fuel 3 mad train wine`); // 9
        cliExecute(`asdonmartin fuel 6 bottle of rum`); // 18
        cliExecute(`asdonmartin fuel 3 bottle of whiskey`); // 9
        cliExecute(`asdonmartin fuel 3 bottle of tequila`); // 9
    }
}
