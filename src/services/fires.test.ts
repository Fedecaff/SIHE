import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(),
  },
}));

import { supabase } from "@/lib/supabase";
import { createFireEventAdmin, fetchFireEventById } from "@/services/fires";

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

describe("fetchFireEventById", () => {
  const id = "11111111-1111-4111-8111-111111111111";

  beforeEach(() => {
    vi.mocked(supabase.from).mockReset();
  });

  it("consulta por id y no trae todos los registros", async () => {
    const row = {
      id,
      event_type: "incendio_forestal",
      occurred_at: "2024-06-01T18:30:00.000Z",
      description: "parte",
      linked_resource_id: null,
      lat: -28.47,
      lng: -65.78,
    };
    const maybeSingle = vi.fn().mockResolvedValue({ data: row, error: null });
    const eq = vi.fn(() => ({ maybeSingle }));
    const select = vi.fn(() => ({ eq }));
    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as unknown as ReturnType<typeof supabase.from>);

    await expect(fetchFireEventById(id)).resolves.toEqual(row);

    expect(supabase.from).toHaveBeenCalledTimes(1);
    expect(supabase.from).toHaveBeenCalledWith("fire_events_map");
    expect(select).toHaveBeenCalledTimes(1);
    expect(eq).toHaveBeenCalledTimes(1);
    expect(eq).toHaveBeenCalledWith("id", id);
    expect(maybeSingle).toHaveBeenCalledTimes(1);
  });

  it("no consulta si el id no es un uuid", async () => {
    await expect(fetchFireEventById("todos")).resolves.toBeNull();
    expect(supabase.from).not.toHaveBeenCalled();
  });
});
