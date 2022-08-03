import { Generic_fromJSON, Generic_toJSON, IReviverValue, Reviver } from "./utils/JSONReviver";

export interface IPlayer {
  totalPlaytime: number;
}

export class PlayerObject implements IPlayer {
  totalPlaytime: number;
  lastUpdate: number;
  lastSave: number;

  constructor() {
    this.lastUpdate = 0;
    this.lastSave = 0;
    this.totalPlaytime = 0;
  }

  toJSON(): IReviverValue {
    return Generic_toJSON("PlayerObject", this);
  }

  static fromJSON(value: IReviverValue): PlayerObject {
    return Generic_fromJSON(PlayerObject, value.data);
  }
}

Reviver.constructors.PlayerObject = PlayerObject;
