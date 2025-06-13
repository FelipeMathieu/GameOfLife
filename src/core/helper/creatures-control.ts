import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";
import { getNeighbors } from "./get-neighbors";

interface IVerifyCreatureState {
  cell: ICreature;
  cells: TCreatures;
  fieldSize: number;
  updateCreatureCallback: (cell: ICreature) => void;
}

export const verifyCreatureState = ({
  cell,
  cells,
  fieldSize,
  updateCreatureCallback,
}: IVerifyCreatureState) => {
  const cellNeighbors = getNeighbors(cells, cell, fieldSize);
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

  updateCreatureCallback(cell);

  if (!cell.Alive && cellNeighbors.filter((item) => item.Alive).length === 3) {
    cell.Revive();

    return;
  }

  if (
    cell.Alive &&
    (cellNeighbors.filter((item) => item.Alive).length === 2 ||
      cellNeighbors.filter((item) => item.Alive).length === 3)
  ) {
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
