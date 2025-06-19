import type { ICreature } from "../interfaces";

export class Creature implements ICreature {
  private readonly _id: string;
  private _x: number;
  private _y: number;
  private _alive = false;

  constructor(x: number, y: number, alive = false) {
    this._x = x;
    this._y = y;
    this._alive = alive;
    this._id = `${this._x},${this._y}`;
  }

  public Kill() {
    this._alive = false;
  }

  public Revive() {
    this._alive = true;
  }

  public get Id() {
    return this._id;
  }

  public get X() {
    return this._x;
  }

  public get Y() {
    return this._y;
  }

  public get Alive() {
    return this._alive;
  }
}
