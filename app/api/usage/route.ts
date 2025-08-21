import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const DAILY_LIMIT = 2;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: usage } = await supabase
    .from("api_usage")
    .select("call_count")
    .eq("user_id", userId)
    .single();

  const callCount = usage?.call_count ?? 0;
  return NextResponse.json({ callCount, suggestionsLeft: DAILY_LIMIT - callCount });
}