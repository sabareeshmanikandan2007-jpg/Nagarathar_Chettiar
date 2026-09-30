"use client";

import { useApp } from "@/lib/app-context";
import { VENDORS } from "@/lib/content";

export function VendorFields({ vendorId }: { vendorId: string }) {
  const vendor = VENDORS.find((v) => v.id === vendorId);
  const { progress, setVendorField, warnIfVendorIncomplete } = useApp();
  if (!vendor) return null;
  const values = progress.vendors[vendorId] || {};
  const keys = vendor.fields.map((f) => f.key);

  return (
    <section className="gold-border mt-6 rounded-2xl bg-white/50 p-4">
      <h3 className="font-[family-name:var(--font-display)] text-lg text-[#a51c30]">{vendor.title}</h3>
      <p className="mt-1 text-sm text-[#5c4e42]">{vendor.description}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {vendor.fields.map((field) => (
          <label key={field.key} className="block text-sm">
            <span className="text-[#5c4e42]">{field.label}</span>
            <input
              value={values[field.key] || ""}
              placeholder={field.placeholder}
              onChange={(e) => setVendorField(vendorId, field.key, e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#c9a227]/70 bg-[#f6efd9] px-3 py-2"
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 text-sm text-[#a51c30] underline"
        onClick={() => warnIfVendorIncomplete(vendorId, vendor.title, keys)}
      >
        Check if this box is complete
      </button>
    </section>
  );
}
