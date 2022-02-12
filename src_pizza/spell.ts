import {
    availableAmount,
    buy,
    cliExecute,
    create,
    equip,
    handlingChoice,
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
//    ensureEffect($effect`Simmering`);

    ensureEffect($effect`Song of Sauce`);
    ensureEffect($effect`Carol of the Hells`);
    ensureEffect($effect`Mental A-cue-ity`);
    ensureEffect($effect`Carol of the Bulls`);

//    useSkill(1, $skill`Spirit of Cayenne`);

}

function testPrep() {
    if (have($item`obsidian nutcracker`)) {
        buy($item`obsidian nutcracker`);
    }

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`pantogram pants`);
    equip($slot`weapon`, $item`obsidian nutcracker`);
    equip($slot`off-hand`, $item`ebony epee`);
    cliExecute("briefcase enchantment spell");
    equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    equip($slot`acc2`, $item`Powerful Glove`);
    equip($slot`acc3`, $item`Beach Comb`); 
    equip($slot`back`, $item`protonic accelerator pack`);

    if (!have($effect`Witch Breaded`)) {
        wishEffect($effect`Witch Breaded`);
    }

    ensureEffect($effect`AAA-Charged`);

}

export default function spellTest(): number {
    castBuffs();
    takeAShower();
    testPrep();

    if (predictor() > 44) {
      print(`Spell damage predicted ${predictor()}`);
      throw "Failed to cap weapon damage at 44";
    }

    return predictor();
}
