import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const amountMajor = Number(body?.amount || 0);
  const currency = (body?.currency || "INR").toString();
  if (!amountMajor || amountMajor <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  const receipt = (body?.receipt || crypto.randomUUID()).toString();
  const notes = body?.notes || {};
  const amount = Math.round(amountMajor * 100);
  const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount, currency, receipt, notes })
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
  const order = await res.json();
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("orders").insert([
      {
        id: crypto.randomUUID(),
        razorpay_order_id: order.id,
        amount: amountMajor,
        currency,
        status: order.status || "created",
        receipt,
        customer_email: body?.email || null,
        created_at: new Date().toISOString()
      }
    ]);
  } catch {}
  return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: keyId });
}
