import { Button, Col, Flex, InputNumber, Row, Typography } from "antd";
import { useCreatures, usePopulation } from "../core/store";
import {
  ClearOutlined,
  ForwardOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  StepForwardFilled,
} from "@ant-design/icons";
import { useGenerations, useRunning } from "../core/store/game-ui-store";
import { useWatchMaxPopulation } from "./hooks/watch-max-population";

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
  const { killAll } = useCreatures();
  const { population, maxPopulation } = usePopulation();
  const { running, updateRunning } = useRunning();
  const { generations, reset } = useGenerations();

  const onPlay = () => {
    if (!running) {
      updateRunning(true);
    }
  };

  const onPause = () => {
    updateRunning(false);
  };

  const onClear = () => {
    killAll();
    reset();
  };

  useWatchMaxPopulation();

  return (
    <Flex
      vertical
      align="center"
      style={{
        width: "100%",
      }}
      gap={10}
    >
      <Row
        gutter={[5, 5]}
        style={{
          width: "100%",
        }}
      >
        <Col span={24}>
          <Typography.Text>
            Max population reached: {maxPopulation}
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text>Population: {population}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text>Generations: {generations}</Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex align="center" justify="center" gap={10}>
            <Button
              color="danger"
              onClick={onClear}
              variant="filled"
              icon={<ClearOutlined />}
              disabled={running}
            />
            <Button
              color={!running ? "blue" : "default"}
              onClick={onPause}
              variant="filled"
              icon={<PauseOutlined />}
            />
            <Button
              onClick={onPlay}
              color={running ? "blue" : "default"}
              variant="filled"
              icon={<PlayCircleOutlined />}
              disabled={population < 1}
            />
            <Button
              onClick={() => {
                onPlay();
                onNextGeneration(1);
              }}
              variant="filled"
              icon={<StepForwardFilled />}
              disabled={running || population < 1}
            />
          </Flex>
        </Col>
        <Col span={24}>
          <Flex align="flex-end" justify="center" gap={8}>
            <Flex vertical align="flex-start">
              <Typography.Text type="secondary">
                Number of states to advance:
              </Typography.Text>
              <InputNumber
                value={states}
                onChange={(value) => {
                  if (value) setStates(value);
                }}
                min={1}
                step={1}
                precision={0}
                disabled={running}
                style={{
                  width: "100%",
                }}
              />
            </Flex>
            <Button
              onClick={() => {
                onPlay();
                onNextGeneration();
              }}
              variant="filled"
              icon={<ForwardOutlined />}
              disabled={running || population < 1}
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default GameInfo;
