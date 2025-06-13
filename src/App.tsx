import { Flex } from "antd";
import "./App.css";
import Field from "./components/field";
import Header from "./components/header";

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
      <Header />
      <Field />
    </Flex>
  );
}

export default App;
