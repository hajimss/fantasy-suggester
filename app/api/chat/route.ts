import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const DAILY_LIMIT = 2;

export async function POST(req: NextRequest) {
  const { userId } = await auth(); // Clerk user ID
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch usage
  const { data: usage } = await supabase
    .from("api_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Check if limit exceeded
  if (usage && usage.call_count >= DAILY_LIMIT) {
    return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
  }

  // Increment usage
  if (usage) {
    await supabase
      .from("api_usage")
      .update({ call_count: usage.call_count + 1 })
      .eq("user_id", userId);
  } else {
    await supabase.from("api_usage").insert({ user_id: userId, call_count: 1 });
  }
const { messages } = await req.json();
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_API_MODEL!, // to point to the specific model between production and development using the environment variable
    messages,
  });

  return NextResponse.json(completion.choices[0].message);
}