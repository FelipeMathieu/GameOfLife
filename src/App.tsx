import { Flex } from "antd";
import Field from "./components/field";

function App() {
  return (
    <Flex
      vertical
      align="center"
      gap={20}
      style={{
        padding: "0.5rem",
      }}
    >
      <Field />
    </Flex>
  );
}

export default App;
