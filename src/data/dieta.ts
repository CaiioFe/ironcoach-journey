export type Refeicao = {
  id: string;
  horario: string;
  nome: string;
  kcal: number;
  p: number; c: number; g: number;
  alimentos: { nome: string; gramas: string }[];
  feita: boolean;
};

export const refeicoesHoje: Refeicao[] = [
  {
    id: "cafe", horario: "07:00", nome: "Café da manhã", kcal: 540, p: 38, c: 52, g: 18,
    alimentos: [
      { nome: "Ovos mexidos", gramas: "3 unidades" },
      { nome: "Pão integral", gramas: "60g" },
      { nome: "Whey isolado", gramas: "30g" },
      { nome: "Mamão papaya", gramas: "150g" },
    ],
    feita: true,
  },
  {
    id: "lanche-m", horario: "10:00", nome: "Lanche da manhã", kcal: 280, p: 22, c: 28, g: 8,
    alimentos: [
      { nome: "Iogurte natural", gramas: "200g" },
      { nome: "Granola low carb", gramas: "30g" },
      { nome: "Mel", gramas: "10g" },
    ],
    feita: true,
  },
  {
    id: "almoco", horario: "12:30", nome: "Almoço", kcal: 720, p: 52, c: 78, g: 18,
    alimentos: [
      { nome: "Peito de frango grelhado", gramas: "180g" },
      { nome: "Arroz integral", gramas: "120g" },
      { nome: "Feijão preto", gramas: "80g" },
      { nome: "Salada folhas + tomate", gramas: "à vontade" },
      { nome: "Azeite extra virgem", gramas: "10g" },
    ],
    feita: false,
  },
  {
    id: "lanche-t", horario: "16:00", nome: "Lanche da tarde", kcal: 320, p: 28, c: 32, g: 9,
    alimentos: [
      { nome: "Tapioca", gramas: "60g" },
      { nome: "Frango desfiado", gramas: "80g" },
      { nome: "Café preto", gramas: "200ml" },
    ],
    feita: true,
  },
  {
    id: "jantar", horario: "19:30", nome: "Jantar", kcal: 620, p: 48, c: 55, g: 19,
    alimentos: [
      { nome: "Salmão grelhado", gramas: "160g" },
      { nome: "Batata doce", gramas: "150g" },
      { nome: "Brócolis no vapor", gramas: "120g" },
    ],
    feita: false,
  },
  {
    id: "ceia", horario: "22:00", nome: "Ceia", kcal: 220, p: 25, c: 8, g: 9,
    alimentos: [
      { nome: "Caseína", gramas: "30g" },
      { nome: "Pasta de amendoim", gramas: "15g" },
    ],
    feita: true,
  },
];

export const substituicoes: Record<string, { nome: string; gramas: string }[]> = {
  default: [
    { nome: "Patinho moído magro", gramas: "180g" },
    { nome: "Tilápia grelhada", gramas: "200g" },
    { nome: "Ovos inteiros", gramas: "4 unidades" },
  ],
};
