import { StyledCard } from "./styled/card.style";
import { Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { Layer, Rect, Stage } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { Creature } from "../common/models";
import {
  useCreatures,
  useCreaturesStore,
  useGenerations,
  useRunning,
  useUpdatedCreature,
} from "../core/store";
import type { ICreature } from "../common/interfaces";
import { useGameLoop } from "./hooks/canvas-render";
import { clone, isEmpty, values } from "lodash";
import { verifyCreatureState } from "../core/helper/creatures-control";
import type { Layer as KonvaLayer } from "konva/lib/Layer";

const FPS = 30;

const Field = () => {
  const { cells, batchUpdate } = useCreatures();
  const layerRef = useRef<KonvaLayer | null>(null);
  const { nextGeneration } = useGenerations();
  const { running } = useRunning();
  const { updateCreature } = useUpdatedCreature();
  const [loading, setLoading] = useState(true);

  const step = () => {
    const creatures = useCreaturesStore.getState().cells;
    const updatedCells: ICreature[] = [];

    values(creatures).forEach((cell) => {
      const clonedCell = clone(cell);
      verifyCreatureState(clonedCell, creatures);

      if (cell.Alive !== clonedCell.Alive) {
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      batchUpdate(updatedCells);
    }

    nextGeneration();
    layerRef.current?.batchDraw();
  };

  useEffect(() => {
    const creatures: ICreature[] = [];

    for (let y = 0; y < FIELD_SIZE; y++) {
      for (let x = 0; x < FIELD_SIZE; x++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    batchUpdate(creatures);
    setLoading(false);

    layerRef.current?.batchDraw();
  }, [FIELD_SIZE]);

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
