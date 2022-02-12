import {
    autosell,
    availableAmount,
    buy,
    cliExecute,
    create,
    equip,
    eudoraItem,
    myLevel,
    myPrimestat,
    mySpleenUse,
    print,
    runChoice,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, $skill, $slot, $stat, get, have, SourceTerminal } from "libram";
import { setClan, tryUse, md_uniform } from "./phredhccs-lib";


function setSettings() {
    // Set terminal
    print(`Setting terminal extract and portscan`);
    //SourceTerminal.educate([$skill`Extract`, $skill`Portscan`]);
    SourceTerminal.educate([$skill`Extract`, $skill`Duplicate`]);
   
    // Set clan
    print(`Going to Old Old CW's Germ Free Clan`);
    setClan("Old CW's Germ Free Clan");
}

function setEquipment() {

    // mumming trunk
    useFamiliar($familiar`Hovering Sombrero`);

    print(`Dressing with mumming trunk for mys`);
    if (myPrimestat() === $stat`Mysticality`){
        cliExecute("mummery myst"); 
    }
    else if (myPrimestat() === $stat`Muscle`){
        cliExecute("mummery muscle"); 
    }
    else if (myPrimestat() === $stat`Moxie`){
        cliExecute("mummery moxie");       
    }
    else{
        throw('Unknown mainstat');
    }

    // saber
    if (have($item`Fourth of May Cosplay Saber`) && !get("_saberMod")) {
        print(`Upgrading saber for familiar weight`);
        visitUrl('main.php?action=may4');
        runChoice(4);
    }

    // floundry
    if (!get("_floundryItemCreated")) {

        if (myPrimestat() === $stat`Mysticality`){
            print(`Getting codpiece`);
            cliExecute("acquire codpiece");   
        }
        else if (myPrimestat() === $stat`Muscle`){
            print(`Getting fish hatchet`);
            cliExecute("acquire fish hatchet");   
        }
        else if (myPrimestat() === $stat`Moxie`){
            print(`Getting bass clarinet`);
            cliExecute("acquire bass clarinet");      
        }
        else{
            throw('Unknown mainstat');
        }

    }

    // pantogram -- save for garbo (not needed for hot or item)
    /*
    if (!have($item`pantogram pants`)) {
        if (myPrimestat() === $stat`Mysticality`){
            print(`Making pantogram pants: mys, hot, nc`);
            cliExecute("pantogram mysticality|hot|drops of blood|some self-respect|your hopes|silent");
        }
        else if (myPrimestat() === $stat`Muscle`){
            print(`Making pantogram pants: mus, hot, nc`);
            cliExecute("pantogram muscle|hot|drops of blood|some self-respect|your hopes|silent");        
        }
        else if (myPrimestat() === $stat`Moxie`){
            print(`Making pantogram pants: mox, hot, nc`);
            cliExecute("pantogram moxie|hot|drops of blood|some self-respect|your hopes|silent");      
        }
        else{
            throw('Unknown mainstat');
        }
    }
    */

    // songboom
    if (get("boomBoxSong") !== "Total Eclipse of Your Meat") {
        print(`Setting song boom meat`);
        cliExecute("boombox meat");
    }
   
    // retrocape
    //print(`Setting retrocape heck clown`);
    //cliExecute("retrocape heck kill");

    // camera
    print(`Setting backup camera reverser, ml`);
    cliExecute("backupcamera reverser");
    cliExecute("backupcamera ml");

    // lathe 
    visitUrl("shop.php?whichshop=lathe");
    if (availableAmount($item`flimsy hardwood scraps`) > 0) {
        if(availableAmount($item`ebony epee`) < 1){
          print(`Lathing epee`);
          create(1, $item`ebony epee`);
        }
    }

    // power plant
    print(`Harvesting batteries`);
    cliExecute("inv_use.php?pwd&whichitem=10738");
    for (let i = 1; i < 8; i++) {
        cliExecute(`choice.php?pwd&whichchoice=1448&option=1&pp=${i}`);
    }

    // fantasy realm
    print(`Getting fantasy realm hat`);
    visitUrl("place.php?whichplace=realm_fantasy&action=fr_initcenter");
    if (myPrimestat() === $stat`Mysticality`){
        visitUrl("choice.php?pwd&whichchoice=1280&option=2");
    }
    else if (myPrimestat() === $stat`Muscle`){
        visitUrl("choice.php?pwd&whichchoice=1280&option=1");
    }
    else if (myPrimestat() === $stat`Moxie`){
        visitUrl("choice.php?pwd&whichchoice=1280&option=3");
    }
    else{
        throw('Unknown mainstat');
    }
    

    // looking glass
    visitUrl('clan_viplounge.php?action=lookingglass&whichfloor=2');

    // briefcase
    print(`Setting briefcase weapon, hot, -combat`);
    cliExecute("briefcase enchantment weapon hot -combat");

    // tote
    cliExecute('fold makeshift garbage shirt');

    // cracker
    if (!have($item`cracker`)) {
      print(`Getting cracker`)

      if (!have($item`box of Familiar Jacks`)) {
         print(`Getting and using familiar jacks`);
         create(1, $item`box of Familiar Jacks`);
      }
    
      useFamiliar($familiar`Exotic Parrot`);
      use(1, $item`box of Familiar Jacks`);
    
    } else {
      print(`Already have cracker`);
    }

    // enable calendar skills
    use(1, $item`Bird-a-Day calendar`);

}

export function main(): void {
    setSettings();
    setEquipment();
    md_uniform();
}


export function prepGear() {
  main();
}