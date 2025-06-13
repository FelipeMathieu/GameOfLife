import { useCallback, useEffect, useRef, useState } from "react";
import { Creature } from "../../common/models";
import { updateCreature, useCreatures } from "../../core/store";
import { useCreaturesControl } from "../../core/hooks/creatures-control";

const drawGrid = (size: number) =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

export const useFieldControl = (fieldSize: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellSize = 30;
  const cells = useCreatures();

  const [grid, setGrid] = useState<null[][]>(drawGrid(fieldSize));

  useCreaturesControl(false, grid, cells);

  const getCellCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { row: -1, col: -1 };

      const rect = canvas.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      return { row, col };
    },
    [cellSize]
  );

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      const { row, col } = getCellCoordinates(event.clientX, event.clientY);

      if (row >= 0 && col >= 0 && row < fieldSize && col < fieldSize) {
        const creature = cells[`${row},${col}`];

        if (creature?.Alive) {
          creature.Kill();

          updateCreature(creature);
        } else {
          updateCreature(new Creature(row, col, true));
        }
      }
    },
    [fieldSize, getCellCoordinates, cells]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [handleCanvasClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    grid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const x = colIndex * cellSize;
        const y = rowIndex * cellSize;
        const size = cellSize;

        ctx.fillStyle = cells[`${rowIndex},${colIndex}`]?.Alive
          ? "black"
          : "white";
        ctx.beginPath();
        ctx.roundRect(
          x + (cellSize - size) / 2,
          y + (cellSize - size) / 2,
          size,
          size
        );
        ctx.fill();
        ctx.stroke();
      });
    });
  }, [grid, fieldSize, cells]);

  useEffect(() => {
    setGrid(drawGrid(fieldSize));
  }, [fieldSize]);

  return { grid, setGrid, canvasRef, getCellCoordinates };
};
