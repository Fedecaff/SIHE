import { supabase } from "@/lib/supabase";

export type FireEventMapItem = {
  id: string;
  event_type: string;
  occurred_at: string;
  description: string | null;
  linked_resource_id: string | null;
  lat: number;
  lng: number;
};

export type FireEventType = "incendio_forestal" | "incendio_urbano";
export type FirePeriod = "12m" | "5y" | "all";

function periodStart(period: FirePeriod): string | null {
  const now = new Date();
  if (period === "all") return null;
  if (period === "12m") {
    now.setFullYear(now.getFullYear() - 1);
    return now.toISOString();
  }
  now.setFullYear(now.getFullYear() - 5);
  return now.toISOString();
}

export async function fetchFireEventsMap(
  period: FirePeriod = "all",
): Promise<FireEventMapItem[]> {
  let query = supabase
    .from("fire_events_map")
    .select(
      "id, event_type, occurred_at, description, linked_resource_id, lat, lng",
    )
    .order("occurred_at", { ascending: false });

  const start = periodStart(period);
  if (start) query = query.gte("occurred_at", start);

  const { data, error } = await query;
  if (error) {
    throw new Error(
      error.message ||
        "No se pudieron cargar incendios. Ejecutá 05_admin_incendios.sql",
    );
  }
  return (data ?? []) as FireEventMapItem[];
}

const FIRE_EVENT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** El id de fire_events es uuid. Un valor de otro formato no se consulta. */
export function isFireEventId(id: string): boolean {
  return FIRE_EVENT_ID.test(id);
}

export async function fetchFireEventById(
  id: string,
): Promise<FireEventMapItem | null> {
  if (!isFireEventId(id)) return null;

  const { data, error } = await supabase
    .from("fire_events_map")
    .select(
      "id, event_type, occurred_at, description, linked_resource_id, lat, lng",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("No se pudo cargar el incendio");
  }
  return (data as FireEventMapItem | null) ?? null;
}

export async function createFireEventAdmin(input: {
  eventType: FireEventType;
  occurredAt: string;
  lat: number;
  lng: number;
  description: string;
}): Promise<string> {
  const { data, error } = await supabase.rpc("admin_create_fire_event", {
    p_event_type: input.eventType,
    p_occurred_at: input.occurredAt,
    p_lat: input.lat,
    p_lng: input.lng,
    p_description: input.description.trim() || null,
  });
  if (error) {
    throw new Error(
      error.message ||
        "No se pudo registrar el incendio. Ejecutá 08_admin_alta_incendio.sql",
    );
  }
  return data as string;
}
export function fireTypeLabel(type: string): string {
  switch (type) {
    case "incendio_forestal":
      return "Incendio forestal";
    case "incendio_urbano":
      return "Incendio urbano";
    default:
      return type;
  }
}

