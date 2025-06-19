import { Rect } from "react-konva";
import { CELL_SIZE } from "../common/constants";
import type { ICreature } from "../common/interfaces";
import { memo, useCallback } from "react";
import { useCreaturesStore, useGameUIStore } from "../core/store";

interface ICreatureRect {
  creature: ICreature;
}

const CreatureRect: React.FC<ICreatureRect> = ({ creature }) => {
  const onCellClick = useCallback(() => {
    const updateCreature = useCreaturesStore.getState().updateCreature;
    const isRunning = useGameUIStore.getState().running;

    if (!isRunning) {
      if (creature.Alive) creature.Kill();
      else creature.Revive();

      updateCreature(creature);
    }
  }, [creature]);

  return (
    <Rect
      key={`${creature.X},${creature.Y}-${creature.Alive}`}
      x={creature.X * CELL_SIZE}
      y={creature.Y * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      fill={creature.Alive ? "black" : "white"}
      stroke="gray"
      onClick={onCellClick}
      onTap={onCellClick}
    />
  );
};

export default memo(
  CreatureRect,
  (prev, next) =>
    prev.creature.X === next.creature.X &&
    prev.creature.Y === next.creature.Y &&
    prev.creature.Alive === next.creature.Alive
);
