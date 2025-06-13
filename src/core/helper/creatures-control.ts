import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";
import { getNeighbors } from "./get-neighbors";

interface IVerifyCreatureState {
  cell: ICreature;
  cells: TCreatures;
  fieldSize: number;
  updateCreatureCallback: (cell: ICreature) => void;
  handleNeighborsCallback: (cells: ICreature[]) => void;
}

export const verifyCreatureState = ({
  cell,
  cells,
  fieldSize,
  updateCreatureCallback,
}: IVerifyCreatureState) => {
  const cellNeighbors = getNeighbors(cells, cell, fieldSize);

  cellNeighbors.forEach((item) => updateCreatureCallback(item));

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
