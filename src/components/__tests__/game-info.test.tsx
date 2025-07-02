import { beforeEach, describe, expect, it, vi } from "vitest";
import GameInfo from "../game-info/game-info";
import { render, screen } from "@testing-library/react";

const onNextGenerationMock = vi.fn();
const setStatesMock = vi.fn();
const killAllMock = vi.fn();
const usePopulationMock = vi.fn();
const useRunningMock = vi.fn();
const useGenerationsMock = vi.fn();

vi.mock("../../core/store", () => ({
  useCreatures: () => ({
    killAll: () => killAllMock(),
  }),
  usePopulation: () => usePopulationMock(),
  useRunning: () => useRunningMock(),
  useGenerations: () => useGenerationsMock(),
}));

vi.mock("../hooks/watch-max-population", () => ({
  useWatchMaxPopulation: vi.fn(),
}));

vi.mock("../game-info/game-controls", () => ({
  __esModule: true,
  default: () => <div>Game Controls</div>,
}));

describe("Game info component", () => {
  const FPS = 30;
  const maxPopulation = 20;
  const population = 10;
  const generations = 500;

  beforeEach(() => {
    usePopulationMock.mockReturnValue({
      population,
      maxPopulation,
    });

    useRunningMock.mockReturnValue({
      fps: FPS,
    });

    useGenerationsMock.mockReturnValue({
      generations,
    });

    render(
      <GameInfo
        states={1}
        setStates={setStatesMock}
        onNextGeneration={onNextGenerationMock}
      />
    );
  });

  it("should render game info component", () => {
    const element = screen.getByTestId("game-info-wrapper");

    return expect.element(element).toBeInTheDocument();
  });

  it("should render game FPS", () => {
    const element = screen.getByTestId("game-fps");

    return expect.element(element).toHaveTextContent(`FPS ${FPS}`);
  });

  it("should render max population", () => {
    const element = screen.getByTestId("max-population");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(maxPopulation);
  });

  it("should render population", () => {
    const element = screen.getByTestId("population");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(population);
  });

  it("should render generations", () => {
    const element = screen.getByTestId("generations");
    const text = element.querySelector(".ant-statistic-content-value-int");

    return expect.element(text).toHaveTextContent(generations);
  });
});
