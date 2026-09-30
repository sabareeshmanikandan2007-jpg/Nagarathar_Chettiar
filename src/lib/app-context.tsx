"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  continueWithGoogleEmail,
  currentSession,
  fetchRemoteProgress,
  loginWithEmail,
  logout as logoutSession,
  registerWithEmail,
  saveRemoteProgress,
  type UserAccount,
} from "@/lib/auth";
import { checklistFor, type HouseId } from "@/lib/content";
import { showDeviceNotification } from "@/lib/notifications";

export type ItemStatus = "open" | "done" | "skipped";

export type VendorValues = Record<string, Record<string, string>>;

export type Progress = {
  house: HouseId | null;
  items: Record<string, ItemStatus>;
  vendors: VendorValues;
};

type AlertState = {
  title: string;
  body: string;
} | null;

type AppState = {
  user: UserAccount | null;
  ready: boolean;
  progress: Progress;
  alert: AlertState;
  setHouse: (house: HouseId) => void;
  setItemStatus: (id: string, status: ItemStatus, label?: string) => void;
  setVendorField: (vendorId: string, key: string, value: string) => void;
  vendorComplete: (vendorId: string, requiredKeys: string[]) => boolean;
  warnIfVendorIncomplete: (vendorId: string, title: string, requiredKeys: string[]) => boolean;
  dismissAlert: () => void;
  showAlert: (title: string, body: string, notify?: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  openCount: (house?: HouseId | null) => number;
  nextOpenItem: (house: HouseId) => { id: string; label: string } | null;
};

const AppContext = createContext<AppState | null>(null);

const emptyProgress = (): Progress => ({ house: null, items: {}, vendors: {} });

function storageKey(userId: string | null) {
  return userId ? `nagarathar_progress_${userId}` : "nagarathar_progress_guest";
}

function loadProgress(userId: string | null): Progress {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return emptyProgress();
    return { ...emptyProgress(), ...JSON.parse(raw) } as Progress;
  } catch {
    return emptyProgress();
  }
}

function saveProgress(userId: string | null, progress: Progress) {
  localStorage.setItem(storageKey(userId), JSON.stringify(progress));
}

function isProgress(value: unknown): value is Progress {
  if (!value || typeof value !== "object") return false;
  const row = value as Progress;
  return row.items !== undefined && row.vendors !== undefined;
}

function mergeProgress(remote: Progress | null, guest: Progress): Progress {
  if (!remote) return guest;
  return {
    house: remote.house || guest.house,
    items: { ...guest.items, ...remote.items },
    vendors: { ...guest.vendors, ...remote.vendors },
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await currentSession();
      if (cancelled) return;
      if (session) {
        const remoteRaw = await fetchRemoteProgress();
        const remote = isProgress(remoteRaw) ? remoteRaw : null;
        const merged = mergeProgress(remote, loadProgress(null));
        setUser(session);
        setProgress(merged);
        if (!remote?.house && (merged.house || Object.keys(merged.items).length)) {
          await saveRemoteProgress(merged);
        }
      } else {
        setUser(null);
        setProgress(loadProgress(null));
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      saveProgress(null, progress);
      return;
    }
    const timer = window.setTimeout(() => {
      void saveRemoteProgress(progress);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [progress, user, ready]);

  const showAlert = useCallback((title: string, body: string, notify = true) => {
    setAlert({ title, body });
    if (notify) void showDeviceNotification(title, body);
  }, []);

  const setHouse = useCallback((house: HouseId) => {
    setProgress((p) => ({ ...p, house }));
  }, []);

  const setItemStatus = useCallback(
    (id: string, status: ItemStatus, label?: string) => {
      setProgress((p) => {
        const next: Progress = { ...p, items: { ...p.items, [id]: status } };
        if (status === "skipped") {
          const text = label || "This wedding task";
          queueMicrotask(() =>
            showAlert(
              "Skipped for now",
              `${text} was skipped. Meyyappan will keep it on your list. Complete it before muhurtham if your family still needs it.`,
              true,
            ),
          );
        } else if (status === "done" && p.house) {
          const upcoming = checklistFor(p.house)
            .filter((item) => item.id !== id && next.items[item.id] !== "done")
            .slice(0, 3);
          if (upcoming.length) {
            queueMicrotask(() =>
              showAlert(
                "Next you can plan",
                upcoming.map((item, index) => `${index + 1}. ${item.label}`).join(" "),
                false,
              ),
            );
          }
        }
        return next;
      });
    },
    [showAlert],
  );

  const setVendorField = useCallback((vendorId: string, key: string, value: string) => {
    setProgress((p) => ({
      ...p,
      vendors: {
        ...p.vendors,
        [vendorId]: { ...(p.vendors[vendorId] || {}), [key]: value },
      },
    }));
  }, []);

  const vendorComplete = useCallback(
    (vendorId: string, requiredKeys: string[]) => {
      const box = progress.vendors[vendorId] || {};
      return requiredKeys.every((k) => (box[k] || "").trim().length > 0);
    },
    [progress.vendors],
  );

  const warnIfVendorIncomplete = useCallback(
    (vendorId: string, title: string, requiredKeys: string[]) => {
      if (vendorComplete(vendorId, requiredKeys)) return false;
      showAlert(
        "Details still empty",
        `${title} is not filled yet. Add the names and booking notes so this work does not slip.`,
        true,
      );
      return true;
    },
    [showAlert, vendorComplete],
  );

  const applyUser = async (next: UserAccount) => {
    const guest = loadProgress(null);
    const remoteRaw = await fetchRemoteProgress();
    const remote = isProgress(remoteRaw) ? remoteRaw : null;
    const merged = mergeProgress(remote, guest.house || Object.keys(guest.items).length ? guest : progress);
    setUser(next);
    setProgress(merged);
    await saveRemoteProgress(merged);
    localStorage.removeItem(storageKey(null));
  };

  const value = useMemo<AppState>(
    () => ({
      user,
      ready,
      progress,
      alert,
      setHouse,
      setItemStatus,
      setVendorField,
      vendorComplete,
      warnIfVendorIncomplete,
      dismissAlert: () => setAlert(null),
      showAlert,
      login: async (email, password) => applyUser(await loginWithEmail(email, password)),
      register: async (name, email, password) => applyUser(await registerWithEmail(name, email, password)),
      googleLogin: async (email, password, name) => applyUser(await continueWithGoogleEmail(email, password, name)),
      logout: () => {
        void logoutSession();
        setUser(null);
        setProgress(emptyProgress());
      },
      openCount: (house) => {
        const h = house ?? progress.house;
        if (!h) return 0;
        return checklistFor(h).filter((i) => progress.items[i.id] !== "done").length;
      },
      nextOpenItem: (house) => {
        const item = checklistFor(house).find((i) => {
          const s = progress.items[i.id];
          return s !== "done";
        });
        return item ? { id: item.id, label: item.label } : null;
      },
    }),
    [
      user,
      ready,
      progress,
      alert,
      setHouse,
      setItemStatus,
      setVendorField,
      vendorComplete,
      warnIfVendorIncomplete,
      showAlert,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
