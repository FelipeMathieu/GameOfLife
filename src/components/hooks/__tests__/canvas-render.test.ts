import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
} from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGameLoop } from "../canvas-render";

const mockRenderStep = vi.fn();
const updateRunningMock = vi.fn();
const updateFpsMock = vi.fn();
const nextGenerationMock = vi.fn();

vi.mock("../../../core/store", () => {
  return {
    useRunning: vi.fn(() => ({
      running: true,
      fps: 30,
      updateRunning: updateRunningMock,
      updateFps: updateFpsMock,
    })),

    useGameUIStore: {
      getState: vi.fn(() => ({
        running: true,
        fps: 30,
        updateRunning: updateRunningMock,
        nextGeneration: nextGenerationMock,
      })),
    },
  };
});

vi.mock("../render-step", () => ({
  useRenderStep: () => mockRenderStep(),
}));

describe("useGameLoop", () => {
  let requestAnimationFrameSpy: MockInstance<
    (callback: FrameRequestCallback) => number
  >;
  let cancelAnimationFrameSpy: MockInstance<() => () => void>;

  beforeEach(() => {
    requestAnimationFrameSpy = vi.spyOn(globalThis, "requestAnimationFrame");

    cancelAnimationFrameSpy = vi
      .spyOn(globalThis, "cancelAnimationFrame")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should start animation loop automatically when running is true", () => {
    renderHook(() => useGameLoop());

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it("should stop animation and call updateRunning when running is false", () => {
    const animate = renderHook(() => useGameLoop()).result.current;

    act(() => {
      animate(performance.now());
    });

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  it("should stop animation after reaching the specified iteration count in manual mode", () => {
    const animate = renderHook(() => useGameLoop()).result.current;

    const maxIterations = 3;

    act(() => {
      animate(performance.now(), maxIterations, maxIterations + 1);
    });

    expect(updateRunningMock).toHaveBeenCalledWith(false);
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  it("should set manualRunRef to true when times parameter is passed", () => {
    const animate = renderHook(() => useGameLoop()).result.current;

    act(() => {
      animate(performance.now(), 5);
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });
});
