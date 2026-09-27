import type {
  IncidentType,
  ResourceStatus,
} from "@/types/sihe";
import { supabase } from "@/lib/supabase";

export async function reportIncident(input: {
  resourceId: string;
  reporterId: string;
  type: IncidentType;
  description: string;
  suggestedStatus: ResourceStatus | "";
  photo: File | null;
}): Promise<void> {
  const description = input.description.trim();
  if (!description) {
    throw new Error("La descripción es obligatoria");
  }

  let photo_path: string | null = null;
  if (input.photo) {
    const ext = input.photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
    const path = `${input.resourceId}/${input.reporterId}/${Date.now()}.${safeExt}`;

    const { error: uploadError } = await supabase.storage
      .from("incident-photos")
      .upload(path, input.photo, {
        cacheControl: "3600",
        upsert: false,
        contentType: input.photo.type || `image/${safeExt}`,
      });

    if (uploadError) {
      throw new Error(
        uploadError.message || "No se pudo subir la foto. Revisá el bucket y 04_permisos.",
      );
    }
    photo_path = path;
  }

  const { error: insertError } = await supabase.from("incidents").insert({
    resource_id: input.resourceId,
    reporter_id: input.reporterId,
    type: input.type,
    description,
    suggested_status: input.suggestedStatus || null,
    photo_path,
    status: "pendiente",
  });

  if (insertError) {
    throw new Error(insertError.message || "No se pudo registrar la incidencia");
  }

  const { error: historyError } = await supabase.from("resource_history").insert({
    resource_id: input.resourceId,
    user_id: input.reporterId,
    action: "incidencia_reportada",
    payload: {
      type: input.type,
      description,
      suggested_status: input.suggestedStatus || null,
      photo_path,
      status: "pendiente",
    },
  });

  if (historyError) {
    throw new Error(
      historyError.message ||
        "Incidencia creada pero falló el historial de la ficha",
    );
  }
}
