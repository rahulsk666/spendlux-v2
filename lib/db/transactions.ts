import { createClient } from "@/utils/supabase/server";
import { getAuthenticatedUser } from "../auth";
import {
  startOfDay,
  startOfMonth,
  startOfYear,
  addDays,
  addMonths,
  addYears,
} from "date-fns";
import { transactionType } from "../types";

export const getTransactions = async (
  currentPage: number = 1,
  limit: number = 10,
  groupBy: "daily" | "monthly" | "yearly" = "monthly"
): Promise<{
  transactions: transactionType[];
  totalIncome: number;
  totalExpense: number;
  safeToSpend: number;
  totalItems: number;
  error: string | null;
}> => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const fromIndex = (currentPage - 1) * limit;
  const toIndex = fromIndex + limit - 1;

  // 👇 Date range logic based on groupBy
  const now = new Date();
  let fromDate: Date;
  let toDate: Date;

  if (groupBy === "daily") {
    fromDate = startOfDay(now);
    toDate = addDays(fromDate, 1);
  } else if (groupBy === "monthly") {
    fromDate = startOfMonth(now);
    toDate = addMonths(fromDate, 1);
  } else {
    fromDate = startOfYear(now);
    toDate = addYears(fromDate, 1);
  }

  const { data, error, count } = await supabase
    .from("expenses")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .gte("created_at", fromDate.toISOString())
    .lt("created_at", toDate.toISOString())
    .order("created_at", { ascending: false })
    .range(fromIndex, toIndex);

  let totalIncome = 0;
  let totalExpense = 0;
  data?.map((transaction) => {
    transaction.amount = Math.abs(transaction.amount);
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  return {
    transactions: data || [],
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    safeToSpend: totalIncome - totalExpense,
    totalItems: count || 0,
    error: error ? error.message : null,
  };
};

export async function createTransaction(transaction: {
  title: string;
  description: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  user_id: string;
}) {
  const supabase = await createClient();

  const payload = {
    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    user_id: transaction.user_id,
    category_id: Number(transaction.category),
  };

  const { data, error } = await supabase
    .from("expenses")
    .insert([payload])
    .select()
    .single();

  return { data, error };
}
