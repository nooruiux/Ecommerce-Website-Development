export type Rule = (value: string, all: Record<string, string>) => string | undefined;

export const required =
  (label: string): Rule =>
  (v) =>
    v.trim() ? undefined : `Enter your ${label.toLowerCase()}.`;

export const email: Rule = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
    ? undefined
    : "Enter a valid email address, like name@example.com.";

export const phone: Rule = (v) =>
  !v.trim() || v.replace(/[^\d]/g, "").length >= 7 ? undefined : "Enter a valid phone number.";

export const minLength =
  (n: number, label: string): Rule =>
  (v) =>
    v.length >= n ? undefined : `${label} must be at least ${n} characters.`;

export const digits =
  (min: number, max: number, label: string): Rule =>
  (v) => {
    const d = v.replace(/\s/g, "");
    return /^\d+$/.test(d) && d.length >= min && d.length <= max
      ? undefined
      : `Enter a valid ${label}.`;
  };

export const expiry: Rule = (v) => {
  const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!m) return "Enter the expiry date as MM / YY.";
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return "Enter a valid month.";
  const now = new Date();
  const end = new Date(year, month, 0, 23, 59, 59);
  return end < now ? "This card has expired." : undefined;
};

export function validate(
  schema: Record<string, Rule[]>,
  values: Record<string, string>,
  fields = Object.keys(schema),
) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    for (const rule of schema[field] ?? []) {
      const msg = rule(values[field] ?? "", values);
      if (msg) {
        errors[field] = msg;
        break;
      }
    }
  }
  return errors;
}
