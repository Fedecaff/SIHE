import type {

  AuthUser,

  ProfileAdmin,

  ResourceDetail,

  ResourceHistoryItem,

  ResourceIncidentItem,

  ResourceMapItem,

  ResourceStatus,

  ResourceType,

  UserRole,

} from "@/types/sihe";

import {
  LOGIN_ERROR_INACTIVE,
  loginErrorFromAuth,
  setRememberSession,
} from "@/lib/authSession";
import { supabase } from "@/lib/supabase";

type ProfileRow = {

  id: string;

  email: string;

  name: string;

  institution: string;

  app_role: UserRole;

  active: boolean;

};

export async function fetchOwnProfile(userId: string): Promise<AuthUser> {

  const { data, error } = await supabase

    .from("profiles")

    .select("id, email, name, institution, app_role, active")

    .eq("id", userId)

    .maybeSingle();

  if (error) {

    const msg = error.message || "No se pudo leer el perfil";

    if (/permission denied|42501/i.test(msg)) {

      throw new Error(

        "Sin permiso para leer perfiles. EjecutÃ¡ el SQL de grants en Supabase.",

      );

    }

    throw new Error(msg);

  }

  if (!data) {

    throw new Error(

      "Perfil no encontrado para este usuario. En Supabase Auth debe existir una fila en profiles con el mismo id.",

    );

  }

  const profile = data as ProfileRow;

  if (!profile.active) {

    throw new Error(LOGIN_ERROR_INACTIVE);

  }

  return {

    id: profile.id,

    email: profile.email,

    name: profile.name,

    institution: profile.institution,

    role: profile.app_role,

  };

}

export async function loginWithPassword(

  email: string,

  password: string,

  rememberSession = false,

): Promise<AuthUser> {

  setRememberSession(rememberSession);

  const { data, error } = await supabase.auth.signInWithPassword({

    email: email.trim(),

    password,

  });

  if (error || !data.user) {

    throw new Error(loginErrorFromAuth(error?.message));

  }

  try {

    return await fetchOwnProfile(data.user.id);

  } catch (profileError) {

    await supabase.auth.signOut();

    throw profileError;

  }

}

export async function logoutSession(): Promise<void> {

  await supabase.auth.signOut();

}

export async function fetchResourcesMap(filters?: {
  type?: ResourceType;
  status?: ResourceStatus;
}): Promise<ResourceMapItem[]> {
  let query = supabase
    .from("resources_map")
    .select(
      "id, type, name, address, status, accessibility, capacity, observations, last_verified_at, last_verified_by_id, lat, lng",
    )
    .order("name");

  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message || "No se pudieron cargar los recursos");
  }

  return (data ?? []) as ResourceMapItem[];
}

export async function fetchResourceDetail(

  id: string,

): Promise<ResourceDetail> {

  const { data, error } = await supabase

    .from("resources_map")

    .select(

      "id, type, name, address, status, accessibility, capacity, observations, last_verified_at, last_verified_by_id, lat, lng",

    )

    .eq("id", id)

    .maybeSingle();

  if (error) {

    throw new Error(error.message || "No se pudo cargar la ficha");

  }

  if (!data) {

    throw new Error("Recurso no encontrado");

  }

  const item = data as ResourceMapItem;

  let verifier_name: string | null = null;

  if (item.last_verified_by_id) {

    const { data: verifier } = await supabase

      .from("profiles")

      .select("name")

      .eq("id", item.last_verified_by_id)

      .maybeSingle();

    verifier_name = (verifier as { name: string } | null)?.name ?? null;

  }

  return { ...item, verifier_name };

}

export async function fetchResourceHistory(

  resourceId: string,

): Promise<ResourceHistoryItem[]> {

  const { data, error } = await supabase

    .from("resource_history")

    .select("id, action, payload, created_at, user_id")

    .eq("resource_id", resourceId)

    .order("created_at", { ascending: false })

    .limit(30);

  if (error) {

    throw new Error(error.message || "No se pudo cargar el historial");

  }

  const rows = (data ?? []) as {

    id: string;

    action: string;

    payload: Record<string, unknown>;

    created_at: string;

    user_id: string;

  }[];

  const userIds = [...new Set(rows.map((r) => r.user_id))];

  const nameById = new Map<string, string>();

  if (userIds.length > 0) {

    const { data: profiles } = await supabase

      .from("profiles")

      .select("id, name")

      .in("id", userIds);

    for (const p of (profiles ?? []) as { id: string; name: string }[]) {

      nameById.set(p.id, p.name);

    }

  }

  return rows.map((r) => ({

    id: r.id,

    action: r.action,

    payload: r.payload ?? {},

    created_at: r.created_at,

    user_name: nameById.get(r.user_id) ?? null,

  }));

}

