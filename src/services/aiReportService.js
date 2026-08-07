import { supabase } from "@/lib/supabase";

export async function generateAIReport(reportData) {
  const { data, error } = await supabase.functions.invoke(
    "generate-ai-report",
    {
      body: reportData,
    }
  );

  if (error) throw error;

  return data.ai;
}