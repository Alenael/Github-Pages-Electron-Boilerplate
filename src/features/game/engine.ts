import { CONSTANTS } from "../../Constants";
import { load } from "./db";
import { addPlayTime, setPlayer, setTime } from "./player";
import { isDevelopment, saveGame, store } from "../../app/store";

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
  load: () => void;
  start: () => void;
  decrementAllCounters: (numCycles?: number) => void;
  checkCounters: () => void;
}

const Engine = {
  _lastUpdate: new Date().getTime(),
  updateGame(numCycles = 1) {
    const time = numCycles * CONSTANTS._idleSpeed;
    store.dispatch(setTime());
    store.dispatch(addPlayTime(time));
    Engine.decrementAllCounters(numCycles);
    Engine.checkCounters();
  },
  load() {
    load()
      .then((saveString) => {
        if (!isDevelopment) saveString = decodeURIComponent(escape(atob(saveString)));
        if (saveString != null) {
          const initalState = JSON.parse(saveString);
          store.dispatch(setPlayer(initalState.player));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        Engine._lastUpdate = new Date().getTime();
        Engine.start();
      });
  },
  start() {
    const _thisUpdate = new Date().getTime();
    let diff = _thisUpdate - Engine._lastUpdate;
    const offset = diff % CONSTANTS._idleSpeed;

    diff = Math.floor(diff / CONSTANTS._idleSpeed);

    if (diff > 0) {
      Engine._lastUpdate = _thisUpdate - offset;
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
      Engine.Counters[counterName] = counter - numCycles;
    }
  },
  checkCounters: function () {
    if (Engine.Counters.autoSaveCounter <= 0) {
      Engine.Counters.autoSaveCounter = CONSTANTS.AutosaveInterval * 5;
      saveGame();
    }
  },
} as IEngine;

export { Engine };
