import { useEffect } from "react";
import {
  useCreatures,
  useGenerations,
  useRunning,
  useUpdatedCreature,
} from "../../core/store";
import { CELL_SIZE, FIELD_SIZE } from "../../common/constants";
import { verifyCreatureState } from "../../core/helper/creatures-control";

export const useCanvasRender = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  grid: null[][]
) => {
  const { running } = useRunning();
  const { cells, updateCreatureNeighbors } = useCreatures();
  const { updateCreature, updatedCreature } = useUpdatedCreature();
  const { nextGeneration } = useGenerations();

  useEffect(() => {
    let animationFrameId: number;
    let lastFrameTime = performance.now();
    const fps = 30;
    const frameDuration = 1000 / fps;

    const render = (time: number) => {
      const delta = time - lastFrameTime;

      if (delta >= frameDuration && updatedCreature) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = updatedCreature.X * CELL_SIZE;
        const y = updatedCreature.Y * CELL_SIZE;

        verifyCreatureState({
          cell: updatedCreature,
          cells,
          fieldSize: FIELD_SIZE,
          updateCreatureCallback: updateCreature,
          handleNeighborsCallback: updateCreatureNeighbors,
        });

        ctx.fillStyle = updatedCreature.Alive ? "black" : "white";
        ctx.beginPath();
        ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE);
        ctx.fill();
        ctx.stroke();

        lastFrameTime = time;
        nextGeneration();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (running) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [grid, updatedCreature, running]);
};
