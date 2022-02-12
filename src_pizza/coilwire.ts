import { cliExecute, create, eat, equip } from "kolmafia";
import { $item, $location, $skill, $slot, get, have, Macro } from "libram";
import { delevel, easyFight } from "./phccs-macros";
import { advMacro, fightSausageIfAble, uniform, useDefaultFamiliar } from "./phredhccs-lib";
import { runStart } from "./runstart";


export default function coilWire(): number {
    return 60;
}
