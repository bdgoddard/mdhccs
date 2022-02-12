import {
    availableAmount,
    cliExecute,
    create,
    drink,
    equip,
    getFuel,
    getWorkshed,
    maximize,
    myClass,
    myInebriety,
    numericModifier,
    print,
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
    eatPizza,
    ensureEffect,
    ensurePotionEffect,
    fuelUp,
    horse,
    synthItem,
    useDefaultFamiliar,
    wishEffect,
} from "./phredhccs-lib";

const predictor = () =>
    60 -
    Math.floor(numericModifier("item drop") / 30 + 0.001) -
    Math.floor(numericModifier("booze drop") / 15 + 0.001);

function castBuffs() {

    cliExecute("shrug ode");
    ensureEffect($effect`Fat Leon's Phat Loot Lyric`);
    ensureEffect($effect`The Spirit of Taking`);
    ensureEffect($effect`Singer's Faithful Ocelot`);

    ensureEffect($effect`items.enh`);

    ensureEffect($effect`El Aroma de Salsa`); 

    ensurePotionEffect($effect`Ermine Eyes`, $item`eyedrops of the ermine`);

    ensureEffect($effect`Nearly All-Natural`); 

}

function pizzaItem() {

  if(!have($effect`Certainty`)){

    // get pocket professor memory chip to use in pizza
    useFamiliar($familiar`Pocket Professor`);
    equip($slot`familiar`,$item`miniature crystal ball`);

    // familiar equipment is an I
    useFamiliar($familiar`Imitation Crab`);

    print(`Getting pizza buff certainty`);

    if(!have($item`ravioli hat`)){
      cliExecute("acquire ravioli hat");
    }
    if(!have($item`catsup`)){
      cliExecute("acquire catsup"); 
    }
    if(!have($item`eyedrops of the ermine`)){
      cliExecute("acquire eyedrops of the ermine"); 
    }

    cliExecute('refresh inventory');

    eatPizza(
            $item`catsup`,
            $item`eyedrops of the ermine`,
            $item`ravioli hat`,
            $item`pocket professor memory chip`
    );
  } else {
    print(`Already have effect certainty`);
  }
  // should have generated imitation whetstone for INFE


  if(!have($effect`Infernal Thirst`)){

    // familiar equipment for resistance test 
    useFamiliar($familiar`Exotic Parrot`);

    print(`Getting pizza buff infernal thirst`);

    if(!have($item`full meat tank`)){
      cliExecute("acquire full meat tank"); 
    }

    cliExecute('refresh inventory');

    eatPizza(
            $item`imitation whetstone`,
            $item`Newbiesport™ tent `,
            $item`full meat tank`,
            $item`eyedrops of the ermine`
    );
  } else {
    print(`Already have effect infernal thirst`);
  }



}

function testPrep() {

    visitUrl('clan_viplounge.php?action=fwshop');
    if(!have($item`oversized sparkler`)) {
      cliExecute("acquire oversized sparkler");
    }

    equip($slot`hat`, $item`wad of used tape`);
    equip($slot`pants`, $item`cargo cultist shorts`);
    equip($slot`weapon`, $item`oversized sparkler`);
    equip($slot`off-hand`, $item`extra-large utility candle`);
    equip($slot`back`, $item`proton accelerator pack`);


    if (!get("_steelyEyedSquintUsed")) {
        ensureEffect($effect`Steely-Eyed Squint`);
    }

}

export default function itemTest(): number {
    castBuffs();
    pizzaItem();
    testPrep();
    if (predictor() > 1) throw "Failed to cap item";
    return predictor();
}
