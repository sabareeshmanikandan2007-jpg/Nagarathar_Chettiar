"use client";

import { AppProvider } from "@/lib/app-context";
import { AlertModal } from "@/components/AlertModal";
import { AppEffects } from "@/components/AppEffects";
import { Meyyappan } from "@/components/Meyyappan";
import { SiteHeader } from "@/components/SiteHeader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppEffects />
      <SiteHeader />
      {children}
      <Meyyappan />
      <AlertModal />
    </AppProvider>
  );
}
