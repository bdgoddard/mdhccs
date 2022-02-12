import { adv1, cliExecute, create, eat, equip, getProperty, 
         myHp, myMaxhp, myMp, print, setAutoAttack, toInt, useSkill, visitUrl } from "kolmafia";
import { $item, $location, $skill, $slot, get, have, Macro } from "libram";
import { delevel, easyFight } from "./phccs-macros";
import { advMacro, fightSausageIfAble, hotTub, md_uniform, topupMP, useDefaultFamiliar } from "./phredhccs-lib";

export function firstFights() {

    md_uniform();

    // make it easy for non-myst classes by using a lantern
    if(!(getProperty("retroCapeSuperhero") == "heck") ||
        !(getProperty("retroCapeWashingInstructions") == "kill") ) {
        cliExecute("retrocape heck kill");
    }

    // ensure sausage goblin
    equip($item`Kramco Sausage-o-Matic™`);
    // ensure we get a ghost detection
    equip($slot`back`, $item`protonic accelerator pack`);
    // don't waste garbage shirt
    equip($slot`shirt`, $item`fresh coat of paint`);
    
    topupMP();
    
    if( toInt(getProperty("_sausageFights")) === 0 ) {

        Macro.skill($skill`Saucegeyser`)
             .repeat()
             .setAutoAttack();
    
        adv1($location`Noob Cave`, -1, '');
 
        setAutoAttack(0);
    }

    // prevent another goblin
    equip($item`familiar scrapbook`);
    const ghostLocation = get("ghostLocation");

    if (ghostLocation) {

        topupMP();

        Macro.skill("shoot ghost")
             .skill("shoot ghost")
             .skill("shoot ghost")
             .skill("trap ghost")
             .setAutoAttack();

        adv1(ghostLocation, -1, '');

        setAutoAttack(0);
    }

    // reset clothing
    md_uniform();
}

export function main() {
    firstFights();
}
