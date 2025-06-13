import { useEffect } from "react";
import { useUpdatedCreature } from "../../core/store";
import type { ICreature } from "../../common/interfaces";
import { CELL_SIZE } from "../../common/constants";

export const useWatchUpdatedCreature = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const { updatedCreatureSub } = useUpdatedCreature();

  const watchUpdatedCreature = (creature: ICreature | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx || !creature) return;

    const canvasX = creature.X * CELL_SIZE;
    const canvasY = creature.Y * CELL_SIZE;

    ctx.fillStyle = creature.Alive ? "black" : "white";
    ctx.fillRect(canvasX, canvasY, CELL_SIZE, CELL_SIZE);
    ctx.stroke();
  };

  const sub = updatedCreatureSub(watchUpdatedCreature);

  useEffect(() => {
    return () => {
      sub();
    };
  }, [updatedCreatureSub]);
};
