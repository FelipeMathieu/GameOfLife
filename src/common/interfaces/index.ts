export interface ICreature {
  X: number;
  Y: number;
  Alive: boolean;
  Kill: (modified?: boolean) => void;
  Revive: (modified?: boolean) => void;
}
