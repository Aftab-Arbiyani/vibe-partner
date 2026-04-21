import type { ServiceType } from "./data";

export const PRICES_CENTS: Record<ServiceType, number> = {
  async: 4000,
  live: 6000,
  monthly: 14900,
  pro: 29900,
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  async: "Async Bug Fix",
  live: "Live Pair Programming Session",
  monthly: "Monthly Retainer — Starter",
  pro: "Monthly Retainer — Pro",
};

export const SERVICE_DISPLAY_PRICE: Record<ServiceType, string> = {
  async: "From $40",
  live: "From $60 / hr",
  monthly: "$149 / mo",
  pro: "$299 / mo",
};
