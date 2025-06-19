import { afterEach, describe, expect, it, vi } from "vitest";
import { killAllMockedCells, MOCKED_CELLS } from "./cells.mock";
import { getNeighbors } from "../get-neighbors";

describe("Get neighbors helper", () => {
  const X = 2;
  const Y = 2;

  afterEach(() => {
    vi.clearAllMocks();
    killAllMockedCells();
  });

  it("should return a cell neighbors", () => {
    const cell0 = MOCKED_CELLS[`${X},${Y}`];

    const neighbors = getNeighbors(MOCKED_CELLS, cell0);

    expect(neighbors.length).toBe(8);
    neighbors.forEach((cell) => {
      expect(cell.X === X || cell.X === X - 1 || cell.X === X + 1).toBeTruthy();
      expect(cell.Y === Y || cell.Y === Y - 1 || cell.Y === Y + 1).toBeTruthy();
    });
  });
});
