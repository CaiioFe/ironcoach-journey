import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Star, Gift } from "lucide-react";
import { badges, premios } from "@/data/conquistas";
import { paciente } from "@/data/paciente";
import { PageHeader } from "@/components/iron/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/conquistas")({ component: Conquistas });

function Conquistas() {
  const pct = Math.round((paciente.pontos / paciente.pontosProxNivel) * 100);
  return (
    <div className="pb-4">
      <PageHeader title="Conquistas" subtitle="Iron Method · Membro Fundador" />

      {/* Level card */}
      <div className="px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-card to-card p-5 glow-gold">
          <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Nível {paciente.nivel}</p>
          <h2 className="text-2xl font-extrabold mt-1">{paciente.nivelNome}</h2>
          <div className="flex items-baseline gap-1 mt-3">
            <Star className="size-4 text-accent fill-accent"/>
            <span className="num text-3xl font-extrabold">{paciente.pontos.toLocaleString("pt-BR")}</span>
            <span className="text-xs text-muted-foreground">/ {paciente.pontosProxNivel.toLocaleString("pt-BR")}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mt-3">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }}
              className="h-full gradient-gold rounded-full"/>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">Faltam {(paciente.pontosProxNivel - paciente.pontos).toLocaleString("pt-BR")} ⭐ para o próximo nível</p>
        </motion.div>
      </div>

      {/* Explanation */}
      <div className="px-4 mt-3">
        <div className="bg-card border border-border rounded-2xl p-3 text-[11px] text-muted-foreground">
          Ganhe pontos cumprindo dieta, treino e avaliações. Use seus ⭐ na loja de prêmios escolhida pelo Gabriel.
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mt-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 px-1">Badges</p>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-card border rounded-2xl p-4 flex flex-col items-center text-center gap-2 ${
                  b.unlocked ? "border-accent/40 glow-gold" : "border-border opacity-60"
                }`}
              >
                <div className={`size-12 rounded-xl grid place-items-center ${b.unlocked ? "gradient-gold" : "bg-secondary"}`}>
                  {b.unlocked
                    ? <Icon className="size-6 text-accent-foreground" />
                    : <Lock className="size-5 text-muted-foreground" />}
                </div>
                <div>
                  <p className={`text-xs font-bold ${b.unlocked ? "" : "text-muted-foreground"}`}>{b.nome}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Prizes */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Gift className="size-4 text-primary"/>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Prêmios disponíveis</p>
        </div>
        <div className="space-y-3">
          {premios.map((p) => {
            const blocked = p.status === "bloqueado";
            const close = p.status === "perto";
            return (
              <div key={p.id} className={`bg-card border rounded-2xl p-4 ${
                p.status === "disponivel" ? "border-primary/30" : "border-border"
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{p.nome}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.desc}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="size-3 text-accent fill-accent"/>
                      <span className="text-xs font-bold num">{p.custo.toLocaleString("pt-BR")}</span>
                      {close && <span className="text-[10px] text-accent ml-2">faltam {(p.custo - paciente.pontos).toLocaleString("pt-BR")} ⭐</span>}
                    </div>
                  </div>
                  <button
                    disabled={blocked}
                    onClick={() => toast.success("Solicitação enviada ao Gabriel ✓")}
                    className={`text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap ${
                      blocked ? "bg-secondary text-muted-foreground" :
                      close ? "bg-accent/20 text-accent border border-accent/40" :
                      "bg-primary text-primary-foreground"
                    }`}
                  >
                    {blocked ? <Lock className="size-3.5 inline"/> : "Resgatar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
