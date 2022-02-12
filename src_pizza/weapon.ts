import {
    availableAmount,
    cliExecute,
    equip,
    handlingChoice,
    maximize,
    numericModifier,
    print,
    runChoice,
    use,
    useFamiliar,
    useSkill,
} from "kolmafia";
import {
    $effect,
    $effects,
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
    uneffect,
} from "libram";
import {
    advMacroAA,
    eatPizza,
    ensureEffect,
    ensureInnerElf,
    ensureItem,
    fax,
    getPropertyBoolean,
    horse,
    horsery,
    setChoice,
    takeAShower,
    tryHead,
    md_uniform,
    wishEffect,
} from "./phredhccs-lib";

const predictor = () =>
    60 -
    Math.floor(numericModifier("weapon damage") / 25 + 0.001) -
    Math.floor(numericModifier("weapon damage percent") / 25 + 0.001);

function faxUngulith() {
    if (!get("_photocopyUsed")) {
        md_uniform();
        Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
            .setAutoAttack();
        fax($monster`ungulith`);
        use($item`photocopied monster`);
//        if (handlingChoice()) runChoice(-1);
        set("_meteorShowerUses", 1 + get("_meteorShowerUses"));
        use($item`corrupted marrow`);
    }
}


function castBuffs() {

    ensureEffect($effect`Song of the North`);
    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Frenzied, Bloody`);
    ensureEffect($effect`Lack of Body-Building`);

    if (have($item`LOV Elixir #3`)) use($item`LOV Elixir #3`);
    tryHead($effect`Lack of Body-Building`);
}


function pizzaWeapon() {

    if (!have($effect`Outer Wolf™`)) {
        print(`Getting pizza buff outer wolf`);
        ensureItem(1, $item`tenderizing hammer`);
        availableAmount($item`useless powder`) === 0 && cliExecute('pulverize old sweatpants');
        eatPizza(
            $item`oil of expertise`,
            $item`useless powder`,
            $item`mushroom filet`,
            $item`mushroom filet`
        );
    } else {
      print(`Already have effect outer wolf`);
    }

}


function getCrushed() {
    if (!have($effect`Do You Crush What I Crush?`)) {
        if (!have($effect`Holiday Yoked`)) {
            md_uniform();
            useFamiliar($familiar`Ghost of Crimbo Carols`);
            if (horsery().includes("pale")) {
                horse("dark");
            }
            advMacroAA($location`The Dire Warren`, Macro.skill($skill`Snokebomb`));
        }
    }
}


function testPrep() {

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`pantogram pants`);
    cliExecute('fold broken champagne bottle');
    equip($slot`weapon`, $item`broken champagne bottle`);
    equip($slot`off-hand`, $item`ebony epee`);
    equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    equip($slot`acc2`, $item`Powerful Glove`);
    equip($slot`acc3`, $item`Beach Comb`); 
    equip($slot`back`, $item`protonic accelerator pack`);

    cliExecute('boombox fists');
    
    if (!have($effect`Rictus of Yeg`)) {
        cliExecute('cargo pick 284');
        use($item`Yeg's Motel toothbrush`);
    }

    // Tea party
    if (!getPropertyBoolean('_madTeaParty')) {
        ensureItem(1, $item`goofily-plumed helmet`);
        ensureEffect($effect`Weapon of Mass Destruction`);
    }

    if (!have($effect`Outer Wolf™`)) {
        wishEffect($effect`Outer Wolf™`);
    }

    if (!get("_bowleggedSwaggerUsed")) useSkill($skill`Bow-Legged Swagger`);


}

export default function weaponTest(): number {
    castBuffs();
//    pizzaWeapon();
    getCrushed();
//    takeAShower();
    faxUngulith();
    testPrep();
    if (predictor() > 4) {
      print(`Weapon damage predicted ${predictor()}`);
      throw "Failed to cap weapon damage at 4";
    }
    return predictor();
}
