import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useWatchMaxPopulation } from "../watch-max-population";

const mockUsePopulation = vi.fn();

vi.mock("../../../core/store", () => ({
  usePopulation: () => mockUsePopulation(),
}));

describe("useWatchMaxPopulation", () => {
  const mockUpdateMaxPopulation = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when there is no action", () => {
    beforeEach(() => {
      mockUsePopulation.mockReturnValue({
        population: 10,
        maxPopulation: 25,
        updateMaxPopulation: mockUpdateMaxPopulation,
      });
    });

    it("should not call updateMaxPopulation", () => {
      renderHook(() => useWatchMaxPopulation());

      expect(mockUpdateMaxPopulation).not.toHaveBeenCalled();
    });
  });

  describe("when updating max population", () => {
    const population = 55;

    beforeEach(() => {
      mockUsePopulation.mockReturnValue({
        population,
        maxPopulation: 25,
        updateMaxPopulation: mockUpdateMaxPopulation,
      });
    });

    it("should not call updateMaxPopulation", () => {
      renderHook(() => useWatchMaxPopulation());

      expect(mockUpdateMaxPopulation).toHaveBeenCalledOnce();
      expect(mockUpdateMaxPopulation).toHaveBeenCalledWith(population);
    });
  });
});
