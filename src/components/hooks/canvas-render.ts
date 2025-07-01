import { useEffect, useRef } from "react";
import { useGameUIStore, useRunning } from "../../core/store";
import { useRenderStep } from "./render-step";

const FRAME = 1000; // 1000ms = 1 second (used to calculate frame interval)

/**
 * Returns an `animate` function that runs the main game loop,
 * updating creatures on the Canvas at a defined FPS.
 *
 * - Automatically starts the loop when `running` is true.
 * - Supports manual triggering via optional `times` parameter.
 * - Stops when the requested number of iterations is completed.
 */
export const useGameLoop = () => {
  const manualRunRef = useRef(false);
  const { fps } = useRunning();
  const { running, updateRunning } = useRunning();
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef(performance.now());

  const step = useRenderStep();

  const frameCallback =
    (times?: number, iteration: number = 1) =>
    (newTime: number) =>
      animate(newTime, times, iteration);

  /**
   * The main animation function.
   *
   * @param time - The timestamp provided by requestAnimationFrame.
   * @param times - Optional number of steps to run (for manual execution).
   * @param iteration - The current iteration count.
   */
  const animate = (time: number, times?: number, iteration: number = 1) => {
    const { fps: framesPerSecond, running: isRunning } =
      useGameUIStore.getState();
    const frameDuration = FRAME / framesPerSecond;

    if (times && !manualRunRef.current) {
      manualRunRef.current = true;
    }

    if (!isRunning || (times && iteration > times)) {
      manualRunRef.current = false;
      updateRunning(false);
      cancelAnimationFrame(requestRef.current);
      return;
    }

    const delta = time - lastTimeRef.current;
    if (delta >= frameDuration) {
      step();
      lastTimeRef.current = time;
      iteration = iteration + 1;
    }

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(frameCallback(times, iteration));
  };

  useEffect(() => {
    if (running && !manualRunRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (!manualRunRef.current && requestRef.current)
        cancelAnimationFrame(requestRef.current);
    };
  }, [running, fps, manualRunRef.current]);

  return animate;
};
