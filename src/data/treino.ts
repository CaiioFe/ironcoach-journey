export type Exercicio = { nome: string; series: string; obs?: string };
export type Treino = {
  id: string; dia: string; tipo: string; feito: boolean; duracao: string;
  exercicios: Exercicio[];
};

export const treinosSemana: Treino[] = [
  {
    id: "seg", dia: "Segunda", tipo: "Peito + Tríceps", feito: true, duracao: "55 min",
    exercicios: [
      { nome: "Supino reto", series: "4 x 8-10" },
      { nome: "Supino inclinado halter", series: "4 x 10" },
      { nome: "Crucifixo máquina", series: "3 x 12" },
      { nome: "Tríceps corda", series: "4 x 12" },
      { nome: "Tríceps francês", series: "3 x 10" },
    ],
  },
  {
    id: "ter", dia: "Terça", tipo: "Costas + Bíceps", feito: true, duracao: "60 min",
    exercicios: [
      { nome: "Barra fixa", series: "4 x máx" },
      { nome: "Remada curvada", series: "4 x 10" },
      { nome: "Puxada frente", series: "3 x 12" },
      { nome: "Rosca direta", series: "4 x 10" },
      { nome: "Rosca martelo", series: "3 x 12" },
    ],
  },
  {
    id: "qua", dia: "Quarta", tipo: "Pernas", feito: true, duracao: "70 min",
    exercicios: [
      { nome: "Agachamento livre", series: "5 x 8" },
      { nome: "Leg press 45°", series: "4 x 12" },
      { nome: "Cadeira extensora", series: "3 x 15" },
      { nome: "Mesa flexora", series: "3 x 12" },
      { nome: "Panturrilha em pé", series: "4 x 20" },
    ],
  },
  {
    id: "qui", dia: "Quinta", tipo: "Ombros", feito: false, duracao: "50 min",
    exercicios: [
      { nome: "Desenvolvimento halter", series: "4 x 10" },
      { nome: "Elevação lateral", series: "4 x 12" },
      { nome: "Elevação frontal", series: "3 x 12" },
      { nome: "Encolhimento", series: "3 x 15" },
    ],
  },
  {
    id: "sex", dia: "Sexta", tipo: "Cardio HIIT", feito: false, duracao: "30 min",
    exercicios: [
      { nome: "Esteira sprints", series: "8 x 30s" },
      { nome: "Bike polichinelo", series: "5 x 1min" },
      { nome: "Corda naval", series: "4 x 40s" },
    ],
  },
];
