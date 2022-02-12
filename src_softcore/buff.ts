import {
    adv1,
    autosell,
    availableAmount,
    buy,
    chew,
    cliExecute,
    containsText,
    create,
    equip,
    eudoraItem,
    haveEffect,
    haveSkill,
    myLevel,
    myMp,
    myPrimestat,
    mySpleenUse,
    print,
    pullsRemaining,
    runChoice,
    runCombat,
    setAutoAttack,
    sweetSynthesis,
    toInt,
    toUrl,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";

import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $slot, $stat, get, have, set, Macro,} from "libram";

import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, hotTub, md_uniform, pullIfPossible, setChoice, topupMP, withMacro, ensureMp} from "./phredhccs-lib";

import { synth, } from "./synth";

function potions() {

  // get dramatic range
  if (!getPropertyBoolean('hasRange')) {
    ensureItem(1, $item`Dramatic™ range`);
    use(1, $item`Dramatic™ range`);
  }

  // get scruptious reagents
  if (haveSkill($skill`Advanced Saucecrafting`)) useSkill(1, $skill`Advanced Saucecrafting`);

  print(`Getting tomato power, stat buff, and equaliser`)

  ensurePotionEffect($effect`Tomato Power`, $item`tomato juice of powerful power`);
  
  if(myPrimestat() === $stat`Mysticality`){
    // grapefruit
    ensurePotionEffect($effect`Mystically Oiled`, $item`ointment of the occult`);
    // cherry
    ensurePotionEffect($effect`Expert Oiliness`, $item`oil of expertise`);
  }
  else if (myPrimestat() === $stat`Muscle`){
    // lemon
    ensurePotionEffect($effect`Phorcefullness`, $item`philter of phorce`);
    // get a lime
    ensureMp(50);
    if(have($skill`Prevent Scurvy and Sobriety`)){
      useSkill(1,$skill`Prevent Scurvy and Sobriety`);
    }
    ensurePotionEffect($effect`Stabilizing Oiliness`, $item`oil of stability`);
  }
  else if (myPrimestat() === $stat`Moxie`){
    
  }

}

function statGain() {

    // campsite
    if (!have($effect`That's Just Cloud-Talk, Man`)) {
        visitUrl('place.php?whichplace=campaway&action=campaway_sky');
    }

    // shower
    if(myPrimestat() === $stat`Mysticality`){
      ensureEffect($effect`Inscrutable Gaze`);
      ensureEffect($effect`Thaumodynamic`); 
    }
    else if (myPrimestat() === $stat`Muscle`){
      ensureEffect($effect`Muscle Unbound`); 
    }
    else if (myPrimestat() === $stat`Moxie`){
      ensureEffect($effect`So Fresh and So Clean`); 
    }
  
    equip($item`familiar scrapbook`);

    //ensureEffect($effect`substats.enh`); // save for meat buff
}

function familiarWeight(){
     // Plan is for these buffs to fall all the way through to item -> hot res -> nc -> fam weight.
    ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Do I Know You From Somewhere?`);

    ensureEffect($effect`Empathy`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Blood Bond`);
}

