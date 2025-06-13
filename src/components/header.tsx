import { Flex, InputNumber, Typography } from "antd";

interface IHeader {
  size: number;
  handleOnChange: (value: number) => void;
}

const Header: React.FC<IHeader> = ({ handleOnChange, size }) => {
  const onChange = (value: number | null) => {
    if (value) handleOnChange(value);
  };

  return (
    <Flex vertical align="center" gap={8}>
      <Typography.Title level={3}>Game of Life</Typography.Title>
      <InputNumber
        addonBefore="Size of the field"
        value={size}
        addonAfter={`${size}x${size}`}
        onChange={onChange}
        min={20}
        max={100}
      />
    </Flex>
  );
};

export default Header;
