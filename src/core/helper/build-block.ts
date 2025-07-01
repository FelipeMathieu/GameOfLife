import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

/**
 * Builds a "Block" shape (a 2x2 square of live cells) in the given cells grid,
 * using the provided center coordinate as the bottom-right corner of the block.
 *
 * @param cells - A map of coordinates to ICreature instances.
 * @param center - The X and Y coordinate that defines the bottom-right cell of the block.
 * @param updateCallback - A callback to notify when the block cells have been revived.
 */
export const buildBlock = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center},${center}`];
  const cell2 = cells[`${cell1.X},${cell1.Y - 1}`];
  const cell3 = cells[`${cell1.X - 1},${cell1.Y}`];
  const cell4 = cells[`${cell1.X - 1},${cell1.Y - 1}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();
  cell4.Revive();

  updateCallback([cell1, cell2, cell3, cell4]);
};
