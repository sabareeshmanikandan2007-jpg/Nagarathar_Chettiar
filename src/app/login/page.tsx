"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { ensureNotificationPermission } from "@/lib/notifications";

export default function LoginPage() {
  const { user, login, register, googleLogin, logout } = useApp();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register" | "google">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "google") await googleLogin(email, password, name);
      else if (mode === "register") await register(name, email, password);
      else await login(email, password);
      await ensureNotificationPermission();
      router.push("/checklist");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    }
  }

  if (user) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#a51c30]">Signed in</h1>
        <p className="mt-3">
          {user.name} · {user.email}
        </p>
        <p className="mt-2 text-sm text-[#5c4e42]">
          Your ticks and vendor notes are saved to this account on the site. Add the app to your Home Screen so skip
          and leave reminders can appear on this phone, tablet, or laptop.
        </p>
        <button type="button" className="mt-6 rounded-full bg-[#a51c30] px-6 py-2 text-[#f6efd9]" onClick={logout}>
          Sign out
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#a51c30]">Login</h1>
      <p className="mt-2 text-sm text-[#5c4e42]">
        Sign in with your Google Mail ID and password, or any email. Your checklist is stored with that account.
      </p>
      <div className="mt-4 flex gap-2 text-sm">
        <button type="button" onClick={() => setMode("login")} className={mode === "login" ? "text-[#a51c30]" : ""}>
          Email
        </button>
        <button type="button" onClick={() => setMode("register")} className={mode === "register" ? "text-[#a51c30]" : ""}>
          Create account
        </button>
        <button type="button" onClick={() => setMode("google")} className={mode === "google" ? "text-[#a51c30]" : ""}>
          Google Mail
        </button>
      </div>
      <form onSubmit={onSubmit} className="gold-border mt-6 space-y-3 rounded-2xl bg-white/70 p-5">
        {(mode === "register" || mode === "google") && (
          <label className="block text-sm">
            Name
            <input className="mt-1 w-full rounded-xl border border-[#c9a227] px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label className="block text-sm">
          {mode === "google" ? "Gmail address" : "Email"}
          <input
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-[#c9a227] px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={mode === "google" ? "you@gmail.com" : "family@gmail.com"}
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-xl border border-[#c9a227] px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-sm text-[#a51c30]">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-[#a51c30] py-2 font-semibold text-[#f6efd9]">
          {mode === "google" ? "Continue with Google Mail" : mode === "register" ? "Create account" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
