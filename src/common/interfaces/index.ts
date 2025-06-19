import type { TId } from "../types";

export interface ICreature {
  Id: TId;
  X: number;
  Y: number;
  Alive: boolean;
  Kill: () => void;
  Revive: () => void;
}
