import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Header from "../header";
import { page } from "@vitest/browser/context";

describe("Header", () => {
  const renderComponent = () => render(<Header />);

  beforeEach(() => {
    renderComponent();
  });

  it("should render Header component", () => {
    const element = page.getByTestId("header-wrapper");

    return expect.element(element).toBeInTheDocument();
  });

  it("should render game title", () => {
    const element = page.getByTestId("game-title");

    return expect.element(element).toHaveTextContent("Game of Life");
  });

  it("should render game instructions", () => {
    const element = page.getByTestId("game-instructions");

    return expect
      .element(element)
      .toHaveTextContent("Pick up any known shape or select cells freely");
  });
});
