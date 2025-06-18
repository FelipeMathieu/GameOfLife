import { Card, Col, Flex, Row } from "antd";
import GameInfo from "./game-info";
import { SCENE_HEIGHT, SCENE_WIDTH } from "../common/constants";
import { useState } from "react";
import { useRunning } from "../core/store";
// import { useGameLoop } from "./hooks/canvas-render";
// import KnownForms from "./known-forms";
import Header from "./header";
import { useCreateCreatures } from "./hooks/create-creatures";
import SceneStage from "./scene-stage";

const Field = () => {
  const [states, setStates] = useState(1);
  const { running } = useRunning();

  const onNextGeneration = (times?: number) => {
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
          {Array.from({ length: SCENE_HEIGHT }).map((_, yIndex) => (
            <Row key={yIndex} gutter={0}>
              <>
                {Array.from({ length: SCENE_WIDTH }).map((_, xIndex) => (
                  <Col key={`${xIndex}-${yIndex}`}>
                    <SceneStage quadrant={[xIndex, yIndex]} />
                  </Col>
                ))}
              </>
            </Row>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default Field;
