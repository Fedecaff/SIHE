import { createClient } from "@supabase/supabase-js";
import { AUTH_STORAGE_KEY, authStorage } from "@/lib/authSession";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env",
  );
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: authStorage,
    storageKey: AUTH_STORAGE_KEY,
  },
});
