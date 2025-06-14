import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

export const buildGlider = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center},${center + 1}`];
  const cell2 = cells[`${center - 1},${center}`];
  const cell3 = cells[`${cell2.X},${cell2.Y - 1}`];
  const cell4 = cells[`${center},${center - 1}`];
  const cell5 = cells[`${cell4.X + 1},${cell4.Y}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();
  cell4.Revive();
  cell5.Revive();

  updateCallback([cell1, cell2, cell3, cell4, cell5]);
};
