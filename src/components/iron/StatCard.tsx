import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon, label, value, suffix, accent,
}: { icon: LucideIcon; label: string; value: string | number; suffix?: string; accent?: "primary" | "gold" }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <Icon className={`size-4 ${accent === "gold" ? "text-accent" : "text-primary"}`} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="num text-2xl font-bold text-foreground">{value}</span>
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </motion.div>
  );
}
