import { Flex } from "antd";
import "./App.css";
import Field from "./components/field";
import Header from "./components/header";
import { useState } from "react";

const MIN_VALUE = 20;

function App() {
  const [size, setSize] = useState(MIN_VALUE);

  return (
    <Flex
      vertical
      align="center"
      gap={20}
      style={{
        padding: "0.5rem",
      }}
    >
      <Header size={size} handleOnChange={setSize} />
      <Field size={size} />
    </Flex>
  );
}

export default App;
