import { useEffect, type RefObject } from "react";
import type { ICreature } from "../../common/interfaces";
import { CELL_SIZE } from "../../common/constants";
import { useCreaturesStore } from "../../core/store";
import { values } from "lodash";

/** Return the fillCreature function so it can be called manually if needed */
export const useFillCreature = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  drawnStatesRef: RefObject<Map<string, boolean>>
) => {
  /**
   * Draws a single creature cell on the canvas.
   * Fills the cell with black if alive, white if dead,
   * and outlines the cell with a gray stroke.
   *
   * Also updates the drawnStatesRef to track the current drawn state.
   *
   * @param cell - The creature cell to draw
   */
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
