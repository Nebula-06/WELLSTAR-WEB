import { useSyncExternalStore } from "react";
import { CLINIC_HOURS } from "@/data/site";

export type OpenStatus = {
  open: boolean;
  /** e.g. "Open now · closes 10 PM" or "Closed · opens 8 AM tomorrow" */
  label: string;
  /** 0 = Sunday … 6 = Saturday, in clinic time (IST) */
  today: number;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatClock(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Current day/time in Asia/Kolkata, regardless of the visitor's own time zone. */
function clinicNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: WEEKDAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function getOpenStatus(): OpenStatus {
  const { day, minutes } = clinicNow();
  const today = CLINIC_HOURS[day];
  if (minutes >= today.open && minutes < today.close) {
    return { open: true, today: day, label: `Open now · closes ${formatClock(today.close)}` };
  }
  if (minutes < today.open) {
    return { open: false, today: day, label: `Closed · opens ${formatClock(today.open)}` };
  }
  const nextDay = (day + 1) % 7;
  return { open: false, today: day, label: `Closed · opens ${formatClock(CLINIC_HOURS[nextDay].open)} tomorrow` };
}

// useSyncExternalStore needs a stable snapshot, so cache the status per minute as a string key.
let cachedKey = "";
let cachedStatus: OpenStatus | null = null;

function getSnapshot(): OpenStatus {
  const status = getOpenStatus();
  const key = `${status.open}|${status.today}|${status.label}`;
  if (key !== cachedKey || !cachedStatus) {
    cachedKey = key;
    cachedStatus = status;
  }
  return cachedStatus;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

/**
 * Live open/closed status for the clinic. Returns null while pre-rendering / hydrating
 * (the build can't know the visitor's time), then the live value right after.
 */
export function useOpenStatus(): OpenStatus | null {
  return useSyncExternalStore<OpenStatus | null>(subscribe, getSnapshot, () => null);
}
