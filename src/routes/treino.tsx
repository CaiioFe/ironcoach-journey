import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Play, Dumbbell, Clock } from "lucide-react";
import { treinosSemana } from "@/data/treino";
import { PageHeader } from "@/components/iron/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/treino")({ component: Treino });

function Treino() {
  const [open, setOpen] = useState<string | null>("qui");
  const [feitos, setFeitos] = useState(treinosSemana.filter(t => t.feito).map(t => t.id));

  const total = treinosSemana.length;
  const done = feitos.length;

  return (
    <div className="pb-4">
      <PageHeader title="Treino" subtitle="Semana 3 · Iron Method" />

      <div className="px-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progresso da semana</span>
            <span className="num font-bold">{done}/{total} treinos</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div animate={{ width: `${(done/total)*100}%` }} className="h-full gradient-primary rounded-full"/>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {treinosSemana.map((t) => {
          const isOpen = open === t.id;
          const feito = feitos.includes(t.id);
          return (
            <motion.div key={t.id} layout className="bg-card border border-border rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : t.id)} className="w-full p-4 flex items-center gap-3">
                <div className={`size-11 rounded-xl grid place-items-center ${feito ? "bg-primary/15" : "bg-secondary"}`}>
                  {feito ? <Check className="size-5 text-primary"/> : <Dumbbell className="size-5 text-muted-foreground"/>}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[11px] text-muted-foreground">{t.dia}</p>
                  <p className="text-sm font-bold">{t.tipo}</p>
                </div>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="size-3"/> {t.duracao}</span>
                <ChevronDown className={`size-4 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                      {t.exercicios.map((e) => (
                        <div key={e.nome} className="flex items-center gap-3 bg-secondary border border-border rounded-xl p-2.5">
                          <div className="size-12 rounded-lg bg-background border border-border grid place-items-center">
                            <Play className="size-4 text-primary fill-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{e.nome}</p>
                            <p className="text-[11px] text-muted-foreground num">{e.series}</p>
                          </div>
                          <button
                            onClick={() => toast("Carregando vídeo de execução...")}
                            className="text-[11px] text-primary font-medium"
                          >Ver execução</button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          if (feito) { setFeitos(feitos.filter(x => x !== t.id)); toast("Treino desmarcado"); }
                          else { setFeitos([...feitos, t.id]); toast.success("Treino concluído · +50 ⭐"); }
                        }}
                        className={`w-full mt-2 py-3 rounded-xl text-sm font-bold ${feito ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"}`}
                      >{feito ? "Desfazer" : "Marcar treino feito"}</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