function buffMainstat() {
    
  topupMP();

  // good for all mainstat
  ensureEffect($effect`Favored by Lyle`);
  ensureEffect($effect`Starry-Eyed`);
  if (get('_powerfulGloveBatteryPowerUsed') <= 95) ensureEffect($effect`Triple-Sized`);
  ensureEffect($effect`Feeling Excited`);
  ensureEffect($effect`Big`);
  ensureEffect($effect`Total Protonic Reversal`);
  ensureEffect($effect`Broad-Spectrum Vaccine`);  // spacegate
  
  // 10% - need to think about AT buffs
  // ensureEffect($effect`Stevedave's Shanty of Superiority`); 

  if(!have($effect`Purity of Spirit`)){
    if(!have($item`cold-filtered water`)){
      create(1,$item`cold-filtered water`);
    };
    use(1,$item`cold-filtered water`);
  }

  if(myPrimestat() === $stat`Mysticality`){
    ensureEffect($effect`We're All Made of Starfish`);
    ensureEffect($effect`Uncucumbered`); // boxing day care
    ensureEffect($effect`The Magical Mojomuscular Melody`);
    // ensureEffect($effect`Quiet Judgement`); // already using facial expression
    ensureEffect($effect`Glittering Eyelashes`);
  }
  else if (myPrimestat() === $stat`Muscle`){
    ensureEffect($effect`Lack of Body-Building`); 
    ensureEffect($effect`Muddled`); // boxing day care
    ensureEffect($effect`Quiet Determination`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Go Get 'Em, Tiger!`);
    ensureEffect($effect` Blessing of your favorite Bird`); // 200% mus
  }
  else if (myPrimestat() === $stat`Moxie`){
    ensureEffect($effect`Pomp & Circumsands`); 
    ensureEffect($effect`Ten out of Ten`); // boxing day care
    ensureEffect($effect`Quiet Despersation`);
    ensureEffect($effect`Disco Fever`);
    ensureEffect($effect`Blubber Up`);
    ensureEffect($effect`Butt-Rock Hair`);
  }

  if (!haveEffect($effect`Holiday Yoked`)) {
    ensureMp(50);
    useFamiliar($familiar`Ghost of Crimbo Carols`);
    equip($item`familiar scrapbook`);  // ensure no kramco

    Macro.skill($skill`Snokebomb`).setAutoAttack();
    adv1($location`Noob Cave`, -1, '');

    setAutoAttack(0);

    useFamiliar($familiar`Hovering Sombrero`);
  }

}


function otherBuffs(){
  // !get('_clanFortuneBuffUsed') && cliExecute('fortune buff item'); // save for garbo?
  ensureEffect($effect`Astral Shell`);
  ensureEffect($effect`Ghostly Shell`);
  ensureEffect($effect`Feeling Peaceful`);
  ensureEffect($effect`Polka of Plenty`);
  ensureEffect($effect`items.enh`); 
}

function monsterLevel(){
  ensureEffect($effect`Drescher's Annoying Noise`);
  ensureEffect($effect`Pride of the Puffin`);
  ensureEffect($effect`Ur-Kel's Aria of Annoyance`);
}

function synthBuffs(){
  synth("stats");
  synth("statgain");
}


function nepBuff(){
// not using

    if(!have($effect`Tomes of Opportunity`)) {
      print(`Getting tomes of opportunity from NEP`);

//      set('choiceAdventure1322', '2'); // Here to Party
      set('choiceAdventure1324', '1'); // It Hasn't Ended, It's Just Paused; Head upstairs
      set('choiceAdventure1325', '2'); // A Room With a View... Of a Bed; Read the tomes

      // if we haven't already adventured there get rid of the nc
      if (!containsText($location`The Neverending Party`.noncombatQueue, 'The Beginning of the Neverend')) {

         visitUrl(toUrl($location`The Neverending Party`));
         if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
           print("Gerald/ine quest!", "blue");
         }
         if (["food", "booze"].includes(get("_questPartyFairQuest"))) {
           runChoice(1); // Accept quest
         } else {
           runChoice(2); // Decline quest
         }

//        adv1($location`The Neverending Party`, -1, '');
      }

      if(!have($effect`Stench Jellied`)){
        chew(1,$item`stench jelly`);
      }

      adv1($location`The Neverending Party`); // desired nc

  }
}

function statGainUniform(){
  md_uniform();
  if (myPrimestat() === $stat`Muscle` && have($item`LOV Eardigan`)){
    equip($slot`shirt`,$item`LOV Eardigan`) // statgain
  }
}

function bastille() {

  cliExecute("bastille mainstat");

  /*
  if(myPrimestat() === $stat`Mysticality`){
    // +50% mys and +50% spell damage
    cliExecute("bastille myst");
  }
  else if (myPrimestat() === $stat`Muscle`){
    // +50% mus and +8 familiar weight
    cliExecute("bastille muscle");
  }
  else if (myPrimestat() === $stat`Moxie`){
    // +50% mox and (useless?) 25% item
     cliExecute("bastille moxie");
  }
  */

}

function tenPercent() {
  if(have($item`a ten-percent bonus`)){
    use($item`a ten-percent bonus`);
  }
}

function boxingDaycare() {
  
  // Scavenge for gym equipment - gives a few stats
  if (toInt(get("_daycareGymScavenges")) < 1) {
    visitUrl("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
    const pg = runChoice(3);
    if (containsText(pg, "[free]")) runChoice(2);
    runChoice(5);
    runChoice(4);
  }
}


export function main() {
  synthBuffs();
  potions();
  buffMainstat();
  statGain();
  familiarWeight();
  topupMP();
  otherBuffs();
  monsterLevel()
  statGainUniform()
  tenPercent();
  bastille();
  boxingDaycare();
  md_uniform();
}

export function buff() {
  main();
}