import {
    availableAmount,
    cliExecute,
    cliExecuteOutput,
    equip,
    handlingChoice,
    logprint,
    maximize,
    numericModifier,
    print,
    runChoice,
    setAutoAttack,
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
import { familiar } from "libram/dist/resources/2009/Bandersnatch";
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
    pullIfPossible,
    reminisce,
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
        // ensure saber
        equip($slot`weapon`,$item`Fourth of May Cosplay Saber`);
        // and no Kramco
        equip($slot`offhand`,$item`familiar scrapbook`);

        Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
            .setAutoAttack();
        fax($monster`ungulith`);
        use($item`photocopied monster`);
//        if (handlingChoice()) runChoice(-1);
        set("_meteorShowerUses", 1 + get("_meteorShowerUses"));
        setAutoAttack(0);
        use($item`corrupted marrow`);
    }
}

function ungulith() {
    
    if(!have($effect`Cowrruption`)){
        md_uniform();

        // ensure saber in case this all breaks
        equip($slot`weapon`,$item`Fourth of May Cosplay Saber`);
        // ensure extinguisher for polar
        equip($slot`offhand`,$item`industrial fire extinguisher`);
        
        // make sure we can free run
        useFamiliar($familiar`Frumious Bandersnatch`);
        ensureEffect($effect`Ode to Booze`);
        
        Macro.skill($skill`Fire Extinguisher: Polar Vortex`)
        .step("runaway")
        .setAutoAttack();

        reminisce($monster`Ungulith`);
        
        setAutoAttack(0);

        if (have($item`corrupted marrow`)){
            use($item`corrupted marrow`);    
        } else {
            throw "Failed to get corrupted marrow";
        }
    }
}

function castBuffs() {

    ensureEffect($effect`Song of the North`);
    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Frenzied, Bloody`);
    ensureEffect($effect`Lack of Body-Building`);
    ensureEffect($effect`Jackasses' Symphony of Destruction`);

    if (have($item`LOV Elixir #3`)) use($item`LOV Elixir #3`);
    tryHead($effect`Lack of Body-Building`);
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
            setAutoAttack(0);
        }
    }
}

function getCowrruption() {
    pullIfPossible(1,$item`corrupted marrow`,3000);
    if (have($item`corrupted marrow`)) use($item`corrupted marrow`);    
}


function testPrep() {

    equip($slot`hat`, $item`porkpie-mounted popper`);
    equip($slot`shirt`, $item`fresh coat of paint`);
    equip($slot`pants`, $item`Cargo Cultist Shorts`);
    if(have($item`fish hatchet`)){
        equip($slot`weapon`, $item`fish hatchet`);
    }
    else {
        cliExecute('fold broken champagne bottle');
        equip($slot`weapon`, $item`broken champagne bottle`);    
    }
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
    getCrushed();
    //getCowrruption();
    ungulith();  // can combine this with shower?
    takeAShower();

    testPrep();

    logprint(cliExecuteOutput("modtrace weapon"));

    if (predictor() > 1) {
      print(`Weapon damage predicted ${predictor()}`);
      throw "Failed to cap weapon damage at 1";
    }
    return predictor();
}

export function main() {
    weaponTest();
}