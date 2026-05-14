import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Star, Scale, Activity, Video, Award, ChevronRight, Utensils } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { paciente, progressoObjetivo } from "@/data/paciente";
import { pesoSerie } from "@/data/evolucao";
import { refeicoesHoje } from "@/data/dieta";
import { StatCard } from "@/components/iron/StatCard";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const progress = progressoObjetivo();
  const proxRefeicao = refeicoesHoje.find((r) => !r.feita) ?? refeicoesHoje[0];

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* greeting */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="text-xs text-muted-foreground">Bom dia</p>
          <h1 className="text-2xl font-bold">{paciente.primeiroNome} 👋</h1>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full pl-1 pr-3 py-1">
          <div className="size-7 rounded-full gradient-primary grid place-items-center text-[11px] font-bold text-primary-foreground">GP</div>
          <span className="text-xs text-muted-foreground">Coach Gabriel</span>
        </div>
      </div>

      {/* Founder card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-5 glow-primary"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Membro Fundador</span>
          <span className="text-[10px] text-muted-foreground">· Iron Method</span>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Rumo ao objetivo</p>
            <p className="num text-4xl font-extrabold">{progress}<span className="text-xl text-muted-foreground">%</span></p>
          </div>
          <div className="text-right">
            <p className="num text-sm text-muted-foreground">{paciente.pesoAtual}kg</p>
            <p className="text-[10px] text-muted-foreground">meta {paciente.pesoObjetivo}kg</p>
          </div>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }}
            className="h-full gradient-primary rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">Você está adiantado no cronograma do Iron Method 🔥</p>
      </motion.div>

      {/* Next call */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
        <div className="size-11 rounded-xl bg-primary/15 grid place-items-center">
          <Video className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Próxima consulta</p>
          <p className="text-sm font-semibold">{paciente.proxConsulta.diaSemana} · {paciente.proxConsulta.hora} · {paciente.proxConsulta.duracao}min</p>
        </div>
        <button
          onClick={() => toast.success("Aguardando Gabriel entrar...")}
          className="bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-lg"
        >Entrar</button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Scale} label="Peso atual" value={paciente.pesoAtual} suffix="kg" />
        <StatCard icon={Activity} label="% Gordura" value={paciente.gorduraAtual} suffix="%" />
        <StatCard icon={Flame} label="Streak" value={`${paciente.streak} 🔥`} />
        <StatCard icon={Star} label="Pontos" value={paciente.pontos.toLocaleString("pt-BR")} accent="gold" />
      </div>

      {/* Next meal */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Utensils className="size-4 text-primary" />
          <span className="text-xs text-muted-foreground">Refeição agora · {proxRefeicao.horario}</span>
        </div>
        <p className="font-semibold">{proxRefeicao.nome}</p>
        <p className="text-xs text-muted-foreground mt-1">{proxRefeicao.kcal} kcal · P{proxRefeicao.p} · C{proxRefeicao.c} · G{proxRefeicao.g}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => toast.success("Refeição registrada! +20 ⭐")}
            className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-2.5 rounded-xl"
          >Marcar como feita</button>
          <Link to="/dieta" className="px-3 py-2.5 rounded-xl border border-border text-sm">Avaliar</Link>
        </div>
      </div>

      {/* Achievement */}
      <div className="relative overflow-hidden bg-card border border-accent/30 rounded-2xl p-4 flex items-center gap-3 glow-gold">
        <div className="size-12 rounded-xl gradient-gold grid place-items-center">
          <Award className="size-6 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider text-accent font-bold">Última conquista</p>
          <p className="text-sm font-semibold">2 semanas firme</p>
          <p className="text-xs text-muted-foreground">+150 ⭐ · ontem</p>
        </div>
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>

      {/* Mini chart */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Evolução · 18 dias</p>
            <p className="text-sm font-semibold num">−4,3 kg <span className="text-primary">↓</span></p>
          </div>
          <Link to="/evolucao" className="text-xs text-primary font-medium">Ver tudo</Link>
        </div>
        <div className="h-28 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pesoSerie}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#A3E635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="dia" hide />
              <Tooltip
                contentStyle={{ background: "#18181B", border: "1px solid #27272A", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "#A1A1AA" }}
              />
              <Area type="monotone" dataKey="peso" stroke="#A3E635" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
