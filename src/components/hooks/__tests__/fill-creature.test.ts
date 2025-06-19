import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { useFillCreature } from "../fill-creature";
import { Creature } from "../../../common/models";
import type { TCreatures } from "../../../common/types";
import { values } from "lodash";

const mockCells: TCreatures = {
  "0,0": new Creature(0, 0, true),
  "0,1": new Creature(0, 1, true),
  "1,0": new Creature(1, 0, true),
  "1,1": new Creature(1, 1, true),
};

vi.mock("../../../core/store", () => ({
  useCreaturesStore: {
    getState: () => ({
      cells: mockCells,
      subscribe: vi.fn(),
      destroy: vi.fn(),
    }),
  },
}));

describe("useFillCreature", () => {
  it("should call fillRect for each creature", () => {
    const fillRect = vi.fn();
    const strokeRect = vi.fn();
    const creaturesLength = values(mockCells).length;

    const canvasMock = document.createElement("canvas");

    vi.spyOn(canvasMock, "getContext").mockReturnValue({
      fillRect,
      strokeRect,
      fillStyle: "",
      strokeStyle: "",
    } as unknown as CanvasRenderingContext2D);

    const { result: refResult } = renderHook(() => {
      return {
        canvasRef: useRef<HTMLCanvasElement>(canvasMock),
        drawnStatesRef: useRef<Map<string, boolean>>(new Map()),
      };
    });

    const { canvasRef, drawnStatesRef } = refResult.current;

    renderHook(() => useFillCreature(canvasRef, drawnStatesRef));

    expect(fillRect).toHaveBeenCalledTimes(creaturesLength);
    expect(strokeRect).toHaveBeenCalledTimes(creaturesLength);
  });
});
