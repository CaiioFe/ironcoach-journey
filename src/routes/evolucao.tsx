import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Camera } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { pesoSerie, medidas, avaliacoes, insightShapd } from "@/data/evolucao";
import { PageHeader } from "@/components/iron/PageHeader";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/evolucao")({ component: Evolucao });

function Evolucao() {
  const [open, setOpen] = useState<string | null>(null);
  const aval = avaliacoes.find((a) => a.id === open);

  return (
    <div className="pb-4">
      <PageHeader title="Evolução" subtitle="18 dias de programa · −4,3 kg" />

      {/* Photos */}
      <div className="px-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Comparativo de fotos</p>
            <button className="text-[11px] text-primary font-medium flex items-center gap-1">
              <Camera className="size-3"/> Nova foto
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Dia 1", p: "92,4kg" },
              { l: "Dia 15", p: "88,7kg" },
              { l: "Hoje", p: "88,1kg" },
            ].map((f, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-secondary border border-border grid place-items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
                <div className="relative text-center">
                  <p className="text-[10px] text-muted-foreground">{f.l}</p>
                  <p className="text-xs font-bold num mt-0.5">{f.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weight chart */}
      <div className="px-4 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-xs text-muted-foreground">Peso · 18 dias</p>
            <p className="num text-2xl font-bold">88,1<span className="text-sm text-muted-foreground"> kg</span></p>
          </div>
          <div className="h-44 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pesoSerie}>
                <defs>
                  <linearGradient id="ev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A3E635" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#A3E635" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="dia" tick={{ fill: "#A1A1AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} hide />
                <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #27272A", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="peso" stroke="#A3E635" strokeWidth={2.5} fill="url(#ev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Measures */}
      <div className="px-4 mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 px-1">Medidas</p>
        <div className="grid grid-cols-2 gap-3">
          {medidas.map((m) => {
            const delta = (m.atual - m.inicial).toFixed(1);
            const positivo = m.nome === "Braço" ? +delta > 0 : +delta < 0;
            return (
              <div key={m.nome} className="bg-card border border-border rounded-2xl p-3">
                <p className="text-[11px] text-muted-foreground">{m.nome}</p>
                <p className="num text-xl font-bold mt-1">{m.atual}<span className="text-xs text-muted-foreground">{m.unidade}</span></p>
                <p className={`text-[11px] font-bold mt-1 ${positivo ? "text-primary" : "text-muted-foreground"}`}>
                  {+delta > 0 ? "+" : ""}{delta} {m.unidade}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI insight */}
      <div className="px-4 mt-4">
        <motion.div whileHover={{ y: -2 }} className="relative overflow-hidden bg-card border border-primary/30 rounded-2xl p-4 glow-primary">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-[11px] uppercase tracking-wider font-bold text-primary">Análise IA Shapd</p>
          </div>
          <p className="text-sm leading-relaxed">{insightShapd}</p>
        </motion.div>
      </div>

      {/* Avaliações */}
      <div className="px-4 mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 px-1">Avaliações físicas</p>
        <div className="space-y-2">
          {avaliacoes.map((a) => (
            <button key={a.id} onClick={() => setOpen(a.id)}
              className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-semibold">{a.tipo}</p>
                <p className="text-[11px] text-muted-foreground">{a.data}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>{aval?.tipo}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {aval?.detalhes.map((d) => (
              <div key={d.k} className="flex justify-between bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm">
                <span className="text-muted-foreground">{d.k}</span>
                <span className="font-bold num">{d.v}</span>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
