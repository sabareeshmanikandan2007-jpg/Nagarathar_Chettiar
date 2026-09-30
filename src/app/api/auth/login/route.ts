import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session-cookie";
import { publicUser, verifyPassword } from "@/lib/server-store";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  if (!email.includes("@") || password.length < 6) {
    return NextResponse.json({ error: "Enter your email and a password of at least 6 characters." }, { status: 400 });
  }
  try {
    const user = await verifyPassword(email, password);
    await setSessionCookie(user.id);
    return NextResponse.json({ user: publicUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not sign in.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
