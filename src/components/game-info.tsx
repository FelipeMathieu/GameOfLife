import { Button, Col, Flex, Row, Typography } from "antd";
import { useCreatures, usePopulation } from "../core/store";
import {
  ClearOutlined,
  ForwardOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useGenerations, useRunning } from "../core/store/game-ui-store";
import { useWatchMaxPopulation } from "./hooks/watch-max-population";

interface IGameInfo {
  onNextGeneration: () => void;
}

const GameInfo: React.FC<IGameInfo> = ({ onNextGeneration }) => {
  const { killAll } = useCreatures();
  const { population, maxPopulation } = usePopulation();
  const { running, updateRunning } = useRunning();
  const { generations, reset } = useGenerations();

  const onPlay = () => {
    updateRunning(true);
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
      <Flex align="center" gap={10}>
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
        />
        <Button
          onClick={onNextGeneration}
          variant="filled"
          icon={<ForwardOutlined />}
          disabled={running || population < 1}
        />
      </Flex>
    </Flex>
  );
};

export default GameInfo;
