import { useEffect } from "react";
import { useRunning, useUpdatedCreature } from "../../core/store";
import type { ICreature } from "../../common/interfaces";
import { CELL_SIZE } from "../../common/constants";

export const useWatchUpdatedCreature = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const { updatedCreatureSub } = useUpdatedCreature();
  const { running } = useRunning();

  const watchUpdatedCreature = (creature: ICreature | null) => {
    console.log("** creature", creature);

    if (!running) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx || !creature) return;

      const canvasX = creature.X * CELL_SIZE;
      const canvasY = creature.Y * CELL_SIZE;

      ctx.fillStyle = creature.Alive ? "black" : "white";
      ctx.fillRect(canvasX, canvasY, CELL_SIZE, CELL_SIZE);

      ctx.strokeStyle = "gray";
      ctx.strokeRect(canvasX, canvasY, CELL_SIZE, CELL_SIZE);
    }
  };

  const sub = updatedCreatureSub(watchUpdatedCreature);

  useEffect(() => {
    return () => {
      sub();
    };
  }, [updatedCreatureSub]);
};
