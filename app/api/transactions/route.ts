import { getAuthenticatedUser } from "@/lib/auth";
import { createTransaction, getTransactions } from "@/lib/db/transactions";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validating request body
const transactionSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(50),
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(1).max(1000000),
  type: z.enum(["expense", "income"]),
});

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  const { searchParams } = request.nextUrl;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const groupBy =
    (searchParams.get("groupBy") as "daily" | "monthly" | "yearly") || "monthly";

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { transactions, totalItems, error } = await getTransactions(
    page,
    limit,
    groupBy
  );

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ transactions, totalItems }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = transactionSchema.parse(body);

    const { data, error } = await createTransaction({
      ...parsed,
      user_id: user.id,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Transaction created", data },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
