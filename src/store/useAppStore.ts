import { create } from "zustand";
import { persist } from "zustand/middleware";
import { paciente as pacienteSeed } from "@/data/paciente";
import { refeicoesHoje, type Refeicao } from "@/data/dieta";
import { treinosSemana, type Treino } from "@/data/treino";

export type Role = "aluno" | "nutri" | null;
export type Paciente = typeof pacienteSeed;

export function progressoObjetivo(p: Paciente) {
  const total = p.pesoInicial - p.pesoObjetivo;
  const feito = p.pesoInicial - p.pesoAtual;
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((feito / total) * 100)));
}

type State = {
  role: Role;
  paciente: Paciente;
  refeicoes: Refeicao[];
  treinos: Treino[];
  login: (role: Exclude<Role, null>) => void;
  logout: () => void;
  updatePaciente: (patch: Partial<Paciente> & { proxConsulta?: Partial<Paciente["proxConsulta"]> }) => void;
  updateRefeicao: (id: string, patch: Partial<Refeicao>) => void;
  addRefeicao: () => void;
  removeRefeicao: (id: string) => void;
  updateTreino: (id: string, patch: Partial<Treino>) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      role: null,
      paciente: pacienteSeed,
      refeicoes: refeicoesHoje,
      treinos: treinosSemana,
      login: (role) => set({ role }),
      logout: () => set({ role: null }),
      updatePaciente: (patch) =>
        set((s) => ({
          paciente: {
            ...s.paciente,
            ...patch,
            proxConsulta: { ...s.paciente.proxConsulta, ...(patch.proxConsulta ?? {}) },
          },
        })),
      updateRefeicao: (id, patch) =>
        set((s) => ({ refeicoes: s.refeicoes.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
      addRefeicao: () =>
        set((s) => ({
          refeicoes: [
            ...s.refeicoes,
            {
              id: `nova-${Date.now()}`,
              horario: "15:00",
              nome: "Nova refeição",
              kcal: 300,
              p: 25,
              c: 30,
              g: 10,
              alimentos: [{ nome: "A definir", gramas: "—" }],
              feita: false,
            },
          ],
        })),
      removeRefeicao: (id) => set((s) => ({ refeicoes: s.refeicoes.filter((r) => r.id !== id) })),
      updateTreino: (id, patch) =>
        set((s) => ({ treinos: s.treinos.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
    }),
    { name: "ironcoach-demo" },
  ),
);