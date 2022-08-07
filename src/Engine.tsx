//import { saveObject, loadGame } from "./SaveObject";
import { CONSTANTS } from "./Constants";
import { saveObject } from "./SaveObject";
import { addPlayTime, setLastUpdate } from "./slices/player";
import { store } from "./store";

export interface IEngine {
  _lastUpdate: number;
  updateGame: (numCycles?: number) => void;
  Counters: {
    [key: string]: number | undefined;
    autoSaveCounter: number;
    updateSkillLevelsCounter: number;
    updateDisplays: number;
    updateDisplaysLong: number;
    updateActiveScriptsDisplay: number;
    createProgramNotifications: number;
    augmentationsNotifications: number;
    checkFactionInvitations: number;
    passiveFactionGrowth: number;
    messages: number;
    mechanicProcess: number;
    contractGeneration: number;
    achievementsCounter: number;
  };
  load: (saveString: string) => void;
  start: () => void;
  decrementAllCounters: (numCycles?: number) => void;
  checkCounters: () => void;
}

const dispatch = store.dispatch;

const Engine = {
  _lastUpdate: new Date().getTime(),
  updateGame(numCycles = 1) {
    const time = numCycles * CONSTANTS._idleSpeed;
    dispatch(addPlayTime(time));
    Engine.decrementAllCounters(numCycles);
    Engine.checkCounters();
  },
  load(saveString: string) {
    if (saveObject.loadGame(saveString)) {
      Engine._lastUpdate = new Date().getTime();
      dispatch(setLastUpdate(Engine._lastUpdate));
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
      dispatch(setLastUpdate(_thisUpdate - offset));
      Engine.updateGame(diff);
    }
    window.requestAnimationFrame(Engine.start);
  },
  Counters: {
    autoSaveCounter: 300,
  },
  decrementAllCounters: function (numCycles = 1) {
    for (const counterName of Object.keys(Engine.Counters)) {
      const counter = Engine.Counters[counterName];
      if (counter === undefined) throw new Error("counter should not be undefined");
      Engine.Counters[counterName] = counter - numCycles;
    }
  },
  checkCounters: function () {
    if (Engine.Counters.autoSaveCounter <= 0) {
      Engine.Counters.autoSaveCounter = CONSTANTS.AutosaveInterval * 5;
      saveObject.saveGame();
    }
  },
} as IEngine;

export { Engine };
