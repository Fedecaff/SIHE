import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types/sihe";
import { supabase } from "@/lib/supabase";
import {
  fetchOwnProfile,
  loginWithPassword,
  logoutSession,
} from "@/services/resources";

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberSession?: boolean,
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void supabase.auth.getSession().then(async ({ data }) => {
      try {
        const sessionUser = data.session?.user;
        if (!sessionUser) {
          if (!cancelled) setUser(null);
          return;
        }
        const profile = await fetchOwnProfile(sessionUser.id);
        if (!cancelled) setUser(profile);
      } catch (err) {
        console.error("Error al cargar perfil inicial:", err);
        await supabase.auth.signOut();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        return;
      }
      void fetchOwnProfile(session.user.id)
        .then(setUser)
        .catch(async (err) => {
          console.error("Error al cargar perfil en cambio de sesión:", err);
          await supabase.auth.signOut();
          setUser(null);
        });
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string, rememberSession = false) => {
      const profile = await loginWithPassword(
        email,
        password,
        rememberSession,
      );
      setUser(profile);
      return profile;
    },
    [],
  );

  const logout = useCallback(async () => {
    await logoutSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
