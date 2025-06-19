export interface ICreature {
  Id: `${number},${number}`;
  X: number;
  Y: number;
  Alive: boolean;
  Kill: () => void;
  Revive: () => void;
}
