import { Alert, Flex } from "antd";
import Field from "./components/field";

const { ErrorBoundary } = Alert;

function App() {
  return (
    <Flex
      data-testid="app-component"
      vertical
      align="center"
      gap={20}
      style={{
        padding: "0.5rem",
      }}
    >
      <ErrorBoundary>
        <Field />
      </ErrorBoundary>
    </Flex>
  );
}

export default App;
