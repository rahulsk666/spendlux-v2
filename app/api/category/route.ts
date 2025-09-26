import { NextResponse } from "next/server";
import { getCategory } from "@/lib/db/category";

export async function GET() {
  const { data, error } = await getCategory();
  if (!data) {
    return NextResponse.json({ error: "No categories found" }, { status: 404 });
  }
  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
