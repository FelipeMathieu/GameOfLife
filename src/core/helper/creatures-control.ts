import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";
import { getNeighbors } from "./get-neighbors";

export const verifyCreatureState = (
  cell: ICreature,
  cells: TCreatures,
  fieldSize: number,
  updateCreatureCallback: (cell: ICreature) => void
) => {
  const cellNeighbors = getNeighbors(cells, cell, fieldSize);

  console.log("** neighbors of", cell, cellNeighbors);

  if (
    cell.Alive &&
    (cellNeighbors.filter((item) => item.Alive).length === 2 ||
      cellNeighbors.filter((item) => item.Alive).length === 3)
  ) {
    return;
  }

  if (!cell.Alive && cellNeighbors.filter((item) => item.Alive).length === 3) {
    cell.Revive();

    updateCreatureCallback(cell);
    return;
  }

  if (
    cell.Alive &&
    (cellNeighbors.filter((item) => item.Alive).length < 2 ||
      cellNeighbors.filter((item) => item.Alive).length > 3)
  ) {
    cell.Kill();

    updateCreatureCallback(cell);
    return;
  }
};
