import { Flex } from "antd";
import Field from "./components/field";
import { FieldProvider } from "./components/context/field.contex";

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
      <FieldProvider>
        <Field />
      </FieldProvider>
    </Flex>
  );
}

export default App;
