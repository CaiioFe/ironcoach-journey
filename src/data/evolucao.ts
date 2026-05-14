export const pesoSerie = [
  { dia: 1, peso: 92.4 }, { dia: 2, peso: 92.1 }, { dia: 3, peso: 91.8 },
  { dia: 4, peso: 91.6 }, { dia: 5, peso: 91.3 }, { dia: 6, peso: 91.0 },
  { dia: 7, peso: 90.7 }, { dia: 8, peso: 90.5 }, { dia: 9, peso: 90.2 },
  { dia: 10, peso: 89.9 }, { dia: 11, peso: 89.7 }, { dia: 12, peso: 89.4 },
  { dia: 13, peso: 89.2 }, { dia: 14, peso: 89.0 }, { dia: 15, peso: 88.7 },
  { dia: 16, peso: 88.5 }, { dia: 17, peso: 88.3 }, { dia: 18, peso: 88.1 },
];

export const medidas = [
  { nome: "Cintura", atual: 96.2, inicial: 102.5, unidade: "cm" },
  { nome: "Braço", atual: 38.1, inicial: 36.8, unidade: "cm" },
  { nome: "Peito", atual: 104.0, inicial: 106.2, unidade: "cm" },
  { nome: "Coxa", atual: 60.3, inicial: 62.1, unidade: "cm" },
  { nome: "Quadril", atual: 102.5, inicial: 108.0, unidade: "cm" },
];

export const avaliacoes = [
  {
    id: "bio", tipo: "Bioimpedância", data: "28/04",
    detalhes: [
      { k: "Peso", v: "92,4 kg" },
      { k: "% Gordura", v: "26,8%" },
      { k: "Massa magra", v: "67,6 kg" },
      { k: "Água corporal", v: "58,2%" },
      { k: "Taxa metabólica", v: "1.840 kcal" },
    ],
  },
  {
    id: "adip", tipo: "Adipômetro", data: "05/05",
    detalhes: [
      { k: "Tricipital", v: "18 mm" },
      { k: "Subescapular", v: "22 mm" },
      { k: "Suprailíaca", v: "26 mm" },
      { k: "Abdominal", v: "32 mm" },
      { k: "% Gordura estimado", v: "25,1%" },
    ],
  },
  {
    id: "shapd", tipo: "Análise IA Shapd", data: "12/05",
    detalhes: [
      { k: "Postura", v: "Boa simetria" },
      { k: "Massa magra", v: "+0,8 kg vs início" },
      { k: "Gordura visceral", v: "Reduzindo" },
      { k: "Score Shapd", v: "78 / 100" },
    ],
  },
];

export const insightShapd =
  "Sua massa magra subiu 0,8 kg no último ciclo. Continue priorizando treino de força 4x/semana e mantenha proteína acima de 1,8 g/kg.";
