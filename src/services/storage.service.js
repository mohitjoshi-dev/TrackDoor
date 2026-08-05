import { supabase } from "@/lib/supabase";

export async function uploadAvatar(userId, file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    return { data: null, error: uploadError };
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return {
    data: publicUrl,
    error: null,
  };
}