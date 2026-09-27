import type {
  IncidentStatus,
  IncidentType,
  ResourceStatus,
  ResourceType,
} from "@/types/sihe";
import { supabase } from "@/lib/supabase";

export type AdminIncidentRow = {
  id: string;
  resource_id: string;
  resource_name: string | null;
  type: IncidentType;
  description: string;
  suggested_status: ResourceStatus | null;
  status: IncidentStatus;
  photo_path: string | null;
  created_at: string;
  reporter_name: string | null;
  reviewed_at: string | null;
};

export async function listIncidentsForAdmin(
  statusFilter: IncidentStatus | "todas" = "pendiente",
): Promise<AdminIncidentRow[]> {
  let query = supabase
    .from("incidents")
    .select(
      "id, resource_id, type, description, suggested_status, status, photo_path, created_at, reporter_id, reviewed_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (statusFilter !== "todas") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message || "No se pudieron cargar las incidencias");
  }

  const rows = (data ?? []) as Array<{
    id: string;
    resource_id: string;
    type: IncidentType;
    description: string;
    suggested_status: ResourceStatus | null;
    status: IncidentStatus;
    photo_path: string | null;
    created_at: string;
    reporter_id: string;
    reviewed_at: string | null;
  }>;

  const resourceIds = [...new Set(rows.map((r) => r.resource_id))];
  const reporterIds = [...new Set(rows.map((r) => r.reporter_id))];

  const nameByResource = new Map<string, string>();
  const nameByReporter = new Map<string, string>();

  if (resourceIds.length) {
    const { data: resources } = await supabase
      .from("resources")
      .select("id, name")
      .in("id", resourceIds);
    for (const r of (resources ?? []) as { id: string; name: string }[]) {
      nameByResource.set(r.id, r.name);
    }
  }

  if (reporterIds.length) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, name")
      .in("id", reporterIds);
    for (const p of (profiles ?? []) as { id: string; name: string }[]) {
      nameByReporter.set(p.id, p.name);
    }
  }

  return rows.map((r) => ({
    id: r.id,
    resource_id: r.resource_id,
    resource_name: nameByResource.get(r.resource_id) ?? null,
    type: r.type,
    description: r.description,
    suggested_status: r.suggested_status,
    status: r.status,
    photo_path: r.photo_path,
    created_at: r.created_at,
    reporter_name: nameByReporter.get(r.reporter_id) ?? null,
    reviewed_at: r.reviewed_at,
  }));
}

export async function getIncidentPhotoUrl(
  photoPath: string,
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("incident-photos")
    .createSignedUrl(photoPath, 3600);
  if (error) return null;
  return data.signedUrl;
}

export async function resolveIncident(input: {
  incidentId: string;
  resourceId: string;
  reviewerId: string;
  approve: boolean;
  suggestedStatus: ResourceStatus | null;
  description: string;
  type: IncidentType;
}): Promise<void> {
  const now = new Date().toISOString();
  const newStatus: IncidentStatus = input.approve ? "aprobada" : "rechazada";

  if (input.approve && input.suggestedStatus) {
    const { error: resError } = await supabase
      .from("resources")
      .update({
        status: input.suggestedStatus,
        last_verified_at: now,
        last_verified_by_id: input.reviewerId,
      })
      .eq("id", input.resourceId);

    if (resError) {
      throw new Error(resError.message || "No se pudo actualizar la ficha");
    }
  }

  const { error: histError } = await supabase.from("resource_history").insert({
    resource_id: input.resourceId,
    user_id: input.reviewerId,
    action: input.approve ? "incidencia_aprobada" : "incidencia_rechazada",
    payload: {
      incident_id: input.incidentId,
      type: input.type,
      description: input.description,
      suggested_status: input.suggestedStatus,
      applied_to_resource: Boolean(input.approve && input.suggestedStatus),
    },
  });

  if (histError) {
    throw new Error(histError.message || "Falló el historial");
  }

  const { error: incError } = await supabase
    .from("incidents")
    .update({
      status: newStatus,
      reviewer_id: input.reviewerId,
      reviewed_at: now,
    })
    .eq("id", input.incidentId)
    .eq("status", "pendiente");

  if (incError) {
    throw new Error(incError.message || "No se pudo resolver la incidencia");
  }
}

export async function createResourceAdmin(input: {
  type: ResourceType;
  name: string;
  address: string;
  lat: number;
  lng: number;
  accessibility: string;
  capacity: string;
  status: ResourceStatus;
  observations: string;
}): Promise<string> {
  const { data, error } = await supabase.rpc("admin_create_resource", {
    p_type: input.type,
    p_name: input.name.trim(),
    p_address: input.address.trim(),
    p_lat: input.lat,
    p_lng: input.lng,
    p_accessibility: input.accessibility.trim() || null,
    p_capacity: input.capacity.trim() || null,
    p_status: input.status,
    p_observations: input.observations.trim() || null,
  });

  if (error) {
    throw new Error(
      error.message ||
        "No se pudo crear el recurso. Ejecutá 05_admin_incendios.sql",
    );
  }

  return data as string;
}
