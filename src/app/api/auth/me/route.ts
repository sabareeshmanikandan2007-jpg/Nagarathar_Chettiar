import { NextResponse } from "next/server";
import { sessionUserId } from "@/lib/session-cookie";
import { findUserById, publicUser } from "@/lib/server-store";

export async function GET() {
  const id = await sessionUserId();
  if (!id) return NextResponse.json({ user: null });
  const user = await findUserById(id);
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: publicUser(user) });
}
