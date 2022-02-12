import {
    availableAmount,
    buy,
    cliExecute,
    cliExecuteOutput,
    create,
    equip,
    handlingChoice,
    logprint,
    maximize,
    myClass,
    myLevel,
    numericModifier,
    print,
    runChoice,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import {
    $class,
    $effect,
    $effects,
    $familiar,
    $item,
    $location,
    $skill,
    $slot,
    get,
    have,
    Macro,
    set,
} from "libram";
import {
    advMacroAA,
    ensureEffect,
    ensureInnerElf,
    horse,
    setChoice,
    takeAShower,
    md_uniform,
    wishEffect,
} from "./phredhccs-lib";

const predictor = () =>
    61 -
    Math.floor(numericModifier("spell damage") / 50 + 0.001) -
    Math.floor(numericModifier("spell damage percent") / 50 + 0.001);

function castBuffs() {
    ensureEffect($effect`Simmering`);

    ensureEffect($effect`Song of Sauce`);
    ensureEffect($effect`Carol of the Hells`);
    ensureEffect($effect`Mental A-cue-ity`);
    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Jackasses' Symphony of Destruction`);
    ensureEffect($effect`Arched Eyebrow of the Archmage`);
    useSkill(1, $skill`Spirit of Cayenne`);

}

function testPrep() {
    if (have($item`obsidian nutcracker`)) {
        buy($item`obsidian nutcracker`);
    }

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`Cargo Cultist Shorts`);
    equip($slot`weapon`, $item`obsidian nutcracker`);
    if(have($item`Abracandalabra`)){
        equip($slot`off-hand`, $item`Abracandalabra`);
    } else {
        equip($slot`off-hand`, $item`ebony epee`);
    }
    cliExecute("briefcase enchantment spell");
    equip($slot`acc1`, $item`hewn moon-rune spoon`);
    equip($slot`acc2`, $item`Powerful Glove`);
    if(have($item`Draftsman's driving gloves`)){
        equip($slot`acc3`, $item`Draftsman's driving gloves`);
    }   
    else {
        equip($slot`acc3`, $item`Beach Comb`); // ?? something better
    }
    equip($slot`back`, $item`protonic accelerator pack`);

    if (!have($effect`Witch Breaded`)) {
        wishEffect($effect`Witch Breaded`);
    }

    ensureEffect($effect`AAA-Charged`);

    if(have($item`LOV Elixir #6`)){
        ensureEffect($effect`The Magic of LOV`);
    }

}

export default function spellTest(): number {
    castBuffs();
    takeAShower();
    testPrep();

    logprint(cliExecuteOutput("modtrace spell"));

    if (predictor() > 37) {
      print(`Spell damage predicted ${predictor()}`);
      throw "Failed to cap spell damage at 37";
    }

    return predictor();
}
