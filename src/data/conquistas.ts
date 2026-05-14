import { Award, Flame, Target, Droplet, Trophy, Crown, Dumbbell, Sparkles } from "lucide-react";

export const badges = [
  { id: "1sem", nome: "Primeira semana", desc: "7 dias completos", icon: Award, unlocked: true },
  { id: "14d", nome: "14 dias firme", desc: "Streak de 2 semanas", icon: Flame, unlocked: true },
  { id: "aval", nome: "Avaliação completa", desc: "Bio + adipômetro + Shapd", icon: Target, unlocked: true },
  { id: "hidro", nome: "Hidratação master", desc: "3L/dia por 7 dias", icon: Droplet, unlocked: true },
  { id: "macro", nome: "Mestre do macro", desc: "Bateu macros 10 dias", icon: Sparkles, unlocked: true },
  { id: "30d", nome: "30 dias firme", desc: "Streak de 30 dias", icon: Crown, unlocked: false },
  { id: "meta-int", nome: "Meta intermediária", desc: "50% do objetivo", icon: Trophy, unlocked: false },
  { id: "transf", nome: "Transformação", desc: "Atingir o objetivo", icon: Dumbbell, unlocked: false },
];

export const premios = [
  { id: "camisa", nome: "Camiseta Iron Nutrição", custo: 1500, status: "disponivel" as const, desc: "Tecido dry-fit edição limitada" },
  { id: "consulta", nome: "Consulta extra gratuita", custo: 3000, status: "perto" as const, desc: "30 min com Gabriel, fora do plano" },
  { id: "kit", nome: "Kit suplementos", custo: 5000, status: "bloqueado" as const, desc: "Whey + creatina + multivitamínico" },
];
