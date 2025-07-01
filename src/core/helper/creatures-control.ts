import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";
import { getNeighbors } from "./get-neighbors";

/**
 * Determines and updates the state of a creature (cell) based on
 * the number of living neighbors, following Conway's Game of Life rules.
 *
 * @param cell - The creature to verify and potentially update.
 * @param cells - A map of all creatures on the board for neighbor lookup.
 */
export const verifyCreatureState = (cell: ICreature, cells: TCreatures) => {
  const cellNeighbors = getNeighbors(cells, cell);
  const livingNeighbors = cellNeighbors.filter((cell) => cell.Alive).length;

  switch (cell.Alive) {
    case true: {
      if (livingNeighbors < 2 || livingNeighbors > 3) {
        cell.Kill();

        break;
      }

      cell.Revive();
      break;
    }
    default: {
      if (livingNeighbors === 3) {
        cell.Revive();
      }

      break;
    }
  }
};
