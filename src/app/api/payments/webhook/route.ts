import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const signature = req.headers.get("x-razorpay-signature") || "";
  const rawBody = await req.text();
  const h = createHmac("sha256", secret).update(rawBody).digest("hex");
  const ok = signature && timingSafeEqual(Buffer.from(h), Buffer.from(signature));
  if (!ok) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  let data: any;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const event = data?.event;
  const payment = data?.payload?.payment?.entity;
  const orderEntity = data?.payload?.order?.entity;
  const orderId = payment?.order_id || orderEntity?.id || data?.order_id || null;
  const paymentId = payment?.id || null;
  let status = "created";
  if (payment?.status === "captured" || event === "payment.captured") status = "paid";
  else if (payment?.status === "failed" || event === "payment.failed") status = "failed";
  try {
    if (orderId) {
      const supabase = getSupabaseAdmin();
      await supabase
        .from("orders")
        .update({ status, razorpay_payment_id: paymentId, raw_event: data, updated_at: new Date().toISOString() })
        .eq("razorpay_order_id", orderId);
    }
  } catch {}
  return NextResponse.json({ ok: true });
}
