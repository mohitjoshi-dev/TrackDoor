import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getProfile, createProfile } from "@/services/profile.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(user) {
  if (!user) {
    setProfile(null);
    return;
  }

  const { data } = await getProfile(user.id);

  if (data) {
    setProfile(data);
    return;
  }

  const { data: newProfile, error } = await createProfile({
    id: user.id,
    full_name:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "",
    avatar_url: null,
  });

  if (!error) {
    setProfile(newProfile);
  }
}

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await loadProfile(currentUser);
      setLoading(false);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await loadProfile(currentUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}