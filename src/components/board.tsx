import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { values } from "lodash";
import type { TCreatures } from "../common/types";
import { useFillCreature } from "./hooks/fill-creature";
import { useCreatures, useCreaturesStore, useGameUIStore } from "../core/store";

const Board = () => {
  const [error, setError] = useState<Error>();
  const { cellsSub } = useCreatures();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnStatesRef = useRef<Map<string, boolean>>(new Map());

  if (error) {
    throw error;
  }

  const fillCreature = useFillCreature(canvasRef, drawnStatesRef);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { cells, updateCreature } = useCreaturesStore.getState();
    const isRunning = useGameUIStore.getState().running;

    if (!isRunning) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const cellX = Math.floor(x / CELL_SIZE);
      const cellY = Math.floor(y / CELL_SIZE);

      const cell = cells[`${cellX},${cellY}`];

      if (cell) {
        if (cell.Alive) cell.Kill();
        else cell.Revive();

        updateCreature(cell);
      }
    }
  };

  const canvasControl = useCallback(
    (creatures: TCreatures) => {
      values(creatures)
        .filter((cell) => {
          const prevAlive = drawnStatesRef.current.get(cell.Id);
          return typeof prevAlive === "boolean" && prevAlive !== cell.Alive;
        })
        .forEach(fillCreature);
    },
    [drawnStatesRef?.current]
  );

  useEffect(() => {
    const unSub = cellsSub(canvasControl);

    return () => {
      unSub();
    };
  }, [canvasControl]);

  try {
    return (
      <canvas
        ref={canvasRef}
        width={FIELD_SIZE * CELL_SIZE}
        height={FIELD_SIZE * CELL_SIZE}
        onClick={handleClick}
      />
    );
  } catch (canvasError) {
    setError(
      canvasError instanceof Error
        ? canvasError
        : new Error(String(canvasError))
    );
    return null;
  }
};

export default Board;
