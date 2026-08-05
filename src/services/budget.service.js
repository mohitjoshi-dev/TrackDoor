import { supabase } from "@/lib/supabase";

export async function getBudgets(userId) {
  return await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
}

export async function addBudget(budget) {
  return await supabase
    .from("budgets")
    .insert(budget)
    .select()
    .single();
}

export async function updateBudget(id, updates) {
  return await supabase
    .from("budgets")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteBudget(id) {
  return await supabase
    .from("budgets")
    .delete()
    .eq("id", id);
}