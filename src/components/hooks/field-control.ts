import { useEffect, useRef, useState } from "react";
import { useCreatures, useRunning, useUpdatedCreature } from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";
import { CELL_SIZE, FIELD_SIZE } from "../../common/constants";
import { useWatchUpdatedCreature } from "./watch-updated-creature";
import { useWatchCanvasClick } from "./watch-canvas-click";

const drawGrid = () =>
  Array(FIELD_SIZE)
    .fill(null)
    .map(() => Array(FIELD_SIZE).fill(null));

export const useFieldControl = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cells } = useCreatures();
  const { updateCreature } = useUpdatedCreature();
  const { running } = useRunning();

  const [grid, setGrid] = useState<null[][]>(drawGrid());

  useWatchCanvasClick(canvasRef);

  useWatchUpdatedCreature(canvasRef);

  useEffect(() => {
    let animationFrameId: number;
    let lastFrameTime = performance.now();
    const fps = 30; // Altere para 60, 24, etc.
    const frameDuration = 1000 / fps;

    const render = (time: number) => {
      const delta = time - lastFrameTime;

      if (delta >= frameDuration) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        grid.forEach((row, rowIndex) => {
          row.forEach((_, colIndex) => {
            const x = colIndex * CELL_SIZE;
            const y = rowIndex * CELL_SIZE;

            const creature = cells[`${rowIndex},${colIndex}`];

            if (creature) {
              verifyCreatureState(creature, cells, FIELD_SIZE, updateCreature);
            }

            ctx.fillStyle = creature?.Alive ? "black" : "white";
            ctx.beginPath();
            ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE);
            ctx.fill();
            ctx.stroke();
          });
        });

        lastFrameTime = time;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (running) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [grid, cells, running, FIELD_SIZE]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const x = colIndex * CELL_SIZE;
        const y = rowIndex * CELL_SIZE;
        const size = CELL_SIZE;

        ctx.fillStyle = cells[`${rowIndex},${colIndex}`]?.Alive
          ? "black"
          : "white";
        ctx.beginPath();
        ctx.roundRect(
          x + (CELL_SIZE - size) / 2,
          y + (CELL_SIZE - size) / 2,
          size,
          size
        );
        ctx.fill();
        ctx.stroke();
      });
    });
  }, []);

  useEffect(() => {
    setGrid(drawGrid());
  }, [FIELD_SIZE]);

  return { grid, setGrid, canvasRef };
};
