import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";
import { getNeighbors } from "./get-neighbors";

/**
 * A function that verifies how the creature should behave based on the game roles
 */

export const verifyCreatureState = (cell: ICreature, cells: TCreatures) => {
  const cellNeighbors = getNeighbors(cells, cell);
  const livingNeighbors = cellNeighbors.filter((cell) => cell.Alive).length;

  console.log("** cell", cell);
  console.log("** livingNeighbors", livingNeighbors);

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
