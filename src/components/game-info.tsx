import { Button, Col, Flex, Row, Typography } from "antd";
import { usePopulation } from "../core/store";
import { PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useGenerations, useRunning } from "../core/store/game-ui-store";

const GameInfo: React.FC = () => {
  const population = usePopulation();
  const { running, updateRunning } = useRunning();
  const { generations } = useGenerations();

  const onPlay = () => {
    updateRunning(true);
  };

  const onPause = () => {
    updateRunning(false);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Flex align="center" justify="space-evenly">
          <Typography.Text>Population: {population}</Typography.Text>
          <Typography.Text>Generations: {generations}</Typography.Text>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex align="center" justify="space-evenly">
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
        </Flex>
      </Col>
    </Row>
  );
};

export default GameInfo;
