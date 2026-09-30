export type UserAccount = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

async function parseUser(res: Response): Promise<UserAccount> {
  const data = (await res.json()) as { user?: UserAccount; error?: string };
  if (!res.ok || !data.user) throw new Error(data.error || "Could not sign in.");
  return data.user;
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<UserAccount> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return parseUser(res);
}

export async function loginWithEmail(email: string, password: string): Promise<UserAccount> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseUser(res);
}

export async function continueWithGoogleEmail(email: string, password: string, name?: string): Promise<UserAccount> {
  const res = await fetch("/api/auth/gmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return parseUser(res);
}

export async function currentSession(): Promise<UserAccount | null> {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const data = (await res.json()) as { user: UserAccount | null };
  return data.user;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function fetchRemoteProgress(): Promise<unknown | null> {
  const res = await fetch("/api/progress");
  if (!res.ok) return null;
  const data = (await res.json()) as { progress: unknown | null };
  return data.progress;
}

export async function saveRemoteProgress(progress: unknown) {
  await fetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress }),
  });
}
