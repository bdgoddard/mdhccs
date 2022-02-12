import {
    autosell,
    availableAmount,
    buy,
    cliExecute,
    create,
    eudoraItem,
    itemAmount,
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
import { fuelUp, tryUse } from "./phredhccs-lib";

function countWorthlessItems(): number {
  return availableAmount($item`worthless gewgaw`)
         + availableAmount($item`worthless knick-knack`)
         + availableAmount($item`worthless trinket`);
}

function countSewerItems(): number{
  var sewerItems = 0;
  $items`disco ball, disco mask, helmet turtle, hollandaise helmet, mariachi hat, 
         pasta spoon, ravioli hat, saucepan, seal-skull helmet, seal-clubbing club, 
         stolen accordion, turtle totem`.forEach(
            (item) => sewerItems += Number(itemAmount(item) > 0)
  );
  return sewerItems;
}
   
function generalStore(): void {
  print(`Visiting general store...`);

  // dramatic range
  if (!get("hasRange")) {
    print(`Getting and using dramatic range`);
    if (!have($item`Dramatic™ range`)) {
      buy(1, $item`Dramatic™ range`);
    }
    use(1, $item`Dramatic™ range`);
  } else {
    print(`Already have dramatic range`);
  }

  print(`Finished general store shopping.`);
}

function numberologyMeat(): void {    
  // generate 1400 meat
    while (get("_universeCalculated") < get("skillLevel144")) {
        cliExecute("numberology 14");
        autosell(14, $item`moxie weed`);
    }
    
}

function sewerFishing(): void {
  // fish using all available gum on string
  //const gumStringAvailable = availableAmount($item`chewing gum on a string`);
  //use($item`chewing gum on a string`,gumStringAvailable);
  cliExecute("acquire saucepan");
  cliExecute("acquire turtle totem");
}

function getAccordion(): void {
  if (!have($item`toy accordion`)) {
    print(`Need toy accordion`);
    buy(1, $item`toy accordion`);
  } else {
    print(`Already have toy accordion`);
  }
}

function getMeatcar(): void {
  if (!have($item`bitchin' meatcar`)) {
    print(`Creating bitchin' meatcar`);
    cliExecute("create bitchin' meatcar");
  } else {
    print(`Already have bitchin' meatcar`);
  }
}

export function main() {
  //numberologyMeat();
  generalStore();
  sewerFishing();
  getAccordion();
  getMeatcar();
  //fuelUp(); // going to use things from run
}

export function shopping(){
  main();
}