import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

export const buildToad = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center},${center}`];
  const cell2 = cells[`${cell1.X + 1},${cell1.Y}`];
  const cell3 = cells[`${cell1.X - 1},${cell1.Y}`];
  const cell4 = cells[`${cell1.X},${cell1.Y - 1}`];
  const cell5 = cells[`${cell4.X + 1},${cell4.Y}`];
  const cell6 = cells[`${cell5.X + 1},${cell5.Y}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();
  cell4.Revive();
  cell5.Revive();
  cell6.Revive();

  updateCallback([cell1, cell2, cell3, cell4, cell5, cell6]);
};
