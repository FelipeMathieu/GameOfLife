import { Layer, Stage } from "react-konva";
import type { TQuadrant } from "../common/types";
import FieldRect from "./field-rects";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { memo } from "react";
import { useCreatures } from "../core/store";
import { useGameLoop } from "./hooks/canvas-render";

interface ISceneStage {
  quadrant: TQuadrant;
}

const SceneStage: React.FC<ISceneStage> = ({ quadrant }) => {
  const { creatures } = useCreatures(quadrant);

  useGameLoop(quadrant);

  return (
    <Stage width={FIELD_SIZE * CELL_SIZE} height={FIELD_SIZE * CELL_SIZE}>
      <Layer>
        <>
          {creatures.map((creature) => (
            <FieldRect
              key={creature.Id}
              quadrant={quadrant}
              creature={creature}
            />
          ))}
        </>
      </Layer>
    </Stage>
  );
};

export default memo(SceneStage);
