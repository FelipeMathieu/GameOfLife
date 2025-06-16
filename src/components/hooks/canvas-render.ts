import { useEffect, useRef } from "react";
import { useRunning } from "../../core/store";
import type { Layer as KonvaLayer } from "konva/lib/Layer";
import { useRenderStep } from "./render-step";

export function useGameLoop(layerRef: React.RefObject<KonvaLayer | null>) {
  const manualRunRef = useRef(false);
  const { running, updateRunning, fps } = useRunning();
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef(performance.now());
  const frameDuration = 1000 / fps;

  const step = useRenderStep(layerRef);

  const animate = (time: number, times?: number, iteration: number = 1) => {
    if (times && !manualRunRef.current) {
      manualRunRef.current = true;
    }

    if (times && iteration > times) {
      manualRunRef.current = false;
      updateRunning(false);
      return;
    }

    const delta = time - lastTimeRef.current;
    if (delta >= frameDuration) {
      step();
      lastTimeRef.current = time;
      iteration = iteration + 1;
    }

    requestRef.current = requestAnimationFrame((newTime) =>
      animate(newTime, times, iteration)
    );
  };

  useEffect(() => {
    if (running && !manualRunRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (!running && requestRef.current)
        cancelAnimationFrame(requestRef.current);
    };
  }, [running, fps, manualRunRef.current]);

  return animate;
}
