import { PlayerObject } from "./PlayerObject";

import { Reviver } from "./utils/JSONReviver";

export let Player = new PlayerObject();

export function loadPlayer(saveString: string): void {
  Player = JSON.parse(saveString, Reviver);
}
