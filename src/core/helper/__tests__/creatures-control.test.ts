import { afterEach, describe, expect, it, vi } from "vitest";
import { killAllMockedCells, MOCKED_CELLS } from "./cells.mock";
import { verifyCreatureState } from "../creatures-control";
import type { ICreature } from "../../../common/interfaces";
import type { TCreatures } from "../../../common/types";

const getNeighborsMock = (cells: TCreatures, cell: ICreature) => {
  const x = cell.X;
  const y = cell.Y;

  return [
    cells[`${x - 1},${y}`],
    cells[`${x + 1},${y}`],
    cells[`${x},${y - 1}`],
    cells[`${x},${y + 1}`],
    cells[`${x + 1},${y - 1}`],
    cells[`${x - 1},${y - 1}`],
    cells[`${x + 1},${y + 1}`],
    cells[`${x - 1},${y + 1}`],
  ];
};

const getNeighborsSpy = vi.fn().mockImplementation(getNeighborsMock);

vi.mock("../get-neighbors", () => ({
  getNeighbors: (cells: TCreatures, cell: ICreature) =>
    getNeighborsSpy(cells, cell),
}));

describe("Creatures control", () => {
  const X = 2;
  const Y = 2;

  afterEach(() => {
    vi.clearAllMocks();
    killAllMockedCells();
  });

  it("should kill a cell when there are less then 2 living neighbors", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];
    cell0.Revive();

    const cell1 = MOCKED_CELLS[`${X + 1},${Y}`];
    cell1.Revive();

    verifyCreatureState(cell0, MOCKED_CELLS);

    expect(getNeighborsSpy).toHaveBeenCalledTimes(1);
    expect(cell0.Alive).toBe(false);
  });

  it("should kill a cell when there are more then 3 living neighbors", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];
    cell0.Revive();

    const cell1 = MOCKED_CELLS[`${X + 1},${Y}`];
    cell1.Revive();

    const cell2 = MOCKED_CELLS[`${X - 1},${Y}`];
    cell2.Revive();

    const cell3 = MOCKED_CELLS[`${X},${Y + 1}`];
    cell3.Revive();

    const cell4 = MOCKED_CELLS[`${X},${Y - 1}`];
    cell4.Revive();

    verifyCreatureState(cell0, MOCKED_CELLS);

    expect(getNeighborsSpy).toHaveBeenCalledTimes(1);
    expect(cell0.Alive).toBe(false);
  });

  it("should revive a cell if it has 3 living neighbors", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];

    const cell1 = MOCKED_CELLS[`${X + 1},${Y}`];
    cell1.Revive();

    const cell2 = MOCKED_CELLS[`${X - 1},${Y}`];
    cell2.Revive();

    const cell3 = MOCKED_CELLS[`${X},${Y + 1}`];
    cell3.Revive();

    verifyCreatureState(cell0, MOCKED_CELLS);

    expect(getNeighborsSpy).toHaveBeenCalledTimes(1);
    expect(cell0.Alive).toBe(true);
  });

  it("should keep cell alive", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];
    cell0.Revive();

    const cell1 = MOCKED_CELLS[`${X + 1},${Y}`];
    cell1.Revive();

    const cell2 = MOCKED_CELLS[`${X - 1},${Y}`];
    cell2.Revive();

    const cell3 = MOCKED_CELLS[`${X},${Y + 1}`];
    cell3.Revive();

    verifyCreatureState(cell0, MOCKED_CELLS);

    expect(getNeighborsSpy).toHaveBeenCalledTimes(1);
    expect(cell0.Alive).toBe(true);
  });

  it("should keep cell dead", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];

    const cell1 = MOCKED_CELLS[`${X + 1},${Y}`];
    cell1.Revive();

    const cell2 = MOCKED_CELLS[`${X - 1},${Y}`];
    cell2.Revive();

    verifyCreatureState(cell0, MOCKED_CELLS);

    expect(getNeighborsSpy).toHaveBeenCalledTimes(1);
    expect(cell0.Alive).toBe(false);
  });
});
