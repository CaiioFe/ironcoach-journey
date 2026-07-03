import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Stethoscope, ChevronRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/login")({ component: Login });

const perfis = {
  aluno: { titulo: "Aluno", nome: "Rafael Mendes", email: "aluno@demo.com", senha: "demo", icon: Dumbbell },
  nutri: { titulo: "Nutricionista", nome: "Gabriel Pedrosa", email: "gabriel@demo.com", senha: "demo", icon: Stethoscope },
} as const;

function Login() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const role = useAppStore((s) => s.role);
  const [sel, setSel] = useState<"aluno" | "nutri">("aluno");
  const p = perfis[sel];
  const [email, setEmail] = useState<string>(p.email);
  const [senha, setSenha] = useState<string>(p.senha);

  useEffect(() => {
    setEmail(perfis[sel].email);
    setSenha(perfis[sel].senha);
  }, [sel]);

  useEffect(() => {
    if (role === "aluno") navigate({ to: "/" });
    if (role === "nutri") navigate({ to: "/nutri" });
  }, [role, navigate]);

  const entrar = () => {
    login(sel);
    navigate({ to: sel === "aluno" ? "/" : "/nutri" });
  };

  return (
    <div className="min-h-screen px-5 pt-14 pb-8">
      <div className="text-center mb-8">
        <div className="mx-auto size-14 rounded-2xl gradient-primary grid place-items-center glow-primary mb-3">
          <Dumbbell className="size-7 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold">Iron Coach</h1>
        <p className="text-sm text-muted-foreground mt-1">Acesse sua conta</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {(["aluno", "nutri"] as const).map((k) => {
          const it = perfis[k];
          const Icon = it.icon;
          const active = sel === k;
          return (
            <motion.button
              key={k}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSel(k)}
              className={`relative text-left p-3 rounded-2xl border transition ${
                active ? "border-primary bg-primary/10 glow-primary" : "border-border bg-card"
              }`}
            >
              <div className={`size-9 rounded-xl grid place-items-center mb-2 ${active ? "bg-primary/20" : "bg-secondary"}`}>
                <Icon className={`size-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{it.titulo}</p>
              <p className="text-sm font-bold leading-tight">{it.nome}</p>
              <p className="text-[10px] text-muted-foreground mt-1 truncate">{it.email}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={entrar}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
        >
          Entrar como {perfis[sel].titulo} <ChevronRight className="size-4" />
        </button>
        <p className="text-[10px] text-center text-muted-foreground">
          Credenciais demo · senha: <span className="num">demo</span>
        </p>
      </div>
    </div>
  );
}