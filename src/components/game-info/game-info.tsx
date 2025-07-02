import { Card, Col, Flex, Row, Slider, Statistic, Typography } from "antd";
import { useGenerations, usePopulation, useRunning } from "../../core/store";

import { useWatchMaxPopulation } from "../hooks/watch-max-population";
import { FPS } from "../../common/constants";
import GameControls from "./game-controls";

interface IGameInfo {
  states: number;
  setStates: React.Dispatch<React.SetStateAction<number>>;
  onNextGeneration: (times?: number) => void;
}

const GameInfo: React.FC<IGameInfo> = ({
  states = 1,
  setStates,
  onNextGeneration,
}) => {
  const { population, maxPopulation } = usePopulation();
  const { fps, updateFps } = useRunning();
  const { generations } = useGenerations();

  useWatchMaxPopulation();

  return (
    <Flex
      vertical
      align="center"
      style={{
        width: "100%",
      }}
      gap={25}
      data-testid="game-info-wrapper"
    >
      <Row style={{ width: "100%" }}>
        <Col style={{ width: "100%" }}>
          <Flex vertical align="center" style={{ width: "100%" }}>
            <Typography.Text data-testid="game-fps" type="secondary">
              FPS {fps}:
            </Typography.Text>
            <Slider
              data-testid="fps-sliderr"
              min={1}
              defaultValue={fps}
              max={FPS}
              style={{ width: "100%" }}
              onChange={updateFps}
            />
          </Flex>
        </Col>
      </Row>
      <Row
        gutter={[5, 5]}
        style={{
          width: "100%",
        }}
        wrap
      >
        <Col span={8}>
          <Card>
            <Statistic
              data-testid="max-population"
              title="Max population reached:"
              value={maxPopulation}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              data-testid="population"
              title="Population:"
              value={population}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              data-testid="generations"
              title="Generations:"
              value={generations}
            />
          </Card>
        </Col>
      </Row>
      <GameControls
        setStates={setStates}
        onNextGeneration={onNextGeneration}
        states={states}
      />
    </Flex>
  );
};

export default GameInfo;
