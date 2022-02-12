import {
    adv1,
    autosell,
    availableAmount,
    buy,
    cliExecute,
    containsText,
    create,
    equip,
    eudoraItem,
    getProperty,
    handlingChoice,
    haveSkill,
    myLevel,
    mySpleenUse,
    print,
    runCombat,
    runChoice,
    setAutoAttack,
    toUrl,
    toInt,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, $skill, $slot, get, have, $location, $monster, $effect, Macro} from "libram";
import { tryUse, getPropertyBoolean, getPropertyInt, reminisce, setChoice, md_uniform, withMacro, topupMP } from "./phredhccs-lib";

function mapMonster(location: Location, monster: Monster) {
  if (
    haveSkill($skill`Map the Monsters`) &&
    !getPropertyBoolean('mappingMonsters') &&
    getPropertyInt('_monstersMapped') < 3
  ) {
    useSkill($skill`Map the Monsters`);
  }

  if (!getPropertyBoolean('mappingMonsters')) throw 'Failed to setup Map the Monsters.';

  const mapPage = visitUrl(toUrl(location), false, true);
  if (!mapPage.includes('Leading Yourself Right to Them')) throw 'Something went wrong mapping.';

  const fightPage = visitUrl(
    `choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=${monster.id}`
  );
  if (!fightPage.includes(monster.name)) throw 'Something went wrong starting the fight.';
}

function mapAndJellyMonster(location: Location, monster: Monster) {
  
  useFamiliar($familiar`Space Jellyfish`);

  Macro.skill($skill`extract jelly`).skill($skill`feel hatred`).setAutoAttack();
  mapMonster(location, monster);

  setAutoAttack(0);  
}

function mapAndHatredMonster(location: Location, monster: Monster) {
    
  Macro.skill($skill`feel hatred`).setAutoAttack();
  mapMonster(location, monster);

  setAutoAttack(0);  
}


function mapAndNostLickMonster(location: Location, monster: Monster) {
   
  // add error handling for shocking lick

  Macro.skill($skill`feel nostalgic`)
                 .skill($skill`shocking lick`).setAutoAttack();

  mapMonster(location, monster);
  setAutoAttack(0);  

}

function mapAndNostHitMonster(location: Location, monster: Monster) {
   
  //equip($slot`acc3`,$item`Lil' Doctor™ bag`);
  Macro.skill($skill`feel nostalgic`)
        .skill($skill`envy`)
        .skill($skill`Gingerbread Mob Hit`)
        .setAutoAttack();

  mapMonster(location, monster);
  setAutoAttack(0);  

}


function tomatoFruit(){
  if(  have($item`tomato`) 
      || have($item`tomato juice of powerful power`)
      || have($effect`tomato power`)
     )
  {
    print(`Already have tomato, potion, or effect (and we assume all fruits)`);
  } else {
    // ensure shocking lick
    //!have($effect`Lantern-Charged`) && use($item`battery (lantern)`);
     
    // ensure mp
    topupMP();

    // check if we've already seen a tomato
    if( !( getProperty('lastCopyableMonster')  === 'possessed can of tomatoes' ) ){
      // check if meatsmith quest is started
      if (getProperty('questM23Meatsmith') === 'unstarted') {
        print(`Opening skeleton store`);
        visitUrl('shop.php?whichshop=meatsmith&action=talk');
        runChoice(1);
        // get rid of nc
        adv1($location`The Skeleton Store`, -1, '');
      }
    
      print(`Getting tomato nostalgia`);
      mapAndHatredMonster($location`The Haunted Pantry`,$monster`possessed can of tomatoes`);
  }
    // now sure we have a tomato to nost
    //mapAndNostLickMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
    mapAndNostHitMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
  }
   
 autosell(availableAmount($item`razor-sharp can lid`), $item`razor-sharp can lid`);
 autosell(availableAmount($item`orange`), $item`orange`);
}



export function main() {
  tomatoFruit();
}

export function getIngredients() {
  main();
}