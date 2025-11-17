import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim();
  const message = (body?.message ?? "").toString().trim();
  const company = (body?.company ?? "").toString().trim();
  const source = (body?.source ?? "web").toString().trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("bookings").insert([
      { id, name, email, message, company, source, created_at: createdAt }
    ]);
    if (error) {
      return NextResponse.json({ error: "Failed to save booking." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id });
  } catch (_) {
    return NextResponse.json({ error: "Failed to save booking." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
