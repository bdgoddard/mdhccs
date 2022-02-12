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
    toUrl,
    toInt,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, $skill, get, have, $location, $monster, $effect, Macro} from "libram";
import { tryUse, getPropertyBoolean, getPropertyInt, setChoice, md_uniform, withMacro } from "./phredhccs-lib";

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

function mapAndSaberMonster(location: Location, monster: Monster) {
    
  equip($item`Fourth of May Cosplay Saber`);

  mapMonster(location, monster);

  withMacro(Macro.skill($skill`use the force`), runCombat);
  if (handlingChoice()) runChoice(3);
}

function mapAndJellyMonster(location: Location, monster: Monster) {
  
  useFamiliar($familiar`Space Jellyfish`);

  mapMonster(location, monster);

  withMacro(Macro.skill($skill`extract jelly`).skill($skill`feel hatred`), runCombat);
}

function mapAndHatredMonster(location: Location, monster: Monster) {
    
  mapMonster(location, monster);

  withMacro(Macro.skill($skill`feel hatred`), runCombat);
}


function mapAndNostEnvyLickMonster(location: Location, monster: Monster) {
   
  // add error handling for shocking lick

  mapMonster(location, monster);

  withMacro(Macro.skill($skill`feel nostalgic`)
                 .skill($skill`feel envy`)
                 .skill($skill`shocking lick`), runCombat);
}

function openSkeletonStore() {
  // open skeleton store

  // check quest is started
  if (getProperty('questM23Meatsmith') === 'unstarted') {
    visitUrl('shop.php?whichshop=meatsmith&action=talk');
    runChoice(1);
  }

  // if we haven't already adventured there get rid of the nc
  if (!containsText($location`The Skeleton Store`.noncombatQueue, 'Skeletons In Store')) {
    adv1($location`The Skeleton Store`, -1, '');
  }
 
  // check nothing went wrong
  if (!containsText($location`The Skeleton Store`.noncombatQueue, 'Skeletons In Store')) {
    throw 'Something went wrong at skeleton store.';
  }
}


function oneVeryClearEye(){
  // cyclops eyedrops
  if( !have($effect`One Very Clear Eye`) ){
    print(`Getting one very clear eye`);
    if( !have($item`cyclops eyedrops`) ){
       print(`Using semirare`);
       cliExecute('pillkeeper semirare');
       adv1($location`The Limerick Dungeon`);
    }
    print(`Using cyclops eyedrops`);
    use($item`cyclops eyedrops`);
  } else {
    print(`Already have one very clear eye`);
  }
        
}

function raidHermit() {

  if( !have($item`seal tooth`) ){
    print(`Getting seal tooth`);
    cliExecute(`hermit seal tooth`);
  } else {
    print(`Already have seal tooth`);
  }

  if( !have($item`volleyball`) ){
    print(`Getting volleyball`);
    cliExecute(`hermit volleyball`);
  } else {
    print(`Already have volleyball`);
  }
  
  if( !have($item`blood-faced volleyball`) ){
    print(`Getting blood-faced volleyball`);
    cliExecute(`hermit volleyball`);
    use($item`seal tooth`);
    use($item`volleyball`);
  } else {
    print(`Already have blood-faced volleyball`);
  }

}


export function main() {

  // ensure shocking lick
  !have($effect`Lantern-Charged`) && use($item`battery (lantern)`);

  if(    have($item`tomato`) 
      || have($item`tomato juice of powerful power`)
      || have($effect`tomato power`)
     ){
    print(`Already have tomato, potion, or effect`);
  } else {
    print(`Getting tomato nostalgia`);
//    mapAndSaberMonster($location`The Haunted Pantry`,$monster`possessed can of tomatoes`);
     mapAndHatredMonster($location`The Haunted Pantry`,$monster`possessed can of tomatoes`);
  }

  if(    have($item`cherry`) 
      || have($item`oil of expertise`)
      || have($effect`expert oiliness`)
  ){
    print(`Already have cherry, potion, or effect`);    
  } else {
    print(`Getting fruit`);
    openSkeletonStore();
//    mapAndSaberMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
    mapAndNostEnvyLickMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
  }

  autosell(availableAmount($item`lemon`), $item`lemon`);
  autosell(availableAmount($item`orange`), $item`orange`);
  autosell(availableAmount($item`razor-sharp can lid`), $item`razor-sharp can lid`);

  if(  have($item`stench jelly`)
      || have($effect`stench jellied`)
  ){
    print(`Already have stench jelly or effect`);
  } else {
    print(`Getting stench jelly`);
    mapAndJellyMonster($location`The Haunted Pantry`,$monster`fiendish can of asparagus`);
  }

  oneVeryClearEye();

  raidHermit();

}

export function getIngredients() {
  main();
}