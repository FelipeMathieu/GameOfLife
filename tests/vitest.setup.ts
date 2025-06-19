import { afterEach, vi } from "vitest";
import "@vitest/browser/context";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
