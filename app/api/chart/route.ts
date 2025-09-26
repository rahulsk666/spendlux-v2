// import { getUserFiles } from "@/lib/db/files";
import { getAuthenticatedUser } from "@/lib/auth";
import { getTransactions } from "@/lib/db/transactions";
import { NextRequest, NextResponse } from "next/server";

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
