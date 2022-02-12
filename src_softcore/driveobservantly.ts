import {
    availableAmount,
    cliExecute,
    create,
    drink,
    equip,
    getFuel,
    getWorkshed,
    maximize,
    myClass,
    myInebriety,
    numericModifier,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import {
    $class,
    $effect,
    $familiar,
    $item,
    $location,
    $skill,
    $slot,
    get,
    have,
    Macro,
} from "libram";
import {
    advMacroAA,
    ensureEffect,
    fuelUp,
    horse,
    synthItem,
    useDefaultFamiliar,
} from "./phredhccs-lib";




export function main() {
//    if (getWorkshed() === $item`Asdon Martin keyfob` && !have($effect`Driving Observantly`)) {
        fuelUp();
        cliExecute("asdonmartin drive observantly");
//    }
}

