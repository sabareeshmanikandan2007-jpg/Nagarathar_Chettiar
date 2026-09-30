import { cookies } from "next/headers";
import { readSession, signSession } from "@/lib/server-store";

const COOKIE = "nk_session";

export async function setSessionCookie(userId: string) {
  const jar = await cookies();
  jar.set(COOKIE, signSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function sessionUserId() {
  const jar = await cookies();
  return readSession(jar.get(COOKIE)?.value);
}
