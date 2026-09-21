import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20" as any,
});

export async function POST(request: Request) {
  try {
    const { color } = await request.json();
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        color: color || "グリーン",
      },
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: `パクモフ 着ぐるみパジャマ (${color})`,
              description: "脱力系着ぐるみパジャマ 🪮",
            },
            unit_amount: 4980,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}
