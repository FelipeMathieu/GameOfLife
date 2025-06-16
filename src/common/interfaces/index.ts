export interface ICreature {
  X: number;
  Y: number;
  Alive: boolean;
  Modified: boolean;
  Kill: (modified?: boolean) => void;
  Revive: (modified?: boolean) => void;
  ResetModify: () => void;
  Modify: () => void;
}
