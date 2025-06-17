import type { ICreature } from "../interfaces";

export class Creature implements ICreature {
  private _x: number;
  private _y: number;
  private _alive = false;

  constructor(x: number, y: number, alive = false) {
    this._x = x;
    this._y = y;
    this._alive = alive;
  }

  public Kill() {
    this._alive = false;
  }

  public Revive() {
    this._alive = true;
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
