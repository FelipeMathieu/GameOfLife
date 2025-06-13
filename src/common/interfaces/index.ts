export interface ICreature {
  X: number;
  Y: number;
  Alive: boolean;
  Kill: () => void;
  Revive: () => void;
}
