export function resolveMediaUrl(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const cleaned = value.trim();

  if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith("/")) {
    return cleaned;
  }

  if (/^\d+$/.test(cleaned)) {
    return `/api/uploads/${cleaned}`;
  }

  return fallback;
}
