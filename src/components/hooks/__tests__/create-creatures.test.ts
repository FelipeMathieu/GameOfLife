import { expect, it, vi, describe } from "vitest";
import { useCreateCreatures } from "../create-creatures";
import { useCreaturesStore } from "../../../core/store";
import { renderHook } from "@testing-library/react";

describe("Create creatures hook", () => {
  it("should call batch update with brand new creatures", () => {
    const batchUpdateSpy = vi.spyOn(
      useCreaturesStore.getState(),
      "batchUpdate"
    );

    renderHook(() => useCreateCreatures());

    expect(batchUpdateSpy).toHaveBeenCalled();
  });
});
