import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

/**
 * Builds a "Blinker" shape (three vertically-aligned live cells) in the given cells grid,
 * centered around the provided coordinate.
 *
 * @param cells - A map of cell coordinates to ICreature instances.
 * @param center - The X and Y coordinate to center the Blinker on (e.g., 5 means (5,5)).
 * @param updateCallback - A function to notify after the creatures have been updated.
 */
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
