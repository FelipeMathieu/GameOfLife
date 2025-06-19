import { useEffect, type RefObject } from "react";
import type { ICreature } from "../../common/interfaces";
import { CELL_SIZE } from "../../common/constants";
import { useCreaturesStore } from "../../core/store";
import { values } from "lodash";

export const useFillCreature = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  drawnStatesRef: RefObject<Map<string, boolean>>
) => {
  const fillCreature = (cell: ICreature) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      drawnStatesRef.current.set(cell.Id, cell.Alive);

      context.fillStyle = cell.Alive ? "black" : "white";
      context.fillRect(
        cell.X * CELL_SIZE,
        cell.Y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      context.strokeStyle = "gray";
      context.strokeRect(
        cell.X * CELL_SIZE,
        cell.Y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  };

  useEffect(() => {
    const cells = useCreaturesStore.getState().cells;

    values(cells).forEach((cell) => {
      drawnStatesRef.current.set(cell.Id, cell.Alive);
      fillCreature(cell);
    });
  }, []);

  return fillCreature;
};