export async function fetchResourcePendingIncidents(

  resourceId: string,

): Promise<ResourceIncidentItem[]> {

  const { data, error } = await supabase

    .from("incidents")

    .select(

      "id, type, description, suggested_status, status, created_at, reporter_id",

    )

    .eq("resource_id", resourceId)

    .eq("status", "pendiente")

    .order("created_at", { ascending: false });

  if (error) {

    throw new Error(error.message || "No se pudieron cargar las incidencias");

  }

  const rows = (data ?? []) as {

    id: string;

    type: ResourceIncidentItem["type"];

    description: string;

    suggested_status: ResourceStatus | null;

    status: ResourceIncidentItem["status"];

    created_at: string;

    reporter_id: string;

  }[];

  const reporterIds = [...new Set(rows.map((r) => r.reporter_id))];

  const nameById = new Map<string, string>();

  if (reporterIds.length > 0) {

    const { data: profiles } = await supabase

      .from("profiles")

      .select("id, name")

      .in("id", reporterIds);

    for (const p of (profiles ?? []) as { id: string; name: string }[]) {

      nameById.set(p.id, p.name);

    }

  }

  return rows.map((r) => ({

    id: r.id,

    type: r.type,

    description: r.description,

    suggested_status: r.suggested_status,

    status: r.status,

    created_at: r.created_at,

    reporter_name: nameById.get(r.reporter_id) ?? null,

  }));

}

export async function updateResourceSheet(input: {

  resourceId: string;

  userId: string;

  status: ResourceStatus;

  observations: string;

}): Promise<void> {

  const now = new Date().toISOString();

  const observations = input.observations.trim() || null;

  const { error: updateError } = await supabase

    .from("resources")

    .update({

      status: input.status,

      observations,

      last_verified_at: now,

      last_verified_by_id: input.userId,

    })

    .eq("id", input.resourceId);

  if (updateError) {

    throw new Error(updateError.message || "No se pudo actualizar la ficha");

  }

  const { error: historyError } = await supabase

    .from("resource_history")

    .insert({

      resource_id: input.resourceId,

      user_id: input.userId,

      action: "actualizacion_ficha",

      payload: {

        status: input.status,

        observations,

        last_verified_at: now,

      },

    });

  if (historyError) {

    throw new Error(

      historyError.message || "Ficha actualizada pero fallÃ³ el historial",

    );

  }

}

export async function countPendingIncidents(): Promise<number> {

  const { count, error } = await supabase

    .from("incidents")

    .select("id", { count: "exact", head: true })

    .eq("status", "pendiente");

  if (error) {

    throw new Error(error.message || "No se pudieron contar incidencias");

  }

  return count ?? 0;

}

export async function listProfiles(): Promise<ProfileAdmin[]> {

  const { data, error } = await supabase

    .from("profiles")

    .select("id, email, name, institution, app_role, active, created_at")

    .order("name");

  if (error) {

    throw new Error(error.message || "No se pudieron cargar los usuarios");

  }

  return (data ?? []) as ProfileAdmin[];

}

export async function updateProfileAdmin(input: {

  id: string;

  name: string;

  institution: string;

  app_role: UserRole;

  active: boolean;

}): Promise<void> {

  const { error } = await supabase

    .from("profiles")

    .update({

      name: input.name.trim(),

      institution: input.institution.trim(),

      app_role: input.app_role,

      active: input.active,

    })

    .eq("id", input.id);

  if (error) {

    throw new Error(error.message || "No se pudo actualizar el usuario");

  }

}

export async function createUserAccount(input: {

  email: string;

  password: string;

  name: string;

  institution: string;

  role: UserRole;

}): Promise<void> {

  const { data: sessionData } = await supabase.auth.getSession();

  const adminSession = sessionData.session;

  if (!adminSession) {

    throw new Error("SesiÃ³n de administrador no vÃ¡lida");

  }

  const { data, error } = await supabase.auth.signUp({

    email: input.email.trim(),

    password: input.password,

    options: {

      data: {

        name: input.name.trim(),

        institution: input.institution.trim(),

        app_role: input.role,

      },

    },

  });

  if (error) {

    throw new Error(

      /signups not allowed|not allowed/i.test(error.message)

        ? "Supabase bloquea altas desde el cliente. ActivÃ¡ â€œAllow new usersâ€ en Auth (sin registro pÃºblico en la app) o creÃ¡ el usuario en Auth y su perfil."

        : error.message || "No se pudo crear el usuario",

    );

  }

  const { error: restoreError } = await supabase.auth.setSession({

    access_token: adminSession.access_token,

    refresh_token: adminSession.refresh_token,

  });

  if (restoreError) {

    throw new Error(

      "Usuario creado, pero se perdiÃ³ la sesiÃ³n de admin. VolvÃ© a iniciar sesiÃ³n.",

    );

  }

  if (data.user) {

    const { error: profileError } = await supabase.from("profiles").upsert({

      id: data.user.id,

      email: input.email.trim(),

      name: input.name.trim(),

      institution: input.institution.trim(),

      app_role: input.role,

      active: true,

    });

    if (profileError) {

      throw new Error(

        profileError.message ||

          "Usuario en Auth creado, pero falló el perfil. Revisá 09_seguridad_altas.sql",

      );

    }

  }

}

