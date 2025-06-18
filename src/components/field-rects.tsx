import type { ICreature } from "../common/interfaces";
import { useCreatures, useGameUIStore } from "../core/store";
import { Rect } from "react-konva";
import { CELL_SIZE } from "../common/constants";
import type { TQuadrant } from "../common/types";
import { memo } from "react";

interface IFieldRects {
  creature: ICreature;
  quadrant: TQuadrant;
}

const FieldRect: React.FC<IFieldRects> = ({ creature, quadrant }) => {
  const { updateCreature } = useCreatures(quadrant);

  const onCellClick = () => {
    const isRunning = useGameUIStore.getState().running;
    if (!isRunning) {
      if (creature.Alive) creature.Kill();
      else creature.Revive();

      updateCreature(creature);
    }
  };

  return (
    <Rect
      key={`${creature.Id}-${creature.Alive}`}
      x={creature.X * CELL_SIZE}
      y={creature.Y * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      fill={creature.Alive ? "black" : "white"}
      stroke="gray"
      onClick={() => onCellClick()}
      onTap={() => onCellClick()}
    />
  );
};

export default memo(FieldRect);
