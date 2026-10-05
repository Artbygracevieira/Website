import { NextResponse } from "next/server";

// TODO: send these messages to Grace's inbox (for example with Resend or Formspree)
// once she picks an email address. For now the form reports that it isn't connected.

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.email || !data?.message) {
    return NextResponse.json({ message: "Please fill in your email and a message." }, { status: 400 });
  }
  return NextResponse.json(
    { message: "The contact form isn't connected yet. Please reach Grace on Instagram for now." },
    { status: 503 }
  );
}
