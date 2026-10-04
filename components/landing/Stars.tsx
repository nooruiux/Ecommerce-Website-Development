import { Icon } from "@/components/ui/Icon";

// Landing rating rows (143:638, 143:724): five amber stars.
export function Stars({ size = 24, label }: { size?: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-0.5 text-amber">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} />
      ))}
    </span>
  );
}
