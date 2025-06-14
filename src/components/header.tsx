import { Flex, Typography } from "antd";

const Header = () => {
  return (
    <Flex vertical align="center" gap={8}>
      <Typography.Title level={3}>Game of Life</Typography.Title>
      <Typography.Title level={5}>
        Pick up any known shape or select cells freely
      </Typography.Title>
    </Flex>
  );
};

export default Header;
