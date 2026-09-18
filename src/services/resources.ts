import type {
  AuthUser,
  ResourceMapItem,
  ResourceStatus,
  ResourceType,
  UserRole,
} from "@/types/sihe";
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
        "Sin permiso para leer perfiles. Ejecutá el SQL de grants en Supabase.",
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
    throw new Error("Cuenta inactiva. Contacte al administrador.");
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
): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error || !data.user) {
    throw new Error(
      error?.message === "Invalid login credentials"
        ? "Email o contraseña incorrectos"
        : error?.message || "No se pudo iniciar sesión",
    );
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
      "id, type, name, address, status, accessibility, capacity, observations, lat, lng",
    )
    .order("name");

  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message || "No se pudo cargar el mapa");
  }

  return (data ?? []) as ResourceMapItem[];
}
