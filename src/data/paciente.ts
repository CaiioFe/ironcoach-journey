export const paciente = {
  nome: "Rafael Mendes",
  primeiroNome: "Rafael",
  idade: 32,
  altura: 1.78,
  pesoInicial: 92.4,
  pesoAtual: 88.1,
  pesoObjetivo: 78,
  gorduraInicial: 26.8,
  gorduraAtual: 23.4,
  streak: 14,
  pontos: 2840,
  nivel: 3,
  nivelNome: "Disciplinado",
  pontosProxNivel: 4000,
  diasPrograma: 18,
  plano: "Membro Fundador — Iron Method",
  proxConsulta: {
    diaSemana: "Terça-feira",
    hora: "19:00",
    duracao: 15,
    profissional: "Gabriel Pedrosa",
  },
};

export const progressoObjetivo = () => {
  const total = paciente.pesoInicial - paciente.pesoObjetivo;
  const feito = paciente.pesoInicial - paciente.pesoAtual;
  return Math.round((feito / total) * 100);
};
