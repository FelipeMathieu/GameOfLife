import { useEffect, useRef, useState } from "react";
import { useCreatures } from "../../core/store";
import { CELL_SIZE, FIELD_SIZE } from "../../common/constants";
import { useWatchUpdatedCreature } from "./watch-updated-creature";
import { useWatchCanvasClick } from "./watch-canvas-click";
import { useCanvasRender } from "./canvas-render";

const drawGrid = () =>
  Array(FIELD_SIZE)
    .fill(null)
    .map(() => Array(FIELD_SIZE).fill(null));

export const useFieldControl = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cells } = useCreatures();
  const [grid] = useState<null[][]>(drawGrid());

  console.log("** cells", cells);

  useWatchCanvasClick(canvasRef);

  useWatchUpdatedCreature(canvasRef);

  useCanvasRender(canvasRef, grid);

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

  return canvasRef;
};
