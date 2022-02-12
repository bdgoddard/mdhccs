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
    mySpleenUse,
    print,
    runChoice,
    runCombat,
    toUrl,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";

import { $coinmaster, $effect, $familiar, $item, $items, $location, $skill, $slot, get, have, set, Macro,} from "libram";

import { tryUse, eatPizza, ensureEffect, ensureItem, ensureNpcEffect, ensurePotionEffect, getPropertyBoolean, md_uniform, setChoice, withMacro} from "./phredhccs-lib";

function topupMP() {
  if (myMp() < 100) {
    print(`Topping up MP at campground`);
    visitUrl('place.php?whichplace=campaway&action=campaway_tentclick');
  }
}


function potions() {

  // get dramatic range
  if (!getPropertyBoolean('hasRange')) {
    ensureItem(1, $item`Dramatic™ range`);
    use(1, $item`Dramatic™ range`);
  }

  // get scruptious reagents
  if (haveSkill($skill`Advanced Saucecrafting`)) useSkill(1, $skill`Advanced Saucecrafting`);

  print(`Getting tomato power, mystically oiled, and expert oiliness`)
  ensurePotionEffect($effect`Tomato Power`, $item`tomato juice of powerful power`);
  ensurePotionEffect($effect`Mystically Oiled`, $item`ointment of the occult`);
  ensurePotionEffect($effect`Expert Oiliness`, $item`oil of expertise`);
  
}

function statGain() {
    if (!have($effect`That's Just Cloud-Talk, Man`)) {
        visitUrl('place.php?whichplace=campaway&action=campaway_sky');
    }

    ensureEffect($effect`Inscrutable Gaze`);
    ensureEffect($effect`Thaumodynamic`);

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

    equip($item`familiar scrapbook`);
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

function buffMoxie() {
    ensureEffect($effect`Favored by Lyle`);
    ensureEffect($effect`Starry-Eyed`);

    if (get('_powerfulGloveBatteryPowerUsed') <= 95) ensureEffect($effect`Triple-Sized`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`Big`);
    ensureEffect($effect`Total Protonic Reversal`);
    ensureEffect($effect`We're All Made of Starfish`);
//    ensureSong($effect`The Magical Mojomuscular Melody`);

    ensureEffect($effect`Hulkien`);

    ensureEffect($effect`Broad-Spectrum Vaccine`);  // spacegate

    if(!have($effect`Purity of Spirit`)){
      if(!have($item`cold-filtered water`)){
        create(1,$item`cold-filtered water`);
      };
      use(1,$item`cold-filtered water`);
    }

    if(!haveEffect($effect`On the Trolley`)) {
        topupMP();
        useSkill($skill`The Ode to Booze`);
        cliExecute('drink Bee\'s Knees');
    }

    ensureEffect($effect`items.enh`);
    ensureEffect($effect`substats.enh`);

    ensureEffect($effect`Glittering Eyelashes`);

//    ensureNpcEffect($effect`Glittering Eyelashes`, 5, $item`glittery mascara`);

    if (!haveEffect($effect`Holiday Yoked`)) {
      topupMP();
      useFamiliar($familiar`Ghost of Crimbo Carols`);
      equip($item`familiar scrapbook`);  // ensure no kramco

      visitUrl(toUrl($location`Noob Cave`), false, true);
      withMacro(Macro.skill($skill`Snokebomb`), runCombat);

      useFamiliar($familiar`Hovering Sombrero`);
    }

}


function otherBuffs(){
  !get('_clanFortuneBuffUsed') && cliExecute('fortune buff item');
  ensureEffect($effect`Astral Shell`);
  ensureEffect($effect`Ghostly Shell`);
  ensureEffect($effect`Feeling Peaceful`);
  ensureEffect($effect`Polka of Plenty`);
}

function pizzaStats(){


  if(!have($effect`Different Way of Seeing Things`)){

    // familiar equipment is an I
    useFamiliar($familiar`Imitation Crab`);
    equip($slot`familiar`,$item`miniature crystal ball`);  // prevent equipping imitation whetstone

    print(`Getting pizza buff different way of seeing things`);

    // make imitation whetstone for pizza ingredients
    if (!have($item`imitation whetstone`)) {
      print(`Getting imitation crab equipment`)

      if (!have($item`box of Familiar Jacks`)) {
         print(`Getting and using familiar jacks`);
         create(1, $item`box of Familiar Jacks`);
      }
    
      use(1, $item`box of Familiar Jacks`);
    
    } else {
      print(`Already have imitation whetstone`);
    }

    equip($slot`familiar`,$item`miniature crystal ball`);  // prevent equipping imitation whetstone

    // use pocket prof to get equipment
    useFamiliar($familiar`Pocket Professor`); 

    if(!have($item`full meat tank`)){
      cliExecute("acquire full meat tank");
    } else {
      print(`Already have full meat tank`);
    }

    cliExecute("refresh inventory");

    eatPizza(
            $item`disco ball`,
            $item`imitation whetstone`,
            $item`full meat tank`,
            $item`hollandaise helmet`
    );
  } else {
    print(`Already have effect different way of seeing things`);
  }
  // should have generated imitation whetstone for TRIV

  cliExecute("refresh inventory");

//  Have enough stat buff?
//  if(!have($effect`Trivia Master`)){
//    // want familiar equipment for free fights
//    useFamiliar($familiar`Pocket Professor`);

//    print(`Getting pizza buff trivia master`);
//    eatPizza(
//            $item`tomato juice of powerful power`,
//            $item`ravioli hat`,
//            $item`imitation whetstone`,
//            $item`volleyball`
//    );
//  } else {
//    print(`Already have effect trivia master`);
//  }
//  // should have generated pocket professor memory chip



}

function tenPercent() {
 if(have($item`a ten-percent bonus`)){
  use($item`a ten-percent bonus`);
 }
}


export function main() {
//  topupMP();
  potions();
  buffMoxie();
  statGain();
  familiarWeight();
  otherBuffs();
  md_uniform();

  pizzaStats();

  tenPercent();
}

export function buff() {
  main();
}