import type { ICreature } from "../common/interfaces";
import { useCreatures, useGameUIStore } from "../core/store";
import { Rect } from "react-konva";
import { values } from "lodash";
import { CELL_SIZE } from "../common/constants";
import { useMemo } from "react";

const FieldRects = () => {
  const { cells, updateCreature } = useCreatures();

  const onCellClick = (cell: ICreature) => {
    const isRunning = useGameUIStore.getState().running;
    if (!isRunning) {
      if (cell.Alive) cell.Kill();
      else cell.Revive();

      updateCreature(cell);
    }
  };

  const rects = useMemo(
    () =>
      values(cells).map((cell) => (
        <Rect
          key={`${cell.X},${cell.Y}-${cell.Alive}`}
          x={cell.X * CELL_SIZE}
          y={cell.Y * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={cell.Alive ? "black" : "white"}
          stroke="gray"
          onClick={() => onCellClick(cell)}
          onTap={() => onCellClick(cell)}
        />
      )),
    [cells]
  );

  return rects;
};

export default FieldRects;
