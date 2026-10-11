import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    rpc: vi.fn(),
  },
}));

import { supabase } from "@/lib/supabase";
import { createFireEventAdmin } from "@/services/fires";

const rpc = vi.mocked(supabase.rpc);

const input = {
  eventType: "incendio_forestal" as const,
  occurredAt: "2024-06-01T18:30:00.000Z",
  lat: -28.47,
  lng: -65.78,
  description: "   ",
};

describe("createFireEventAdmin", () => {
  beforeEach(() => {
    rpc.mockReset();
  });

  it("manda la nota vacía como p_description null", async () => {
    rpc.mockResolvedValue({ data: "fire-1", error: null });

    await expect(createFireEventAdmin(input)).resolves.toBe("fire-1");

    expect(rpc).toHaveBeenCalledWith("admin_create_fire_event", {
      p_event_type: "incendio_forestal",
      p_occurred_at: "2024-06-01T18:30:00.000Z",
      p_lat: -28.47,
      p_lng: -65.78,
      p_description: null,
    });
  });

  it("propaga el error del RPC", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "sin permiso" } });

    await expect(
      createFireEventAdmin({ ...input, description: "parte" }),
    ).rejects.toThrow("sin permiso");
  });
});
