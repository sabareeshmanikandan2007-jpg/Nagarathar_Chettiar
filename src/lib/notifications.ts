export async function ensureNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

export async function showDeviceNotification(title: string, body: string) {
  if (typeof window === "undefined") return;
  const perm = "Notification" in window ? Notification.permission : "denied";
  const payload = { title, body, icon: "/icon.svg" };

  if (perm === "granted" && navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "SHOW_NOTIFICATION", ...payload });
    return;
  }
  if (perm === "granted") {
    try {
      new Notification(title, { body, icon: "/icon.svg" });
      return;
    } catch {
      /* ignore */
    }
  }

  const sw = await navigator.serviceWorker?.ready.catch(() => null);
  if (perm === "granted" && sw) {
    sw.showNotification(title, { body, icon: "/icon.svg" });
  }
}
