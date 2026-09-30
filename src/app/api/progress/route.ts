import { NextResponse } from "next/server";
import { sessionUserId } from "@/lib/session-cookie";
import { getProgress, saveProgress } from "@/lib/server-store";

export async function GET() {
  const id = await sessionUserId();
  if (!id) return NextResponse.json({ error: "Sign in to load your checklist." }, { status: 401 });
  const progress = await getProgress(id);
  return NextResponse.json({ progress });
}

export async function PUT(request: Request) {
  const id = await sessionUserId();
  if (!id) return NextResponse.json({ error: "Sign in to save your checklist." }, { status: 401 });
  const body = (await request.json()) as { progress?: unknown };
  if (!body.progress || typeof body.progress !== "object") {
    return NextResponse.json({ error: "Missing progress." }, { status: 400 });
  }
  await saveProgress(id, body.progress);
  return NextResponse.json({ ok: true });
}
