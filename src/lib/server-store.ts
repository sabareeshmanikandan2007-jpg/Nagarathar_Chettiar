import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  passwordHash: string;
  salt: string;
};

type Store = {
  users: StoredUser[];
  progress: Record<string, unknown>;
};

const file = path.join(process.cwd(), "data", "store.json");

function secret() {
  return process.env.AUTH_SECRET || "nagarathar-kalyanam-local-secret";
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Store;
    return { users: parsed.users || [], progress: parsed.progress || {} };
  } catch {
    return { users: [], progress: {} };
  }
}

async function writeStore(store: Store) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store, null, 2), "utf8");
}

export function hashPassword(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function signSession(userId: string) {
  const sig = createHmac("sha256", secret()).update(userId).digest("hex");
  return `${userId}.${sig}`;
}

export function readSession(token: string | undefined) {
  if (!token) return null;
  const [userId, sig] = token.split(".");
  if (!userId || !sig) return null;
  const expected = createHmac("sha256", secret()).update(userId).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return userId;
}

export async function findUserByEmail(email: string) {
  const store = await readStore();
  return store.users.find((u) => u.email === email) || null;
}

export async function findUserById(id: string) {
  const store = await readStore();
  return store.users.find((u) => u.id === id) || null;
}

export async function createUser(input: { email: string; name: string; password: string }) {
  const store = await readStore();
  if (store.users.some((u) => u.email === input.email)) {
    throw new Error("This email is already registered. Please sign in.");
  }
  const salt = randomBytes(16).toString("hex");
  const user: StoredUser = {
    id: randomBytes(16).toString("hex"),
    email: input.email,
    name: input.name,
    createdAt: new Date().toISOString(),
    salt,
    passwordHash: hashPassword(input.password, salt),
  };
  store.users.push(user);
  await writeStore(store);
  return user;
}

export async function verifyPassword(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("No account found for this email.");
  const hash = hashPassword(password, user.salt);
  const a = Buffer.from(hash);
  const b = Buffer.from(user.passwordHash);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Incorrect password.");
  return user;
}

export async function getProgress(userId: string) {
  const store = await readStore();
  return store.progress[userId] ?? null;
}

export async function saveProgress(userId: string, progress: unknown) {
  const store = await readStore();
  store.progress[userId] = progress;
  await writeStore(store);
}

export function publicUser(user: StoredUser) {
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}
