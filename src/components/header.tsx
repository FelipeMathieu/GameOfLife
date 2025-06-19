import { Flex, Typography } from "antd";
import { memo } from "react";

const Header = () => {
  return (
    <Flex vertical align="center" gap={8} data-testid="header-wrapper">
      <Typography.Title level={3} data-testid="game-title">
        Game of Life
      </Typography.Title>
      <Typography.Title level={5} data-testid="game-instructions">
        Pick up any known shape or select cells freely
      </Typography.Title>
    </Flex>
  );
};

export default memo(Header);
