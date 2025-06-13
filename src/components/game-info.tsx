import { Flex, Typography } from "antd";
import { usePopulation } from "../core/store";

const GameInfo = () => {
  const population = usePopulation();

  return (
    <Flex align="center" justify="space-evenly">
      <Typography.Text>Population: {population}</Typography.Text>
    </Flex>
  );
};

export default GameInfo;
