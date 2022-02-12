import {
    autosell,
    availableAmount,
    buy,
    cliExecute,
    create,
    equip,
    eudoraItem,
    myLevel,
    mySpleenUse,
    print,
    runChoice,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $coinmaster, $familiar, $item, $items, $skill, $slot, get, have, SourceTerminal } from "libram";
import { setClan, tryUse, md_uniform } from "./phredhccs-lib";


function setSettings() {
    // Set terminal
    print(`Setting terminal extract and portscan`);
    SourceTerminal.educate([$skill`Extract`, $skill`Portscan`]);
   
    // Set clan
    print(`Going to Old Old CW's Germ Free Clan`);
    setClan("Old CW's Germ Free Clan");
}

function setEquipment() {

    // mumming trunk
    useFamiliar($familiar`Hovering Sombrero`);
    print(`Dressing with mumming trunk for mys`);
    cliExecute("mummery myst");

    // saber
    if (have($item`Fourth of May Cosplay Saber`) && !get("_saberMod")) {
        print(`Upgrading saber for familiar weight`);
        visitUrl('main.php?action=may4');
        runChoice(4);
    }

    // floundry
    if (!get("_floundryItemCreated")) {
        print(`Getting codpiece`);
        cliExecute("acquire codpiece");
    }

    // pantogram
    if (!have($item`pantogram pants`)) {
        print(`Making pantogram pants: mys, hot, nc`);
        cliExecute("pantogram mysticality|hot|drops of blood|some self-respect|your hopes|silent");
    }

    // songboom
    if (get("boomBoxSong") !== "Total Eclipse of Your Meat") {
        print(`Setting song boom meat`);
        cliExecute("boombox meat");
    }
   
    // retrocape
    print(`Setting retrocape heck clown`);
    cliExecute("retrocape heck kill");

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
    visitUrl("choice.php?pwd&whichchoice=1280&option=2");

    // looking glass
    visitUrl('clan_viplounge.php?action=lookingglass&whichfloor=2');

    // briefcase
    print(`Setting briefcase weapon, hot, -combat`);
    cliExecute("briefcase enchantment weapon hot -combat");

    // tote
    cliExecute('fold makeshift garbage shirt');

}



export function main(): void {
    setSettings();
    setEquipment();
    md_uniform();
}


export function prepGear() {
  main();
}