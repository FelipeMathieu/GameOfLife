import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

export const buildBlinker = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center},${center}`];
  const cell2 = cells[`${cell1.X + 1},${cell1.Y}`];
  const cell3 = cells[`${cell1.X - 1},${cell1.Y}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();

  updateCallback([cell1, cell2, cell3]);
};
