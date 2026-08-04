import { supabase } from "@/lib/supabase";

export async function createProfile(profile) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  return { data, error };
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
}