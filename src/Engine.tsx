import { loadGame } from "./SaveObject";
import { Player } from "./Player";
import { CONSTANTS } from "./Constants";

export interface IEngine {
  _lastUpdate: number;
  updateGame: (numCycles?: number) => void;
  load: (saveString: string) => void;
  start: () => void;
}

const Engine = {
  _lastUpdate: new Date().getTime(),
  updateGame(numCycles = 1) {
    const time = numCycles * CONSTANTS._idleSpeed;

    Player.totalPlaytime += time;
  },
  load(saveString: string) {
    if (loadGame(saveString)) {
      Engine._lastUpdate = new Date().getTime();
      Player.lastUpdate = Engine._lastUpdate;
      Engine.start();
    } else {
      Engine.start();
    }
  },
  start() {
    const _thisUpdate = new Date().getTime();
    let diff = _thisUpdate - Engine._lastUpdate;
    const offset = diff % CONSTANTS._idleSpeed;

    diff = Math.floor(diff / CONSTANTS._idleSpeed);

    if (diff > 0) {
      Engine._lastUpdate = _thisUpdate - offset;
      Player.lastUpdate = _thisUpdate - offset;
      Engine.updateGame(diff);
    }
    window.requestAnimationFrame(Engine.start);
  },
} as IEngine;

export { Engine };
