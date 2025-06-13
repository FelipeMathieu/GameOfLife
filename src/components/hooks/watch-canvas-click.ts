import { useCallback, useEffect } from "react";
import { CELL_SIZE } from "../../common/constants";
import { useCreatures, useRunning, useUpdatedCreature } from "../../core/store";
import { Creature } from "../../common/models";

export const useWatchCanvasClick = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const { cells } = useCreatures();
  const { updateCreature } = useUpdatedCreature();
  const { running } = useRunning();

  const getCanvasCoordinates = (
    canvas: HTMLCanvasElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      canvasX: (clientX - rect.left) * scaleX,
      canvasY: (clientY - rect.top) * scaleY,
    };
  };

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      if (!running) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { canvasX, canvasY } = getCanvasCoordinates(
          canvas,
          event.clientX,
          event.clientY
        );

        const col = Math.floor(canvasY / CELL_SIZE);
        const row = Math.floor(canvasX / CELL_SIZE);

        if (row >= 0 && col >= 0) {
          const creature = cells[`${row},${col}`];

          if (creature?.Alive) {
            creature.Kill();

            updateCreature(creature);
          } else {
            updateCreature(new Creature(row, col, true));
          }
        }
      }
    },
    [CELL_SIZE, cells, running]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [handleCanvasClick]);
};
