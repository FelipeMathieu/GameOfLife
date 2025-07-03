import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameControls from "../game-controls";
import { waitFakeTimer } from "../../../utils/tests/waitFakeTimer";

const setStatesMock = vi.fn();
const onNextGenerationMock = vi.fn();
const killAllMock = vi.fn();
const useRunningMock = vi.fn();
const resetMock = vi.fn();
const updateRunningMock = vi.fn();
const usePopulationMock = vi.fn();

vi.mock("../../../core/store", () => ({
  useCreatures: () => ({
    killAll: killAllMock,
  }),
  usePopulation: () => usePopulationMock(),
  useRunning: () => useRunningMock(),
  useGenerations: () => ({
    reset: resetMock,
  }),
}));

describe("Game controls component", () => {
  const states = 1;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe("When game is not running", () => {
    beforeEach(() => {
      useRunningMock.mockReturnValue({
        running: false,
        updateRunning: updateRunningMock,
      });

      usePopulationMock.mockReturnValue({
        population: 10,
      });

      render(
        <GameControls
          setStates={setStatesMock}
          states={states}
          onNextGeneration={onNextGenerationMock}
        />
      );
    });

    it("should call reset and killAll function when clicking clear button", async () => {
      const element = screen.getByTestId("clear-button");

      fireEvent.click(element);

      await waitFakeTimer();

      expect(element).toBeEnabled();
      expect(killAllMock).toHaveBeenCalledOnce();
      expect(resetMock).toHaveBeenCalledOnce();
    });

    it('should call update running "false" when clicking pause button', async () => {
      const element = screen.getByTestId("pause-button");

      fireEvent.click(element);

      await waitFakeTimer();

      expect(element).toBeEnabled();
      expect(updateRunningMock).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('should call update running "true" when clicking the play button', async () => {
      const element = screen.getByTestId("play-button");

      fireEvent.click(element);

      await waitFakeTimer();

      expect(element).toBeEnabled();
      expect(updateRunningMock).toHaveBeenCalledExactlyOnceWith(true);
    });

    it('should call update running "true" and next generation when clicking the one step forward button', async () => {
      const element = screen.getByTestId("one-step-forward-button");

      fireEvent.click(element);

      await waitFakeTimer();

      expect(element).toBeEnabled();
      expect(updateRunningMock).toHaveBeenCalledExactlyOnceWith(true);
      expect(onNextGenerationMock).toHaveBeenCalledExactlyOnceWith(1);
    });

    it("should input how many times the next step will run and call update running and next generation functions", async () => {
      const input = screen.getByTestId("steps-input");
      const button = screen.getByTestId("step-forward-button");

      fireEvent.change(input, { target: { value: 10 } });

      await waitFakeTimer();

      fireEvent.click(button);

      await waitFakeTimer();

      expect(input).toBeEnabled();
      expect(button).toBeEnabled();
      expect(updateRunningMock).toHaveBeenCalledExactlyOnceWith(true);
      expect(onNextGenerationMock).toHaveBeenCalledOnce();
    });
  });

  describe("When the population is 0", () => {
    beforeEach(() => {
      useRunningMock.mockReturnValue({
        running: false,
        updateRunning: updateRunningMock,
      });

      usePopulationMock.mockReturnValue({
        population: 0,
      });

      render(
        <GameControls
          setStates={setStatesMock}
          states={states}
          onNextGeneration={onNextGenerationMock}
        />
      );
    });

    it("should check all the disabled buttons and inputs", () => {
      const playButton = screen.getByTestId("play-button");
      const stepForwardButton = screen.getByTestId("step-forward-button");
      const oneStepForwardButton = screen.getByTestId(
        "one-step-forward-button"
      );

      expect(playButton).toBeDisabled();
      expect(stepForwardButton).toBeDisabled();
      expect(oneStepForwardButton).toBeDisabled();
    });
  });

  describe("When the game is running", () => {
    beforeEach(() => {
      useRunningMock.mockReturnValue({
        running: true,
        updateRunning: updateRunningMock,
      });

      usePopulationMock.mockReturnValue({
        population: 10,
      });

      render(
        <GameControls
          setStates={setStatesMock}
          states={states}
          onNextGeneration={onNextGenerationMock}
        />
      );
    });

    it("should check the disabled buttons and inputs", () => {
      const playButton = screen.getByTestId("play-button");
      const stepForwardButton = screen.getByTestId("step-forward-button");
      const oneStepForwardButton = screen.getByTestId(
        "one-step-forward-button"
      );
      const input = screen.getByTestId("steps-input");

      expect(playButton).toBeDisabled();
      expect(stepForwardButton).toBeDisabled();
      expect(oneStepForwardButton).toBeDisabled();
      expect(input).toBeDisabled();
    });
  });
});
