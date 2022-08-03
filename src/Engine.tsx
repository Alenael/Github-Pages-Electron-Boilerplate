import { loadGame } from "./SaveObject";
import { CONSTANTS } from "./Constants";

interface IEngine {
  _lastUpdate: number;
  updateGame: (numCycles?: number) => void;
  load: (saveString: string) => void;
  start: () => void;
}

const Engine = {
  _lastUpdate: new Date().getTime(),
  updateGame(numCycles = 1) {
    const __time = numCycles * CONSTANTS._idleSpeed;
  },
  load(saveString: string) {
    if (loadGame(saveString)) {
      this._lastUpdate = new Date().getTime();
    } else {
      this.start();
    }
  },
  start() {
    const _thisUpdate = new Date().getTime();
    let diff = _thisUpdate - this._lastUpdate;
    const offset = diff % CONSTANTS._idleSpeed;

    diff = Math.floor(diff / CONSTANTS._idleSpeed);

    if (diff > 0) {
      this._lastUpdate = _thisUpdate - offset;
      this.updateGame(diff);
    }
  },
} as IEngine;

export { Engine, IEngine };
