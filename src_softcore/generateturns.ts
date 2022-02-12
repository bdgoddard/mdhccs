import {
    autosell,
    buy,
    cliExecute,
    create,
    eudoraItem,
    myLevel,
    mySpleenUse,
    print,
    runChoice,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, $skill, get, have, SourceTerminal } from "libram";
import { tryUse } from "./phredhccs-lib";


function getTurns() {
    if (myLevel() === 1 && !mySpleenUse()) {
        // using numberology
        while (get("_universeCalculated") < get("skillLevel144")) {
            cliExecute("numberology 69");
        }
    } else {
      print(`Not at start of run - ignore numberology`);
    }
    if (!get("_borrowedTimeUsed")) {
        if (!have($item`borrowed time`)) {
            // creating borrowed time
            create(1, $item`borrowed time`);
        }
        // using borrowed time
        use(1, $item`borrowed time`);
    } else {
      print(`Borrowed time already used`);
    }
}

export function main(): void {
    getTurns();
}

export function generateTurns(){
  main();
}
