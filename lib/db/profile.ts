import { createClient } from "@/utils/supabase/server";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser(userId);

  if (error) {
    return { error: error.message, data: null };
  }

  return { data, error: null };
}
