import { Card, Flex } from "antd";
import GameInfo from "./game-info";
import {
  CELL_SIZE,
  FIELD_SIZE,
  SCENE_HEIGHT,
  SCENE_WIDTH,
} from "../common/constants";
import { memo, useRef, useState } from "react";
import { useGameUIStore } from "../core/store";
// import KnownForms from "./known-forms";
import Header from "./header";
import { useCreateCreatures } from "./hooks/create-creatures";
import { Group, Layer, Stage } from "react-konva";
import type { TQuadrant } from "../common/types";
import FieldRects from "./field-rects";
import type { Group as KonvaGroup } from "konva/lib/Group";
import { getCellQuadrant } from "../core/helper";

const Field = () => {
  const groupRefs = useRef<Record<string, KonvaGroup>>({});
  const [states, setStates] = useState(1);

  const onNextGeneration = (times?: number) => {
    const running = useGameUIStore.getState().running;
    if (!running) {
      console.log("** times", times);
    }
  };

  const loading = useCreateCreatures();

  return (
    <Card loading={loading}>
      <Flex vertical gap={20} align="center" justify="center">
        <Header />

        <GameInfo
          states={states}
          setStates={setStates}
          onNextGeneration={onNextGeneration}
        />

        {/* <KnownForms /> */}

        <Flex gap={0} vertical>
          <Stage
            width={SCENE_WIDTH * FIELD_SIZE * CELL_SIZE}
            height={SCENE_HEIGHT * FIELD_SIZE * CELL_SIZE}
          >
            <Layer>
              <>
                {Array.from({ length: SCENE_HEIGHT }).flatMap((_, yIndex) =>
                  Array.from({ length: SCENE_WIDTH }).map((_, xIndex) => {
                    const quadrant: TQuadrant = getCellQuadrant(xIndex, yIndex);
                    const [x, y] = quadrant;
                    return (
                      <Group
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        ref={(node) => {
                          if (node) {
                            groupRefs.current[`${x}${y}`] = node;
                          }
                        }}
                      >
                        <FieldRects quadrant={quadrant} groupRefs={groupRefs} />
                      </Group>
                    );
                  })
                )}
              </>
            </Layer>
          </Stage>
        </Flex>
      </Flex>
    </Card>
  );
};

export default memo(Field);
