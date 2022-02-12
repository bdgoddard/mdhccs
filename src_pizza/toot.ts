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
import { $coinmaster, $familiar, $item, $items, $skill, get, have} from "libram";
import { tryUse } from "./phredhccs-lib";

function visit(): void {
  print(`Visiting toot ...`);
  visitUrl("tutorial.php?action=toot");
  tryUse(1, $item`letter from King Ralph XI`);
  tryUse(1, $item`pork elf goodies sack`);
  print(`Selling gems ...`);
  autosell(5, $item`baconstone`);
  autosell(5, $item`hamethyst`);
  autosell(5, $item`porquoise`);
  print(`Done at toot`);
}

export function main() {
  visit();
}

export function toot() {
  main();
}

