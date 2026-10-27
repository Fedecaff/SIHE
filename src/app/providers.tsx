import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
import { AuthContext } from "@/app/useAuth";
import { ToastContext } from "@/app/useToast";

type ToastItem = {
  id: number;
  text: string;
};

const TOAST_MS = 4000;

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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const showToast = useCallback((text: string) => {
    const id = nextId.current;
    nextId.current += 1;
    setItems((current) => [...current, { id, text }]);
    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id));
    }, TOAST_MS);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {items.length > 0 ? (
        <div className="app-toasts" aria-live="polite">
          {items.map((item) => (
            <p key={item.id} className="app-toast" role="status">
              {item.text}
            </p>
          ))}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}
