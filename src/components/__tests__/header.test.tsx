import { beforeEach, describe, expect, it } from "vitest";
import Header from "../header";
import { render, type RenderResult } from "vitest-browser-react";

describe("Header", () => {
  let screen: RenderResult;

  beforeEach(() => {
    screen = render(<Header />);
  });

  it("should render Header component", () => {
    const element = screen.getByTestId("header-wrapper");

    return expect.element(element).toBeInTheDocument();
  });

  it("should render game title", () => {
    const element = screen.getByTestId("game-title");

    return expect.element(element).toHaveTextContent("Game of Life");
  });

  it("should render game instructions", () => {
    const element = screen.getByTestId("game-instructions");

    return expect
      .element(element)
      .toHaveTextContent("Pick up any known shape or select cells freely");
  });
});
