import { supabase } from "@/lib/supabase";

export async function getTransactions(userId) {
  return await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false });
}

export async function addTransaction(transaction) {
  console.log("Sending to Supabase:", transaction);

  return await supabase
    .from("transactions")
    .insert(transaction)
    .select()
    .single();
}

export async function updateTransaction(id, updates) {
  return await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteTransaction(id) {
  return await supabase
    .from("transactions")
    .delete()
    .eq("id", id);
}