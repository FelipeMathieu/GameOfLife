import { vi } from "vitest";
import { act } from "@testing-library/react";

export async function waitFakeTimer(advanceTime = 500) {
  await act(async () => {
    await Promise.resolve();
  });
  await act(async () => {
    vi.advanceTimersByTime(advanceTime);
  });
}
