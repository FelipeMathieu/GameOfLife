import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

export const buildLightweightSpaceship = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center},${center + 2}`];
  const cell2 = cells[`${cell1.X - 1},${cell1.Y}`];
  const cell3 = cells[`${cell1.X + 1},${cell2.Y}`];
  const cell4 = cells[`${cell2.X - 1},${cell2.Y}`];
  const cell5 = cells[`${cell4.X},${cell4.Y - 1}`];
  const cell6 = cells[`${cell5.X},${cell5.Y - 1}`];
  const cell7 = cells[`${cell6.X + 1},${cell6.Y - 1}`];
  const cell8 = cells[`${cell7.X + 3},${cell7.Y}`];
  const cell9 = cells[`${cell8.X},${cell8.Y + 2}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();
  cell4.Revive();
  cell5.Revive();
  cell6.Revive();
  cell7.Revive();
  cell8.Revive();
  cell9.Revive();

  updateCallback([
    cell1,
    cell2,
    cell3,
    cell4,
    cell5,
    cell6,
    cell7,
    cell8,
    cell9,
  ]);
};
