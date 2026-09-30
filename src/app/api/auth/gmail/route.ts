import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session-cookie";
import { createUser, findUserByEmail, publicUser, verifyPassword } from "@/lib/server-store";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; password?: string };
  try {
    body = (await request.json()) as { name?: string; email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  if (!email.endsWith("@gmail.com") && !email.endsWith("@googlemail.com")) {
    return NextResponse.json({ error: "Please use a Google Mail (Gmail) address." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  try {
    const existing = await findUserByEmail(email);
    const user = existing
      ? await verifyPassword(email, password)
      : await createUser({ email, name: (body.name || "").trim() || email.split("@")[0], password });
    await setSessionCookie(user.id);
    return NextResponse.json({ user: publicUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not continue with Gmail.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
