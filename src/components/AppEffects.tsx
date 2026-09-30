"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/app-context";
import { ensureNotificationPermission, registerServiceWorker, showDeviceNotification } from "@/lib/notifications";

export function AppEffects() {
  const { progress, openCount, user } = useApp();

  useEffect(() => {
    void registerServiceWorker();
  }, []);

  useEffect(() => {
    if (user) void ensureNotificationPermission();
  }, [user]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      const house = progress.house;
      const n = openCount(house);
      if (!n) return;
      void showDeviceNotification(
        "Nagarathar Kalyanam",
        `Your checklist is waiting — ${n} item(s) still open. Meyyappan is ready when you return.`,
      );
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      const n = openCount(progress.house);
      if (!n) return;
      e.preventDefault();
      e.returnValue = "";
      void showDeviceNotification(
        "Nagarathar Kalyanam",
        `You closed the wedding guide with ${n} open task(s). Open Nagarathar Kalyanam to continue.`,
      );
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [openCount, progress.house]);

  return null;
}
