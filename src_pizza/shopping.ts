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
import { tryUse } from "./phredhccs-lib";

function countWorthlessItems(): number {
  return availableAmount($item`worthless gewgaw`)
         + availableAmount($item`worthless knick-knack`)
         + availableAmount($item`worthless trinket`);
}

function countSewerItems(): number{
  var sewerItems = 0;
  $items`disco ball, disco mask, helmet turtle, hollandaise helmet, mariachi hat, pasta spoon, ravioli hat, saucepan, seal-skull helmet, seal-clubbing club, stolen accordion, turtle totem`.forEach(
            (item) => sewerItems += Number(itemAmount(item) > 0)
  );
  return sewerItems;
}
   
function generalStore(): void {
  print(`Visiting general store...`);

  // fishing supplies
  // determine how many we need
  const fishingItemsNeeded = 15 - countSewerItems() - countWorthlessItems();
  const gumStringAvailable = availableAmount($item`chewing gum on a string`);
  const gumStringNeeded = fishingItemsNeeded - gumStringAvailable;

  // buy if necessary
  if( gumStringNeeded <= 0 ) {
    print(`Already have enough chewing gum on a string`);
  } else {
    print(`Buying ${gumStringNeeded} chewing gum on a string`);
    buy($item`chewing gum on a string`, gumStringNeeded);
  }; 


  // hermit permit
  if(have($item`hermit permit`)){
    print(`Already have hermit permit`);
  } else {
    print(`Buying hermit permit`);
    buy($item`hermit permit`, 1);
  };

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

function sewerFishing(): void {
  // fish using all available gum on string
  const gumStringAvailable = availableAmount($item`chewing gum on a string`);
  use($item`chewing gum on a string`,gumStringAvailable);
}

function getAccordion(): void {
  if (!have($item`toy accordion`)) {
    print(`Need toy accordion`);
    buy(1, $item`toy accordion`);
  } else {
    print(`Already have toy accordion`);
  }
}

export function main() {
  generalStore();
  sewerFishing();
  getAccordion();
}

export function shopping(){
  main();
}