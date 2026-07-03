import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Pencil, Eye, Plus, Trash2, Scale, Target, Activity, Flame, Star } from "lucide-react";
import { useAppStore, progressoObjetivo } from "@/store/useAppStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

export const Route = createFileRoute("/nutri/")({ component: NutriPanel });

function NutriPanel() {
  const navigate = useNavigate();
  const paciente = useAppStore((s) => s.paciente);
  const refeicoes = useAppStore((s) => s.refeicoes);
  const treinos = useAppStore((s) => s.treinos);
  const updatePaciente = useAppStore((s) => s.updatePaciente);
  const updateRefeicao = useAppStore((s) => s.updateRefeicao);
  const addRefeicao = useAppStore((s) => s.addRefeicao);
  const removeRefeicao = useAppStore((s) => s.removeRefeicao);
  const updateTreino = useAppStore((s) => s.updateTreino);
  const login = useAppStore((s) => s.login);
  const logout = useAppStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const progress = progressoObjetivo(paciente);

  // form local state
  const [form, setForm] = useState(paciente);
  const [refs, setRefs] = useState(refeicoes);
  const [trs, setTrs] = useState(treinos);

  const abrir = () => {
    setForm(paciente);
    setRefs(refeicoes);
    setTrs(treinos);
    setOpen(true);
  };

  const salvar = () => {
    updatePaciente(form);
    refs.forEach((r) => updateRefeicao(r.id, r));
    // handle removed
    refeicoes.filter((r) => !refs.find((x) => x.id === r.id)).forEach((r) => removeRefeicao(r.id));
    trs.forEach((t) => updateTreino(t.id, t));
    setOpen(false);
    toast.success("Dados atualizados ✓");
  };

  const verComoAluno = () => {
    login("aluno");
    navigate({ to: "/" });
  };

  const sair = () => {
    logout();
    navigate({ to: "/login" });
  };

  const field = (label: string, key: keyof typeof form, type: "text" | "number" = "number") => (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</label>
      <input
        type={type}
        value={form[key] as any}
        onChange={(e) =>
          setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value } as typeof form)
        }
        className="mt-1 w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );

  return (
    <div className="pb-8">
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, Gabriel 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Painel do nutricionista</p>
        </div>
        <button onClick={sair} className="size-9 rounded-xl border border-border grid place-items-center text-muted-foreground">
          <LogOut className="size-4" />
        </button>
      </div>

      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-5 glow-primary"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">
              {paciente.primeiroNome[0]}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Paciente ativo</p>
              <p className="text-base font-bold">{paciente.nome}</p>
              <p className="text-[11px] text-muted-foreground">{paciente.plano} · dia {paciente.diasPrograma}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <Mini icon={Scale} label="Peso" value={`${paciente.pesoAtual}kg`} />
            <Mini icon={Target} label="Meta" value={`${paciente.pesoObjetivo}kg`} />
            <Mini icon={Activity} label="% Gord" value={`${paciente.gorduraAtual}%`} />
          </div>

          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-muted-foreground">Rumo ao objetivo</span>
            <span className="num font-bold">{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full gradient-primary rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 bg-card/50 border border-border rounded-xl p-2">
              <Flame className="size-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Streak</p>
                <p className="text-sm font-bold num">{paciente.streak} dias</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-card/50 border border-border rounded-xl p-2">
              <Star className="size-4 text-accent" />
              <div>
                <p className="text-[10px] text-muted-foreground">Pontos</p>
                <p className="text-sm font-bold num">{paciente.pontos.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <button onClick={abrir} className="bg-primary text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
          <Pencil className="size-4" /> Editar dados
        </button>
        <button onClick={verComoAluno} className="bg-card border border-border font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
          <Eye className="size-4" /> Ver como aluno
        </button>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">Próxima consulta</p>
          <p className="text-sm font-semibold">
            {paciente.proxConsulta.diaSemana} · {paciente.proxConsulta.hora} · {paciente.proxConsulta.duracao}min
          </p>
        </div>
      </div>

      <div className="px-4 mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 px-1">
          Plano alimentar · {refeicoes.length} refeições
        </p>
        <div className="space-y-2">
          {refeicoes.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-secondary grid place-items-center text-[10px] font-bold num">
                {r.horario}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{r.nome}</p>
                <p className="text-[10px] text-muted-foreground num">
                  {r.kcal} kcal · P{r.p} C{r.c} G{r.g}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl max-h-[92vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editar dados do paciente</SheetTitle>
            <SheetDescription>Atualize métricas, próxima consulta, refeições e treinos.</SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-primary font-bold mb-2">Métricas</p>
              <div className="grid grid-cols-2 gap-2">
                {field("Peso atual (kg)", "pesoAtual")}
                {field("Meta (kg)", "pesoObjetivo")}
                {field("% Gordura", "gorduraAtual")}
                {field("Streak (dias)", "streak")}
                {field("Pontos", "pontos")}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-primary font-bold mb-2">Próxima consulta</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Dia</label>
                  <input
                    value={form.proxConsulta.diaSemana}
                    onChange={(e) => setForm({ ...form, proxConsulta: { ...form.proxConsulta, diaSemana: e.target.value } })}
                    className="mt-1 w-full bg-secondary border border-border rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Hora</label>
                  <input
                    value={form.proxConsulta.hora}
                    onChange={(e) => setForm({ ...form, proxConsulta: { ...form.proxConsulta, hora: e.target.value } })}
                    className="mt-1 w-full bg-secondary border border-border rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Min</label>
                  <input
                    type="number"
                    value={form.proxConsulta.duracao}
                    onChange={(e) => setForm({ ...form, proxConsulta: { ...form.proxConsulta, duracao: Number(e.target.value) } })}
                    className="mt-1 w-full bg-secondary border border-border rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-wider text-primary font-bold">Refeições</p>
                <button
                  onClick={() => setRefs([...refs, {
                    id: `nova-${Date.now()}`, horario: "15:00", nome: "Nova refeição", kcal: 300,
                    p: 25, c: 30, g: 10, alimentos: [{ nome: "A definir", gramas: "—" }], feita: false,
                  }])}
                  className="text-[11px] font-bold text-primary flex items-center gap-1"
                >
                  <Plus className="size-3" /> Adicionar
                </button>
              </div>
              <div className="space-y-2">
                {refs.map((r, i) => (
                  <div key={r.id} className="bg-secondary border border-border rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={r.nome}
                        onChange={(e) => setRefs(refs.map((x, j) => j === i ? { ...x, nome: e.target.value } : x))}
                        className="flex-1 bg-background border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                      <input
                        value={r.horario}
                        onChange={(e) => setRefs(refs.map((x, j) => j === i ? { ...x, horario: e.target.value } : x))}
                        className="w-16 bg-background border border-border rounded-lg px-2 py-1.5 text-sm num focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => setRefs(refs.filter((_, j) => j !== i))}
                        className="size-8 grid place-items-center rounded-lg border border-border text-muted-foreground"
                      ><Trash2 className="size-3.5" /></button>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {(["kcal", "p", "c", "g"] as const).map((k) => (
                        <div key={k}>
                          <label className="text-[9px] uppercase text-muted-foreground">{k}</label>
                          <input
                            type="number"
                            value={r[k]}
                            onChange={(e) => setRefs(refs.map((x, j) => j === i ? { ...x, [k]: Number(e.target.value) } : x))}
                            className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs num focus:outline-none focus:border-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-primary font-bold mb-2">Treinos</p>
              <div className="space-y-2">
                {trs.map((t, i) => (
                  <div key={t.id} className="bg-secondary border border-border rounded-xl p-2 flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground w-16">{t.dia}</span>
                    <input
                      value={t.tipo}
                      onChange={(e) => setTrs(trs.map((x, j) => j === i ? { ...x, tipo: e.target.value } : x))}
                      className="flex-1 bg-background border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      value={t.duracao}
                      onChange={(e) => setTrs(trs.map((x, j) => j === i ? { ...x, duracao: e.target.value } : x))}
                      className="w-20 bg-background border border-border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={salvar}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl sticky bottom-0"
            >Salvar alterações</button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Mini({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-card/60 border border-border rounded-xl p-2">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="size-3" />
        <span className="text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-bold num mt-0.5">{value}</p>
    </div>
  );
}