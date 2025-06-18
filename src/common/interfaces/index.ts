export interface ICreature {
  Id: string;
  X: number;
  Y: number;
  Alive: boolean;
  Kill: () => void;
  Revive: () => void;
}
