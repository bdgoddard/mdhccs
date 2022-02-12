import {
    buy,
    cliExecute,
    create,
    eat,
    equip,
    getFuel,
    haveEffect,
    maximize,
    myHp,
    myMaxhp,
    myMp,
    numericModifier,
    print,
    runChoice,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import {
    $effect,
    $familiar,
    $item,
    $location,
    $monster,
    $skill,
    $slot,
    get,
    have,
    Macro,
} from "libram";
import { universalWeightBuffs } from "./familiarweight";
import {
    advMacroAA,
    ensureEffect,
    faxFactoryWorker,
    fuelUp,
    horse,
    mapMacro,
    setChoice,
    synthHot,
    tryHead,
    md_uniform,
    useDefaultFamiliar,
    wishEffect,
} from "./phredhccs-lib";
const predictor = () => 60 - numericModifier("hot resistance");

function faxLick() {
    if (!get("_photocopyUsed")) {
        md_uniform();
        Macro.trySkill($skill`Shocking Lick`)
            .setAutoAttack();
        faxFactoryWorker();
        use($item`photocopied monster`);
        //if (handlingChoice()) runChoice(-1);
    }
}


function getFoamy() {

    if (!have($effect`Fireproof Foam Suit`)) {
       
        setChoice(1387, 3);
        horse("dark");
        md_uniform();

        equip($slot`weapon`, $item`industrial fire extinguisher`);
        equip($slot`offhand`, $item`Fourth of May Cosplay Saber`);
        useFamiliar($familiar`none`);

        advMacroAA(
            $location`The Dire Warren`,
            Macro.skill($skill`Fire Extinguisher: Foam Yourself`).skill($skill`Use the Force`),
            1,
            () => {
                visitUrl("choice.php");
                runChoice(3);
            }
        );
    }
}


function castBuffs() {

    ensureEffect($effect`Empathy`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Blood Bond`);

    ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Do I Know You From Somewhere?`);

    ensureEffect($effect`Elemental Saucesphere`);
    ensureEffect($effect`Astral Shell`);
    ensureEffect($effect`Feeling Peaceful`);

//    ensureEffect($effect`Rainbowolin`);
//    ensureEffect($effect`Rainbow Vaccine`);
    ensureEffect($effect`Hot-Headed`);



//    if (!have($item`tenderizing hammer`)) {
//        buy(1, $item`tenderizing hammer`);
//    }
//    cliExecute("smash * ratty knitted cap");
//    cliExecute("smash * red-hot sausage fork");
//    cliExecute("smash * smoldering bagel punch");
//    if (!have($effect`Sleazy Hands`)) {
//        if (!have($item`lotion of sleaziness`)) create(1, $item`lotion of sleaziness`);
//        if (have($item`lotion of sleaziness`)) use(1, $item`lotion of sleaziness`);
//    }
//    if (!have($effect`Flame-Retardant Trousers`) && have($item`hot powder`)) {
//        use(1, $item`hot powder`);
//    }


//    if (have($item`scroll of Protection from Bad Stuff`)) {
//        ensureEffect($effect`Protection from Bad Stuff`);
//    }

}

function deepDarkVisions() {
    horse("pale");
    useFamiliar($familiar`Exotic Parrot`);
    if (!have($item`astral pet sweater`) && get("tomeSummons") < 3) {
        create(1, $item`box of Familiar Jacks`);
        use(1, $item`box of Familiar Jacks`);
    }

    maximize("spooky res", false);
    while (
        have($skill`Deep Dark Visions`) &&
        haveEffect($effect`Visions of the Deep Dark Deeps`) < 30
    ) {
        if (myMp() < 20) {
            create(1, $item`magical sausage`);
            eat(1, $item`magical sausage`);
        }
        while (myHp() < myMaxhp()) {
            useSkill(1, $skill`Cannelloni Cocoon`);
        }
        if (myMp() < 100) {
            create(1, $item`magical sausage`);
            eat(1, $item`magical sausage`);
        }
        if (Math.round(numericModifier("spooky resistance")) < 10) {
            ensureEffect($effect`Does It Have a Skull In There??`);
            if (Math.round(numericModifier("spooky resistance")) < 10) {
                throw "Not enough spooky res for Deep Dark Visions.";
            }
        }
        useSkill(1, $skill`Deep Dark Visions`);
    }
}

function testPrep() {

  //equip($slot`hat`, $item`FantasyRealm Mage's Hat`);
  equip($slot`shirt`, $item`fresh coat of paint`);
  equip($slot`pants`, $item`Cargo Cultist Shorts`);
  equip($slot`weapon`, $item`industrial fire extinguisher`);

  if (!have($item`meteorite guard`) && have($item`metal meteoroid`)) {
     create(1, $item`meteorite guard`);
  }

  equip($slot`off-hand`, $item`meteorite guard`);
  equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
  equip($slot`acc2`, $item`Hewn moon-rune spoon`);
  equip($slot`acc3`, $item`Beach Comb`); // familiar weight
  cliExecute("retrocape vampire hold");
  equip($slot`back`, $item`unwrapped knock-off retro superhero cape`);
  useFamiliar($familiar`Exotic Parrot`);
  equip($slot`familiar`,$item`cracker`);

  horse("pale");

//  if(have($item`pocket maze`)){
//    use($item`pocket maze`);
//  }

//  wishEffect($effect`Fireproof Lips`);

}

export default function hotTest(): number {
//    faxLick();  
    castBuffs();
    getFoamy();
//    deepDarkVisions();
    testPrep();
//    print(`${predictor()}`);
    if (predictor() > 1) throw "Failed to cap hot resistance";
    //cliExecute("modtrace hot res");

    return predictor();
}
