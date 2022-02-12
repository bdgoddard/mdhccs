import {
    buy,
    myPrimestat,
    numberologyPrize,
    print,
    sweetSynthesis,
    useSkill,
} from "kolmafia";

import {
    $class,
    $effect,
    $familiar,
    $item,
    $location,
    $skill,
    $slot,
    $stat,
    get,
    have,
    Macro,
} from "libram";

import {
    pullIfPossible,
} from "./phredhccs-lib"


function getPrimestat() {
    var primeStat = myPrimestat();
    var primeStatName = "";
    if (primeStat === $stat`Muscle`){
        primeStatName = "Muscle";
    }
    else if (primeStat === $stat`Mysticality`){
        primeStatName = "Mysticality";
    }
    else if (primeStat === $stat`Moxie`){
        primeStatName = "Moxie";
    }

    return primeStatName;
}

function getCandy(buffType: string) {

    const complexCandyMap: { [index: number]: string } = {
        0: "Crimbo candied pecan",
        3: "Crimbo peppermint bark",
        4: "Crimbo fudge",
    };

    const simpleCandyMap: { [index: number]: string } = {
        0: "jabañero-flavored chewing gum",
        2: "tamarind-flavored chewing gum",
        3: "lime-and-chile-flavored chewing gum",
        4: "pickle-flavored chewing gum",
    };

    if (buffType === "stats"){

        var candy1Type = "simple";
        var candy2Type = "complex";
        var candyId1: { [index: string]: number } = {
            "Muscle": 0, // 0 = 0 + 0 
            "Mysticality": 3, // 2 = 3 + 4
            "Moxie": 3, // 1 = 3 + 3
        };
        var candyId2: { [index: string]: number } = {
            "Muscle": 0, // 0 = 0 + 0 
            "Mysticality": 4, // 2 = 3 + 4
            "Moxie": 3, // 1 = 3 + 3
        };
    
    }
    else if (buffType === "statgain"){

        var candy1Type = "complex";
        var candy2Type = "complex";
        var candyId1: { [index: string]: number } = {
            "Muscle": 4, // 2 = 4 + 3 
            "Mysticality": 4, // 4 = 4 + 0
            "Moxie": 4, // 3 = 4 + 4
        };
        var candyId2: { [index: string]: number } = {
            "Muscle": 3, // 2 = 4 + 3 
            "Mysticality": 0, // 4 = 4 + 0
            "Moxie": 4, // 3 = 4 + 4
        };

    }
    else if (buffType === "item"){
        var candy1Type = "complex";
        var candy2Type = "complex";
        var candyId1: { [index: string]: number } = {
            "Muscle": 3, 
            "Mysticality": 3, 
            "Moxie": 3, 
        };
        var candyId2: { [index: string]: number } = {
            "Muscle": 3, 
            "Mysticality": 3, 
            "Moxie": 3, 
        };
    }
    else{
        throw `Unknown Sweet Synthesis buff type ${buffType}`;
    }

    if(candy1Type === "complex"){
        var candyMap1 = complexCandyMap;
    } else if (candy1Type === "simple") {
        var candyMap1 = simpleCandyMap;
    }
    else{
        throw `Unknown candy type type ${candy1Type}`;
    }

    if(candy2Type === "complex"){
        var candyMap2 = complexCandyMap;
    } else if (candy2Type === "simple") {
        var candyMap2 = simpleCandyMap;
    }
    else{
        throw `Unknown candy type type ${candy2Type}`;
    }

    var primeStat = getPrimestat();

    var candy1 = candyMap1[candyId1[primeStat]];
    var candy2 = candyMap2[candyId2[primeStat]];

    print(candy1);
    print(candy2);

    if(candy1Type === "simple"){
        if(!have($item`${candy1}`)){
            buy(1,$item`${candy1}`);
        }
    }
    
    if(!have($item`${candy1}`)){
        throw `Missing ${candy1}`;
    }
    
    if(candy2Type === "simple"){
        if(!have($item`${candy2}`)){
            buy(1,$item`${candy2}`);
        }
    }

    if(!have($item`${candy2}`)){
        throw `Missing ${candy2}`;
    }

    /*
    if(have($skill`summon crimbo candy`)){
        useSkill(1,$skill`summon crimbo candy`);
    }
    */

    var chosenCandies: string[] = [candy1,candy2];
    return chosenCandies;
}


export function synth(buffType: string){


    if (buffType === "stats"){ // simple + complex
        var buffNames: { [index: string]: string } = {
            "Muscle": "Synthesis: Strong", // 0 = 0 + 0 
            "Mysticality": "Synthesis: Smart", // 2 = 3 + 4
            "Moxie": "Synthesis: Cool", // 1 = 3 + 3
        };

    }
    else if (buffType === "statgain"){ // complex + complex
        var buffNames: { [index: string]: string } = {
            "Muscle": "	Synthesis: Movement", // 2 = 4 + 3
            "Mysticality": "Synthesis: Learning", // 4 = 4 + 0
            "Moxie": "Synthesis: Style", // 3 = 4 + 4
        };
    }
    else if (buffType === "item"){
        var buffNames: { [index: string]: string } = {
            "Muscle": "Synthesis: Collection", // 1 = 3 + 3
            "Mysticality": "Synthesis: Collection",
            "Moxie": "Synthesis: Collection",
        };
    }
    else{
        throw `Unknown Sweet Synthesis buff type ${buffType}`;
    }

    var buffName = buffNames[getPrimestat()];

    if(!have($effect`${buffName}`)) {
        var chosenCandies = getCandy(buffType);
        print(`Chosen candies for ${buffName}: 
               ${chosenCandies[0]}, ${chosenCandies[1]}`);
        sweetSynthesis($item`${chosenCandies[0]}`,$item`${chosenCandies[1]}`);
    }

    if(!have($effect`${buffName}`)) {
        throw `Failed to get sweet synthesis buff ${buffName}`
    }

}

export function main(buffType: string) {

    synth(buffType);

}