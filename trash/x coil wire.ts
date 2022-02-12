import { cliExecute, create, eat, equip } from "kolmafia";
import { $item, $location, $skill, $slot, get, have, Macro } from "libram";
import { delevel, easyFight } from "./phccs-macros";
import { advMacro, fightSausageIfAble, uniform, useDefaultFamiliar } from "./phredhccs-lib";
import { runStart } from "./runstart";

function firstFights() {

    md_uniform();
    // ensure sausage goblin
    equip($item`Kramco Sausage-o-Matic™`);
    // ensure we get a ghost detection
    equip($slot`back`, $item`protonic accelerator pack`);
    topupMP();
    hotTub();

    if( getProperty("_sausageFights") == 0 ){

    Macro.skill($skill`Saucegeyser`)
         .repeat()
         .setAutoAttack();
    
    adv1($location`Noob Cave`, -1, '');

    setAutoAttack(0);

    // prevent another goblin
    equip($item`familiar scrapbook`);
    const ghostLocation = get("ghostLocation");
    if (ghostLocation) {
        Macro.skill("shoot ghost")
             .skill("shoot ghost")
             .skill("shoot ghost")
             .skill("trap ghost")

        adv1(ghostLocation, -1, '');

        setAutoAttack(0);

        );
    }
}

function playDressUp() {
    equip($slot`pants`, $item`Cargo Cultist Shorts`);
    equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    equip($slot`acc2`, $item`Powerful Glove`);
    equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    cliExecute("/cast * candy heart");
}

export default function coilWire(): number {
    runStart();
    firstFights();
    playDressUp();
    return 60;
}
