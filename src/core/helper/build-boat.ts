import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

/**
 * Builds a "Boat" shape (a still life of five cells forming an asymmetric 2x3 pattern),
 * centered around the provided coordinate.
 *
 * @param cells - A map of coordinates to ICreature instances.
 * @param center - The X and Y coordinate used as the reference point for the boat structure.
 * @param updateCallback - A callback invoked after reviving the involved cells.
 */
export const buildBoat = (
  cells: TCreatures,
  center: number,
  updateCallback: (creatures: ICreature[]) => void
) => {
  const cell1 = cells[`${center - 1},${center}`];
  const cell2 = cells[`${cell1.X},${cell1.Y - 1}`];
  const cell3 = cells[`${cell2.X + 1},${cell2.Y}`];
  const cell4 = cells[`${center},${center + 1}`];
  const cell5 = cells[`${center + 1},${center}`];

  cell1.Revive();
  cell2.Revive();
  cell3.Revive();
  cell4.Revive();
  cell5.Revive();

  updateCallback([cell1, cell2, cell3, cell4, cell5]);
};
