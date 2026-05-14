import { Link, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, TrendingUp, Dumbbell, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dieta", label: "Dieta", icon: UtensilsCrossed },
  { to: "/evolucao", label: "Evolução", icon: TrendingUp },
  { to: "/treino", label: "Treino", icon: Dumbbell },
  { to: "/conquistas", label: "Prêmios", icon: Trophy },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-3 pb-3 pt-2">
      <div className="glass border border-border rounded-2xl px-2 py-2 flex items-center justify-around">
        {items.map((it) => {
          const active = pathname === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl"
            >
              {active && (
                <motion.div
                  layoutId="navpill"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`relative size-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`relative text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
