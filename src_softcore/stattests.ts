import {
    availableAmount,
    cliExecute,
    create,
    eat,
    equip,
    itemAmount,
    maximize,
    myBasestat,
    myBuffedstat,
    myMaxhp,
    print,
    retrieveItem,
    use,
    useFamiliar,
    useSkill,
} from "kolmafia";
import { $effect, $familiar, $item, $skill, $slot, $stat, get, have } from "libram";
import { ensureEffect, ensureInnerElf, tryUse } from "./phredhccs-lib";

function stat_uniform() {

    if(!have($item`wad of used tape`)) {
      cliExecute('fold wad of used tape');
    }
    equip($slot`hat`, $item`wad of used tape`);
    equip($slot`back`, $item`unwrapped knock-off retro superhero cape`);
    equip($slot`pants`, $item`Cargo Cultist Shorts`);
    equip($slot`weapon`, $item`industrial fire extinguisher`);
    equip($slot`off-hand`, $item`Fourth of May Cosplay Saber`);
    equip($slot`acc1`, $item`Beach Comb`);
    equip($slot`acc2`, $item`Eight Days a Week Pill Keeper`);
    equip($slot`acc3`, $item`Kremlin's Greatest Briefcase`);

}

function shrugATBuffs(){
    if(have($effect`Ode to Booze`)){
        cliExecute("shrug Ode to Booze");
    }
    if(have($effect`Ur-Kel's Aria of Annoyance`)){
        cliExecute("shrug Ur-Kel's Aria of Annoyance");
    }
    if(have($effect`Polka of Plenty`)){
        cliExecute("shrug Polka of Plenty");
    }    
}


const musclePredictor = () =>
    60 - Math.floor((1 / 30) * (myBuffedstat($stat`muscle`) - myBasestat($stat`muscle`)));

function musclebuffs() {

    cliExecute("retrocape vampire hold");
    ensureEffect($effect`Big`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`Lack of Body-Building`); 
    ensureEffect($effect`Quiet Determination`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Go Get 'Em, Tiger!`);

}


export function muscleTest(): number {
    stat_uniform();
    shrugATBuffs();
    musclebuffs();
    if (musclePredictor() > 1) {
      throw "Not enough muscle to cap";
    }
    return musclePredictor();
}

const mystPredictor = () =>
    60 - Math.floor((1 / 30) * (myBuffedstat($stat`mysticality`) - myBasestat($stat`mysticality`)));

function mystbuffs() {
    cliExecute("retrocape heck hold");
    ensureEffect($effect`Big`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`We're All Made of Starfish`);
    ensureEffect($effect`Quiet Judgement`);
    ensureEffect($effect`The Magical Mojomuscular Melody`);
    ensureEffect($effect`Glittering Eyelashes`);
}


export function mystTest(): number {
    stat_uniform();
    shrugATBuffs();
    mystbuffs();
    if (mystPredictor() > 1) {
      throw "Not enough mysticality to cap";
    }
    return mystPredictor();
}

const moxPredictor = () =>
    60 - Math.floor((1 / 30) * (myBuffedstat($stat`moxie`) - myBasestat($stat`moxie`)));

function moxBuffs() {
    cliExecute("retrocape robot thrill");
    ensureEffect($effect`Big`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`Pomp & Circumsands`);
    ensureEffect($effect`Quiet Desperation`);
    ensureEffect($effect`Disco Fever`);
    ensureEffect($effect`Blubbered Up`);
    ensureEffect($effect`Disco Smirk`);

}


export function moxTest(): number {
    stat_uniform();
    shrugATBuffs();
    stat_uniform();
    moxBuffs();
    
    if (moxPredictor() > 1) {
        throw "Not enough moxie to cap.";
    }
    return moxPredictor();
}

function hpBuffs() {
//    useSkill(1, $skill`Bind Undead Elbow Macaroni`);
    ensureEffect($effect`Big`);
//    ensureEffect($effect`Song of Starch`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Quiet Determination`);
//    ensureEffect($effect`Disdain of the War Snapper`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`Stevedave's Shanty of Superiority`);
    ensureEffect($effect`Lack of Body-Building`);
//    ensureEffect($effect`The Power of LOV`);
    if (!have($effect`Go Get 'Em, Tiger!`)) {
        retrieveItem($item`Ben-Gal™ Balm`);
        use(1, $item`Ben-Gal™ Balm`);
    }


    cliExecute('fold wad of used tape');
    equip($slot`hat`, $item`wad of used tape`);
    equip($slot`pants`, $item`cargo cultist shorts`);
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    equip($slot`off-hand`, $item`ebony epee`);
    equip($slot`acc1`, $item`kremlin\'s greatest briefcase`);
    equip($slot`acc2`, $item`eight days a week pill keeper`);
    equip($slot`acc3`, $item`hewn moon-rune spoon`);
    cliExecute("retrocape vampire hold");
    equip($slot`back`, $item`unwrapped knock-off retro superhero cape`);


}

const hpPredictor = () => 60 - Math.floor((myMaxhp() - myBuffedstat($stat`muscle`) - 3) / 30);
function hpTestPrep() {
    useFamiliar($familiar`Left-Hand Man`);
    maximize("hp", false);
}


export function HPTest(): number {
    
    // make space for AT buffs
    shrugATBuffs();

    hpBuffs();
    //hpTestPrep();

   
    if (hpPredictor() > 1) {
        throw "Failed to cap HP";
    }
    return hpPredictor();
}
