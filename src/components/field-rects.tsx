import type { Group } from "konva/lib/Group";
import type { ICreature } from "../common/interfaces";
import type { TQuadrant } from "../common/types";
import { useCreatures, useCreaturesStore, useGameUIStore } from "../core/store";
import CreatureComponent from "./creature";
import { CELL_SIZE } from "../common/constants";
import type { Rect } from "konva/lib/shapes/Rect";
import { memo } from "react";

interface IFieldRects {
  quadrant: TQuadrant;
  groupRefs: React.RefObject<Record<string, Group>>;
}

const FieldRects: React.FC<IFieldRects> = ({ quadrant, groupRefs }) => {
  const key = `${quadrant[0]}${quadrant[1]}` as `${number}${number}`;
  const groupRef = groupRefs.current[key as string];

  const { creatures } = useCreatures(quadrant);

  console.log("** here");

  const onCellClick = (creature: ICreature) => {
    const isRunning = useGameUIStore.getState().running;
    const updateCreature = useCreaturesStore.getState().updateCreature;

    if (!isRunning) {
      if (creature.Alive) creature.Kill();
      else creature.Revive();

      if (groupRef) {
        updateCreature(quadrant, creature);
        const rect = groupRef
          .getChildren()
          .find(
            (item) =>
              item.getAttrs().x === creature.X * CELL_SIZE &&
              item.getAttrs().y === creature.Y * CELL_SIZE
          ) as Rect;
        if (rect) {
          rect.fill(creature.Alive ? "black" : "white");
        }
      }
    }
  };

  return (
    <>
      {creatures.map((creature) => (
        <CreatureComponent
          key={`${creature.Id}-${creature.Alive}`}
          creature={creature}
          onClick={() => onCellClick(creature)}
        />
      ))}
    </>
  );
};

export default memo(FieldRects);
