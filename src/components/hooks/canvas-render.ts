import { useEffect, useRef } from "react";
import { useGenerations, useRunning } from "../../core/store";

type GameLoopCallback = () => void;

export function useGameLoop(callback: GameLoopCallback, fps = 30) {
  const { nextGeneration } = useGenerations();
  const { running } = useRunning();
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef(performance.now());
  const frameDuration = 1000 / fps;

  const animate = (time: number) => {
    const delta = time - lastTimeRef.current;
    if (delta >= frameDuration) {
      callback();
      nextGeneration();
      lastTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [running, fps]);
}
