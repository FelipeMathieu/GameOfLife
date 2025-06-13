import type { ICreature } from "../../common/interfaces";
import { Creature } from "../../common/models";
import { updateCreature } from "../store";

//fazer recursivo

export const useCreaturesControl = (
  running: boolean,
  grid: null[][],
  cells: Record<`${number},${number}`, ICreature>
) => {
  const upstairsNeighbor = (cell: ICreature) =>
    cells[`${cell.X},${cell.Y - 1}`] || new Creature(cell.X, cell.Y - 1);
  const downstairsNeighbor = (cell: ICreature) =>
    cells[`${cell.X},${cell.Y + 1}`] || new Creature(cell.X, cell.Y + 1);
  const upstairsNeighbor = (cell: ICreature) =>
    cells[`${cell.X},${cell.Y - 1}`] || new Creature(cell.X, cell.Y - 1);
  const upstairsNeighbor = (cell: ICreature) =>
    cells[`${cell.X},${cell.Y - 1}`] || new Creature(cell.X, cell.Y - 1);
  const neighborOnTheLeft = (cell: ICreature) =>
    cells[`${cell.X - 1},${cell.Y}`] || new Creature(cell.X - 1, cell.Y);

  const getCellNeighbors = (cell: ICreature) => {
    const neighbors = Array<ICreature>();

    if (cell.Y > 0) {
      neighbors.push(upstairsNeighbor(cell));
      if (cell.X > 0) {
        neighbors.push(neighborOnTheLeft(cell));
      }
    }

    return neighbors;
  };

  const checkCellConditions = (cell: ICreature) => {
    const cellNeighbors = getCellNeighbors(cell);
    if (
      cell.Alive &&
      (cellNeighbors.filter((item) => item.Alive).length === 2 ||
        cellNeighbors.filter((item) => item.Alive).length === 3)
    ) {
      return;
    }

    if (
      !cell.Alive &&
      cellNeighbors.filter((item) => item.Alive).length === 3
    ) {
      cell.Revive();

      updateCreature(cell);
      return;
    }

    if (
      cell.Alive &&
      (cellNeighbors.filter((item) => item.Alive).length < 2 ||
        cellNeighbors.filter((item) => item.Alive).length > 3)
    ) {
      cell.Kill();

      updateCreature(cell);
      return;
    }
  };

  while (running) {
    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const cell = cells[`${rowIndex},${colIndex}`];
        checkCellConditions(cell || new Creature(rowIndex, colIndex));
      });
    });
  }
};
