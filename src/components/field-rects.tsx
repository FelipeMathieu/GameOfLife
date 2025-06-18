import { useFieldContext } from "./context/field-context";
import type { ICreature } from "../common/interfaces";
import { useCreatures, useGameUIStore } from "../core/store";
import { fillCreature } from "../core/helper";
import { Rect } from "react-konva";
import { values } from "lodash";
import { CELL_SIZE } from "../common/constants";

const FieldRects = () => {
  const { rectsRef } = useFieldContext();
  const { cells, updateCreature } = useCreatures();

  const onCellClick = (cell: ICreature) => {
    const isRunning = useGameUIStore.getState().running;
    if (!isRunning) {
      if (cell.Alive) cell.Kill();
      else cell.Revive();

      fillCreature(cell, rectsRef);
      updateCreature(cell);
    }
  };

  return values(cells).map((cell) => (
    <Rect
      key={`${cell.X},${cell.Y}`}
      x={cell.X * CELL_SIZE}
      y={cell.Y * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      fill={cell.Alive ? "black" : "white"}
      stroke="gray"
      onClick={() => onCellClick(cell)}
      onTap={() => onCellClick(cell)}
      ref={(node) => {
        if (node) {
          rectsRef.current[`${cell.X},${cell.Y}`] = node;
        }
      }}
    />
  ));
};

export default FieldRects;
