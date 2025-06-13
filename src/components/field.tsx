import { StyledCard } from "./styled/card.style";
import { Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { Layer, Rect, Stage } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { Creature } from "../common/models";
import { useCreatures, useRunning, useUpdatedCreature } from "../core/store";
import type { ICreature } from "../common/interfaces";
import { useGameLoop } from "./hooks/canvas-render";
import { values } from "lodash";
import { verifyCreatureState } from "../core/helper/creatures-control";

const FPS = 30;

const Field = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layerRef = useRef<any>(null);
  const { cells, batchUpdate } = useCreatures();
  const { running } = useRunning();
  const { updateCreature } = useUpdatedCreature();
  const [loading, setLoading] = useState(false);

  const step = () => {
    values(cells).forEach((cell) => {
      verifyCreatureState({
        cell,
        cells,
        fieldSize: FIELD_SIZE,
        updateCreatureCallback: updateCreature,
      });
    });

    layerRef.current?.batchDraw();
  };

  useEffect(() => {
    const creatures: ICreature[] = [];
    setLoading(true);
    for (let x = 0; x < FIELD_SIZE; x++) {
      for (let y = 0; y < FIELD_SIZE; y++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    setLoading(false);
    batchUpdate(creatures);
  }, [FIELD_SIZE]);

  useEffect(() => {
    const creatures: ICreature[] = [];

    setLoading(true);
    for (let x = 0; x < FIELD_SIZE; x++) {
      for (let y = 0; y < FIELD_SIZE; y++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    batchUpdate(creatures);
    layerRef.current?.batchDraw();
    setLoading(false);
  }, []);

  useGameLoop(step, FPS);

  return (
    <StyledCard loading={loading}>
      <Flex vertical gap={10} align="center" justify="center">
        <GameInfo onNextGeneration={step} />

        <Stage width={FIELD_SIZE * CELL_SIZE} height={FIELD_SIZE * CELL_SIZE}>
          <Layer ref={layerRef}>
            <>
              {values(cells).map((cell) => (
                <Rect
                  key={`${cell.X},${cell.Y}`}
                  x={cell.X * CELL_SIZE}
                  y={cell.Y * CELL_SIZE}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill={cell.Alive ? "back" : "white"}
                  stroke="gray"
                  onClick={() => {
                    if (!running) {
                      if (cell.Alive) {
                        cell.Kill();
                      } else {
                        cell.Revive();
                      }

                      updateCreature(cell);
                    }
                  }}
                />
              ))}
            </>
          </Layer>
        </Stage>
      </Flex>
    </StyledCard>
  );
};

export default Field;
