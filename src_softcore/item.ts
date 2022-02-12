import {
    adv1,
    availableAmount,
    cliExecute,
    cliExecuteOutput,
    create,
    drink,
    equip,
    getFuel,
    getWorkshed,
    haveEffect,
    logprint,
    maximize,
    myClass,
    myInebriety,
    myMp,
    numericModifier,
    print,
    setAutoAttack,
    sweetSynthesis,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import {
    $class,
    $effect,
    $familiar,
    $item,
    $location,
    $skill,
    $slot,
    get,
    have,
    Macro,
} from "libram";
import {
    advMacroAA,
    ensureEffect,
    ensurePotionEffect,
    fuelUp,
    horse,
    md_uniform,
    synthItem,
    useDefaultFamiliar,
    pullIfPossible,
    wishEffect,
} from "./phredhccs-lib";
import { synth } from "./synth";

const predictor = () =>
    60 -
    Math.floor(numericModifier("item drop") / 30 + 0.001) -
    Math.floor(numericModifier("booze drop") / 15 + 0.001);

function castBuffs() {

    cliExecute("shrug ode");
    ensureEffect($effect`Fat Leon's Phat Loot Lyric`);
    ensureEffect($effect`The Spirit of Taking`);
    ensureEffect($effect`Singer's Faithful Ocelot`);

// save for garbo?
//    ensureEffect($effect`items.enh`);

// class dependent
//    ensureEffect($effect`El Aroma de Salsa`); 

    ensurePotionEffect($effect`Ermine Eyes`, $item`eyedrops of the ermine`);

    ensureEffect($effect`Nearly All-Natural`); 

// class dependent
    // ensure calendar buff is available
//    use(1, $item`Bird-a-Day calendar`);
//    ensureEffect($effect`Blessing of the Bird`);

}

function topupMP() {
  if (myMp() < 100) {
    print(`Topping up MP at campground`);
    visitUrl('place.php?whichplace=campaway&action=campaway_tentclick');
  }
}

function batBowl() {
    if (!haveEffect($effect`Cosmic Ball in the Air`)
        || !haveEffect($effect`Bat-Adjacent Form`) ) {

      md_uniform();
      // should still have dark horse
      // ensure no attack familiar
      useFamiliar($familiar`Hovering Sombrero`);

      // briefcase for banish
      equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
      // cloake for bat form
      equip($slot`back`, $item`vampyric cloake`);
      equip($item`familiar scrapbook`);  // ensure no kramco

      topupMP();

      // get buffs
      Macro.skill($skill`Become a Bat`)
           .skill($skill`Bowl Straight Up`)
           .skill($skill`KGB tranquilizer dart`)
           .setAutoAttack();
      adv1($location`Noob Cave`, -1, '');

      setAutoAttack(0);

    }
}

function synthBuffs(){
  synth('item');
}


function testPrep() {

    visitUrl('clan_viplounge.php?action=fwshop');
    if(!have($item`oversized sparkler`)) {
      cliExecute("acquire oversized sparkler");
    }

    equip($slot`hat`, $item`wad of used tape`);
    equip($slot`pants`, $item`cargo cultist shorts`);
    equip($slot`weapon`, $item`oversized sparkler`);
    equip($slot`off-hand`, $item`cursed magnifying glass`);
    equip($slot`back`, $item`proton accelerator pack`);

//    if (getWorkshed() === $item`Asdon Martin keyfob` && !have($effect`Driving Observantly`)) {
    if (!have($effect`Driving Observantly`)) {
        if (getFuel() < 37) fuelUp();
        cliExecute("asdonmartin drive observantly");
    }


    if (!have($effect`Infernal Thirst`)) {
        wishEffect($effect`Infernal Thirst`);
    }

    if (!get("_steelyEyedSquintUsed")) {
        ensureEffect($effect`Steely-Eyed Squint`);
    }

}

export default function itemTest(): number {
    castBuffs();
    batBowl();
    synthBuffs();
    testPrep();

    if (predictor() > 1) {
      print(`Predicted item test: ${predictor()}`);
      throw "Failed to cap item";
    }
    logprint(cliExecuteOutput("modtrace item"));
    logprint(cliExecuteOutput("modtrace booze"));

    return predictor();
}

export function main() {
    itemTest();
}
