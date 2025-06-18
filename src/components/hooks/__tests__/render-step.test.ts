import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRenderStep } from "../render-step";
import type { TCreatures } from "../../../common/types";
import { Creature } from "../../../common/models";
import { verifyCreatureState } from "../../../core/helper/creatures-control";

const mockCells: TCreatures = {
  [`${0},${0}`]: new Creature(0, 0, true),
  [`${0},${1}`]: new Creature(0, 1, true),
  [`${0},${2}`]: new Creature(0, 2, true),
};

const nextGenerationSpy = vi.fn();
const batchUpdateSpy = vi.fn();

vi.mock("../../../core/store", () => ({
  useCreaturesStore: {
    getState: () => ({
      cells: mockCells,
      batchUpdate: () => batchUpdateSpy(),
      subscribe: vi.fn(),
      destroy: vi.fn(),
    }),
  },
  useGameUIStore: {
    getState: () => ({
      nextGeneration: () => nextGenerationSpy(),
    }),
  },
}));

vi.mock("../../../core/helper/creatures-control", () => ({
  verifyCreatureState: vi.fn((cell) => {
    cell.Kill();
  }),
}));

describe("Render step hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should update modified creatures", () => {
    const animate = renderHook(() => useRenderStep()).result.current;

    animate();

    expect(batchUpdateSpy).toHaveBeenCalled();
    expect(vi.mocked(verifyCreatureState)).toHaveBeenCalledTimes(3);
    expect(nextGenerationSpy).toHaveBeenCalled();
  });
});
