import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { getURL } from "@/lib/helpers";
import { createOrRetrieveCustomer } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    });

    if (!customer) {
      return new NextResponse("Customer not found.", { status: 404 });
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.log("[CREATE_PORTAL_LINK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
