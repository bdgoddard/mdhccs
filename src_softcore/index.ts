import {
    abort,
    cliExecute,
    gametimeToInt,
    myLevel,
    myMaxmp,
    myMp,
    myPathId,
    print,
    setAutoAttack,
    visitUrl,
} from "kolmafia";
import coilWire from "./coilwire";
import familiarTest from "./familiarweight";
import hotTest from "./hotres";
import itemTest from "./item";
import levelUp from "./level";
import noncombatTest from "./noncombat";
import { convertMilliseconds, ensureMp, pullIfPossible, PropertyManager, Test, tests, testWrapper, testDone } from "./phredhccs-lib";
import spellTest from "./spell";
import { HPTest, moxTest, muscleTest, mystTest } from "./stattests";
import weaponTest from "./weapon";

import { toot } from "./toot";
import { shopping } from "./shopping";
import { generateTurns } from "./generateturns";
import { prepGear } from "./prepgear";
import { firstFights} from "./firstfights"; 
import { getIngredients } from "./getingredients";
import { buff } from "./buff";
import { mushroom } from "./mushroom";
import { lovTunnel } from "./lovtunnel";
import { profChain } from "./profchain";
import { backupChain } from "./backupchain";
import { nep } from "./nep";
import { godLobster } from "./godlobster";
import { pilsners } from "./pilsners";

//preamble
if (myPathId() !== 25) abort();
visitUrl("council.php");
cliExecute("ccs twiddle");
setAutoAttack(0);

const startTime = gametimeToInt();

if(!testDone(Test.COIL_WIRE)){
 toot();
 generateTurns();
 shopping();
 prepGear();
 firstFights(); // can't hurt as we no longer fish for goblins in NEP
}

try {
    testWrapper("wire-coiling", Test.COIL_WIRE, coilWire);
    } finally {};

// should have full hp and mp

if(!testDone(Test.MOX)){

  getIngredients();
  buff();
  mushroom();
  lovTunnel(); 
  godLobster();
  profChain();
//  backupChain(); // keep for garbo
  nep();

}

ensureMp(Math.min(1000,myMaxmp()));

pilsners();  // only use as many as necessary

try {
    testWrapper("moxie", Test.MOX, moxTest);
    testWrapper("muscle", Test.MUS, muscleTest);
    testWrapper("HP", Test.HP, HPTest);
    testWrapper("mysticality", Test.MYS, mystTest);
    } finally {};

try {
    testWrapper("item", Test.ITEM, itemTest);
    } finally {};

try {
    testWrapper("hot res", Test.HOT_RES, hotTest);
    } finally {};

try {
    testWrapper("noncombat", Test.NONCOMBAT, noncombatTest);
    } finally {};

try {
    testWrapper("familiar", Test.FAMILIAR, familiarTest);
    } finally {};

try {
    testWrapper("weapon damage", Test.WEAPON, weaponTest);
    } finally {};


try {
//    if(myMp()>0){
//      throw("Check spell damage maximizer");
//    };
    testWrapper("spell damage", Test.SPELL, spellTest);

    } finally {};


try {
//    testWrapper("wire-coiling", Test.COIL_WIRE, coilWire);
//    if (myLevel() < 13) levelUp();
//    testWrapper("moxie", Test.MOX, moxTest);
//    testWrapper("HP", Test.HP, HPTest);
//    testWrapper("muscle", Test.MUS, muscleTest);
//    testWrapper("mysticality", Test.MYS, mystTest);
//    testWrapper("item", Test.ITEM, itemTest);
//    testWrapper("hot res", Test.HOT_RES, hotTest);
//    testWrapper("noncombat", Test.NONCOMBAT, noncombatTest);
//    testWrapper("familiar", Test.FAMILIAR, familiarTest);
//    testWrapper("weapon damage", Test.WEAPON, weaponTest);
//    testWrapper("spell damage", Test.SPELL, spellTest);
} finally {
    tests.forEach((testDuration) => {
        print(
            `We expected the ${testDuration.testName} test to take ${testDuration.turnPrediction} turns, and it cost ${testDuration.turnCost} turns.`,
            "blue"
        );
    });
    print(
        `This loop took ${convertMilliseconds(
            gametimeToInt() - startTime
        )}, assuming it ran contiguously. Otherwise, this run of the program lasted that much time. Hope whatever number you see is good!`,
        "red"
    );
    setAutoAttack(0);
    PropertyManager.resetAll();
}
