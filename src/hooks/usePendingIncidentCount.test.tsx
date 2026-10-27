import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { usePendingIncidentCount } from "./usePendingIncidentCount";

const { countPendingIncidents } = vi.hoisted(() => ({
  countPendingIncidents: vi.fn(),
}));

vi.mock("@/services/resources", () => ({
  countPendingIncidents,
}));

function Wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("usePendingIncidentCount", () => {
  it("devuelve 0 si está apagado e ignora la respuesta que llega tarde", async () => {
    let resolveCount: (value: number) => void = () => {};
    countPendingIncidents.mockImplementation(
      () =>
        new Promise<number>((resolve) => {
          resolveCount = resolve;
        }),
    );

    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => usePendingIncidentCount(enabled),
      { wrapper: Wrapper, initialProps: { enabled: true } },
    );

    rerender({ enabled: false });

    await act(async () => {
      resolveCount(4);
      await Promise.resolve();
    });

    expect(result.current).toBe(0);
  });
});
