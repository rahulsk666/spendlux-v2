import { createClient } from "@/utils/supabase/server";
import { getAuthenticatedUser } from "../auth";

export async function getCategory() {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase.from("categories").select("*").eq("user_id", user.id);

  if (error) {
    return { error: error.message, data: null };
  }

  return { data, error: null };
}
