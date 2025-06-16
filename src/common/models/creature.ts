import type { ICreature } from "../interfaces";

export class Creature implements ICreature {
  private _x: number;
  private _y: number;
  private _alive = false;
  private _modified = false;

  constructor(x: number, y: number, alive = false) {
    this._x = x;
    this._y = y;
    this._alive = alive;
  }

  public Kill(modified = false) {
    this._alive = false;

    this._modified = modified;
  }

  public Revive(modified = false) {
    this._alive = true;

    this._modified = modified;
  }

  public get Modified() {
    return this._modified;
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

  public ResetModify() {
    this._modified = false;
  }

  public Modify() {
    this._modified = true;
  }
}
