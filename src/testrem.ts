import {
    autosell,
    buy,
    cliExecute,
    create,
    equip,
    eudoraItem,
    myLevel,
    mySpleenUse,
    runChoice,
    setAutoAttack,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
    myMp, 
    print,
    toInt,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, Macro, $monster, $skill, $slot, get, have, SourceTerminal } from "libram";
import { setClan, tryUse, reminisce } from "./phredhccs-lib";


function reminisceTest(monster: Monster){

    /*
    Macro.skill($skill`Duplicate`)
    .skill($skill`Feel Envy`)
    .skill($skill`Gingerbread Mob Hit`)
    .setAutoAttack();
    */

    Macro.skill($skill`saucestorm`).repeat().setAutoAttack();

    // block first attack
    equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);

    
    //visitUrl("choice.php?pwd&whichchoice=1463&option=1&mid=" + monster.getId());
    //visitUrl("choice.php?pwd&whichchoice=1463&option=1&mid=" + toInt(monster));

    reminisce(monster);

    setAutoAttack(0);

}

export function main() {
    //reminisce($monster`bookbat`);

    print(`${toInt($monster`bookbat`)}`);
    reminisceTest($monster`bookbat`);
    //print(`${toInt($monster`bookbat`)}`);

}