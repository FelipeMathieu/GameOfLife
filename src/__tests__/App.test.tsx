import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

const componentMock = vi.fn();

vi.mock("../components/field", () => ({
  __esModule: true,
  default: () => componentMock(),
}));

describe("App component", () => {
  it("should render app component normally", async () => {
    componentMock.mockReturnValue(<div>field</div>);

    render(<App />);

    const element = screen.getByTestId("app-component");

    await expect.element(element).toBeInTheDocument();
  });

  it("should render error boundary component", () => {
    componentMock.mockImplementation(() => {
      throw new Error("Simulated error");
    });

    const { container } = render(<App />);

    const element = container.querySelector(".ant-alert-message");

    return expect.element(element).toHaveTextContent("Simulated error");
  });
});
