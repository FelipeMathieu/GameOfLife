import { useEffect, useRef } from "react";
import { useGameUIStore, useRunning } from "../../core/store";
import { useRenderStep } from "./render-step";

const FRAME = 1000;

export function useGameLoop() {
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
}
