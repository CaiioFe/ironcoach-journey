import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Repeat, Clock, Flame } from "lucide-react";
import { refeicoesHoje as initial, substituicoes, type Refeicao } from "@/data/dieta";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import { PageHeader } from "@/components/iron/PageHeader";

export const Route = createFileRoute("/dieta")({ component: Dieta });

function Dieta() {
  const [tab, setTab] = useState<"hoje" | "semana" | "plano">("hoje");
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>(initial);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [rateOpen, setRateOpen] = useState<string | null>(null);
  const [stars, setStars] = useState(0);

  const feitas = refeicoes.filter((r) => r.feita).length;

  const toggleFeita = (id: string) => {
    setRefeicoes((prev) => prev.map((r) => r.id === id ? { ...r, feita: !r.feita } : r));
    toast.success("Refeição marcada · +20 ⭐");
  };

  return (
    <div className="pb-4">
      <PageHeader title="Dieta" subtitle="Plano Iron Method · 2.700 kcal" />

      {/* Tabs */}
      <div className="px-4">
        <div className="bg-card border border-border rounded-xl p-1 flex">
          {(["hoje", "semana", "plano"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 text-xs font-semibold py-2 rounded-lg capitalize transition ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}>
              {t === "plano" ? "Plano completo" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Daily progress */}
      <div className="px-4 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Progresso do dia</span>
            <span className="num font-bold">{feitas} de {refeicoes.length} refeições</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(feitas/refeicoes.length)*100}%` }}
              className="h-full gradient-primary rounded-full"
            />
          </div>
        </div>
      </div>

      {tab !== "hoje" ? (
        <div className="px-4 mt-6">
          <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
            Visualização {tab === "semana" ? "semanal" : "do plano completo"} desenhada por Gabriel — disponível em breve.
          </div>
        </div>
      ) : (
        <div className="px-4 mt-4 space-y-3">
          {refeicoes.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`relative bg-card border rounded-2xl p-4 transition ${
                r.feita ? "border-primary/30 opacity-80" : "border-border"
              }`}
            >
              {r.feita && (
                <div className="absolute top-3 right-3 size-7 rounded-full bg-primary grid place-items-center">
                  <Check className="size-4 text-primary-foreground" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{r.horario}</span>
              </div>
              <h3 className="font-bold text-base">{r.nome}</h3>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Flame className="size-3 text-primary"/> {r.kcal} kcal</span>
                <span>P {r.p}g</span><span>C {r.c}g</span><span>G {r.g}g</span>
              </div>

              <ul className="mt-3 space-y-1.5">
                {r.alimentos.map((a) => (
                  <li key={a.nome} className="flex justify-between text-xs">
                    <span className="text-foreground/90">{a.nome}</span>
                    <span className="text-muted-foreground num">{a.gramas}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFeita(r.id)}
                  className={`flex-1 text-xs font-bold py-2 rounded-lg ${
                    r.feita ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >{r.feita ? "Desfazer" : "Marcar feito"}</button>
                <button
                  onClick={() => setSubOpen(r.id)}
                  className="px-3 py-2 rounded-lg border border-border text-xs flex items-center gap-1"
                ><Repeat className="size-3"/> Substituir</button>
                <button
                  onClick={() => { setRateOpen(r.id); setStars(0); }}
                  className="px-3 py-2 rounded-lg border border-border text-xs flex items-center gap-1"
                ><Star className="size-3"/> Avaliar</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Substitution sheet */}
      <Sheet open={!!subOpen} onOpenChange={(o) => !o && setSubOpen(null)}>
        <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Substituir alimento</SheetTitle>
            <SheetDescription>Opções equivalentes em macros, aprovadas por Gabriel.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {substituicoes.default.map((s) => (
              <button
                key={s.nome}
                onClick={() => { toast.success(`Trocado para ${s.nome}`); setSubOpen(null); }}
                className="w-full bg-secondary border border-border rounded-xl p-3 flex justify-between text-sm"
              >
                <span>{s.nome}</span>
                <span className="text-muted-foreground num">{s.gramas}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Rate sheet */}
      <Sheet open={!!rateOpen} onOpenChange={(o) => !o && setRateOpen(null)}>
        <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Como foi a refeição?</SheetTitle>
            <SheetDescription>Sua avaliação ajusta o plano com Gabriel.</SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex justify-center gap-2">
            {[1,2,3,4,5].map((n) => (
              <button key={n} onClick={() => setStars(n)}>
                <Star className={`size-9 transition ${n <= stars ? "fill-accent text-accent" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Comentário (opcional)"
            className="mt-4 w-full bg-secondary border border-border rounded-xl p-3 text-sm h-24 resize-none focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => { toast.success("Avaliação enviada · +10 ⭐"); setRateOpen(null); }}
            className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl"
          >Enviar avaliação</button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
