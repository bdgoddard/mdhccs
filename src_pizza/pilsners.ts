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


function drinkPilsners() {
    if (availableAmount($item`astral six-pack`) !== 0) use(1, $item`astral six-pack`);

//    if (have($effect`The Magical Mojomuscular Melody`))
//        cliExecute("shrug The Magical Mojomuscular Melody");

    if(have($item`astral pilsner`)){
      useSkill($skill`The Ode to Booze`);
      useSkill($skill`The Ode to Booze`);
      drink(6,$item`astral pilsner`);
    }
}



export function main() {
    drinkPilsners();
}

export function pilsners() {
    main();
}

