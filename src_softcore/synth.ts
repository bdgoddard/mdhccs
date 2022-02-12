import {
    myPrimestat,
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

    const complexCandyMap1: { [index: number]: string } = {
        0: "bag of W&Ws",
        1: "PEEZ dispenser",
        2: "Swizzler",
        3: "Milk Studs",
        4: "box of Dweebs",
    };

    // deal with the fact we can only pull one of each item
    const complexCandyMap2: { [index: number]: string } = {
        0: "garbage-juice-flavored Hob-O",
        1: "strawberry-flavored Hob-O",
        2: "sterno-flavored Hob-O",
        3: "frostbite-flavored Hob-O",
        4: "fry-oil-flavored Hob-O",
    };

    const simpleCandyMap: { [index: number]: string } = {
        0: "jabañero-flavored chewing gum",
        1: "orange candy heart",
        2: "Chubby and Plump bar",
        3: "lime-and-chile-flavored chewing gum",
        4: "pickle-flavored chewing gum",
    };

    const crimboCandyMap: { [index: string]: number } = {
        "Crimbo candied pecan": 0,
        "Crimbo peppermint bark": 3,
        "Crimbo fudge": 4,
    };

    const crimboCandies: string[] = [
        "Crimbo candied pecan",
        "Crimbo peppermint bark",
        "Crimbo fudge",
    ];

    if (buffType === "stats"){

        var buffMap: { [index: string]: number } = {
            "Muscle": 0,
            "Mysticality": 1,
            "Moxie": 2,
        };

        var pullCandyMap = simpleCandyMap;
    }
    else if (buffType === "statgain"){
        var buffMap: { [index: string]: number } = {
            "Muscle": 2,
            "Mysticality": 3,
            "Moxie": 4,
        };

        var pullCandyMap = complexCandyMap1;
    }
    else if (buffType === "item"){
        var buffMap: { [index: string]: number } = {
            "Muscle": 1,
            "Mysticality": 1,
            "Moxie": 1,
        };

        var pullCandyMap = complexCandyMap2;
    }
    else{
        throw "Unknown Sweet Synthesis buff type ${buffType}";
    }

    //var target = buffMap[getPrimestat()];
    var target = buffMap[getPrimestat()];
    
    //print(`Target sum: ${target}`);

    if(have($skill`summon crimbo candy`)){
        useSkill(1,$skill`summon crimbo candy`);
    }

    var requiredCandyId = -1;
    var requiredCandy = "";
    var candyId = -1;
    var haveCrimboCandy = false;
    var haveRequiredCandy = false;
    var crimboCandy = "";

    for (var candy of crimboCandies) {
        candyId = crimboCandyMap[candy];
        //print(`Checking for ${candy} with id ${candyId}`);
        haveCrimboCandy = have($item`${candy}`);
        if (haveCrimboCandy){
            requiredCandyId = target - candyId;
            if (requiredCandyId < 0) requiredCandyId = requiredCandyId + 5;
            requiredCandy = pullCandyMap[requiredCandyId];
            //print(`Required candy Id: ${requiredCandyId}`);
            //print(`Required candy: ${requiredCandy}`);
            haveRequiredCandy = have($item`${requiredCandy}`);
            //print(`Have candy: ${haveRequiredCandy}`);
            if(!haveRequiredCandy){
                //print(`Pulling`);
                pullIfPossible(1,$item`${requiredCandy}`,3000);
            }
            crimboCandy = candy;
            break;
        }
    }

    var chosenCandies: string[] = [requiredCandy,crimboCandy];
    return chosenCandies;
}


export function synth(buffType: string){

    if (buffType === "stats"){
        var buffNames: { [index: string]: string } = {
            "Muscle": "Synthesis: Strong",
            "Mysticality": "Synthesis: Smart",
            "Moxie": "Synthesis: Cool",
        };
    }
    else if (buffType === "statgain"){
        var buffNames: { [index: string]: string } = {
            "Muscle": "	Synthesis: Movement",
            "Mysticality": "Synthesis: Learning",
            "Moxie": "Synthesis: Style",
        };
    }
    else if (buffType === "item"){
        var buffNames: { [index: string]: string } = {
            "Muscle": "Synthesis: Collection",
            "Mysticality": "Synthesis: Collection",
            "Moxie": "Synthesis: Collection",
        };
    }
    else{
        throw "Unknown Sweet Synthesis buff type ${buffType}";
    }

    var buffName = buffNames[getPrimestat()];

    if(!have($effect`${buffName}`)) {
        var chosenCandies = getCandy(buffType);
        print(`Chosen candies for ${buffName}: 
               ${chosenCandies[0]}, ${chosenCandies[1]}`);
        sweetSynthesis($item`${chosenCandies[0]}`,$item`${chosenCandies[1]}`);
    }

    if(!have($effect`${buffName}`)) {
        throw "Failed to get sweet synthesis buff ${buffName}"
    }

}

export function main(buffType: string) {

    synth(buffType);

}