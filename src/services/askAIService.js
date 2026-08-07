import { supabase } from "@/lib/supabase";

export async function askAI(data) {
  const { data: response, error } = await supabase.functions.invoke("ask-ai", {
    body: data,
  });

  if (error) throw error;

  return response.ai;
}