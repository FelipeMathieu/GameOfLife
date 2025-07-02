import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import GameInfo from "../game-info";
import { waitFakeTimer } from "../../../utils/tests/waitFakeTimer";

const onNextGenerationMock = vi.fn();
const setStatesMock = vi.fn();
const killAllMock = vi.fn();
const usePopulationMock = vi.fn();
const useRunningMock = vi.fn();
const useGenerationsMock = vi.fn();
const updateFpsMock = vi.fn();

vi.mock("../../../core/store", () => ({
  useCreatures: () => ({
    killAll: () => killAllMock(),
  }),
  usePopulation: () => usePopulationMock(),
  useRunning: () => useRunningMock(),
  useGenerations: () => useGenerationsMock(),
}));

vi.mock("../../hooks/watch-max-population", () => ({
  useWatchMaxPopulation: vi.fn(),
}));

vi.mock("../../game-info/game-controls", () => ({
  __esModule: true,
  default: () => <div>Game Controls</div>,
}));

describe("Game info component", () => {
  const FPS = 30;
  const maxPopulation = 20;
  const population = 10;
  const generations = 500;

  beforeEach(() => {
    vi.useFakeTimers();

    usePopulationMock.mockReturnValue({
      population,
      maxPopulation,
    });

    useRunningMock.mockReturnValue({
      fps: FPS,
      updateFps: updateFpsMock,
    });

    useGenerationsMock.mockReturnValue({
      generations,
    });
  });

  it("should render game info component", () => {
    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = screen.getByTestId("game-info-wrapper");

    return expect.element(element).toBeInTheDocument();
  });

  it("should render game FPS", () => {
    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = screen.getByTestId("game-fps");

    return expect.element(element).toHaveTextContent(`FPS ${FPS}`);
  });

  it("should render max population", () => {
    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = screen.getByTestId("max-population");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(maxPopulation);
  });

  it("should render population", () => {
    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = screen.getByTestId("population");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(population);
  });

  it("should render generations", () => {
    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = screen.getByTestId("generations");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(generations);
  });

  it("should handle fps slider", async () => {
    const { container } = render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );

    const element = container.querySelector(".ant-slider-handle");

    fireEvent.mouseOver(element!);
    fireEvent.mouseDown(element!);
    fireEvent.mouseMove(element!, { clientX: -350 });
    fireEvent.mouseUp(element!);

    await waitFakeTimer();

    expect(updateFpsMock).toHaveBeenCalledExactlyOnceWith(5);
  });
});
