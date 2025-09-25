import { createClient } from "@/utils/supabase/server";
import { getAuthenticatedUser } from "./auth";

export const getTransactions = async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Supabase error fetching transactions:", error);
    throw new Error("Failed to fetch transactions", error);
  }

  if (!data) {
    return [];
  }
  return data;
};
