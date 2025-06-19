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
});
