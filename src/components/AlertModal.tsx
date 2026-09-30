"use client";

import { useApp } from "@/lib/app-context";

export function AlertModal() {
  const { alert, dismissAlert } = useApp();
  if (!alert) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="gold-border w-full max-w-md rounded-2xl bg-[#f6efd9] p-5 shadow-2xl">
        <p className="font-[family-name:var(--font-display)] text-xl text-[#a51c30]">{alert.title}</p>
        <p className="mt-2 text-sm leading-6 text-[#1c1410]">{alert.body}</p>
        <button
          type="button"
          className="mt-4 w-full rounded-full bg-[#a51c30] px-4 py-2 text-sm font-semibold text-[#f6efd9]"
          onClick={dismissAlert}
        >
          Understood
        </button>
      </div>
    </div>
  );
}
