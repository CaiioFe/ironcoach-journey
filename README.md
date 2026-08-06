# Iron Coach: Your Progress

Crie um app mobile-first chamado "Iron Coach" — protótipo visual de acompanhamento nutricional para a clínica Iron Nutrição Esportiva (do nutricionista Gabriel Pedrosa). É APENAS UM PROTÓTIPO DE TELAS para gravação de vídeo demo. Sem backend, sem Supabase, sem autenticação, sem banco. Todos os dados devem vir de constantes em arquivos /src/data/*.ts com mocks ricos e realistas.

CONTEXTO DO PRODUTO

O paciente é "Membro Fundador" do novo programa do Gabriel — promete atingir 50% do objetivo nas primeiras 4 semanas, com videochamada semanal de 15 min. O app dá ao paciente visibilidade total da jornada na palma da mão: dieta, evolução, medidas, treino e gamificação. É feito sob medida para o Gabriel, não é ferramenta genérica.

IDENTIDADE VISUAL

- Dark mode obrigatório, fundo #0A0A0A

- Primary: verde-limão neon #A3E635 (ação, progresso, CTAs)

- Accent: dourado #FACC15 (conquistas, prêmios)

- Cinzas: #18181B (cards), #27272A (borda), #A1A1AA (texto secundário)

- Branco puro nos títulos

- Fonte: Inter ou Geist, tracking apertado nos números grandes

- Estética esportiva premium, parecida com Whoop / Strava / Athletic Greens

- Glassmorphism sutil em alguns cards, sombras com glow verde

- Ícones lucide-react sempre

- Mobile-first com max-width 430px centralizada no desktop (frame estilo iPhone)

- Bottom navigation fixa com 5 ícones

PACIENTE MOCKADO

- Nome: Rafael Mendes

- Idade: 32, altura 1,78m

- Peso inicial: 92,4 kg → atual: 88,1 kg (em 18 dias de programa)

- Objetivo: 78 kg

- % gordura inicial: 26,8% → atual: 23,4%

- Streak atual: 14 dias seguindo a dieta

- Próxima videochamada: terça-feira 19h com Gabriel

- Plano: "Membro Fundador — Iron Method"

TELAS (5 abas no bottom nav)

1. HOME (/)

- Header com saudação "Bom dia, Rafael 👋" + avatar Gabriel pequeno

- Card grande "Membro Fundador" com barra de progresso 38% rumo ao objetivo, microcopy "Você está adiantado no cronograma do Iron Method"

- Card "Próxima consulta": terça 19h, botão "Entrar na chamada" + 15 min

- Grid 2x2 de KPIs: Peso atual, % gordura, Streak (14 🔥), Pontos (2.840 ⭐)

- Card "Refeição agora": almoço 12h30, com botão grande "Marcar como feita" e link "Avaliar refeição"

- Card "Última conquista": badge "2 semanas firme" com brilho dourado

- Mini gráfico (recharts) da evolução de peso dos últimos 18 dias

2. DIETA (/dieta)

- Tabs no topo: "Hoje" | "Semana" | "Plano completo"

- Em Hoje: 6 cards de refeições (café, lanche manhã, almoço, lanche tarde, jantar, ceia), cada um com:

  · Horário, nome do prato, calorias e macros (P/C/G)

  · Lista de alimentos com gramatura

  · Botão "Substituir alimento" (abre modal com 3 opções mockadas)

  · Botão "Marcar feito" (visualmente vira check verde)

  · Botão "Avaliar" (abre modal com 5 estrelas + campo de comentário)

- Refeições já feitas aparecem com overlay sutil e check

- Barra de progresso do dia no topo: "4 de 6 refeições"

3. EVOLUÇÃO (/evolucao)

- Card principal com 3 fotos lado a lado (placeholders): "Dia 1 / Dia 15 / Hoje" — usar imagens placeholder cinza com texto centralizado

- Gráfico de área (recharts) do peso ao longo de 18 dias, suave, gradiente verde

- Cards de medidas: Cintura, Braço, Peito, Coxa, Quadril — cada um com valor atual, delta vs inicial em verde

- Seção "Avaliações Físicas": lista de 3 itens (Bioimpedância 28/04, Adipômetro 05/05, Análise IA Shapd 12/05) — cada um tocável, mostra modal com dados detalhados

- Card "Análise IA Shapd": insight gerado por IA tipo "Sua massa magra subiu 0,8kg — mantenha treino de força"

4. TREINO (/treino)

- Cabeçalho com semana atual e progresso (3/5 treinos)

- Cards dos 5 dias da semana com tipo (Peito+Tríceps, Costas+Bíceps, Pernas, Ombros, Cardio HIIT)

- Ao tocar abre lista de exercícios com séries x reps, thumbnail placeholder de vídeo, botão "Ver execução"

- Botão grande "Marcar treino feito"

5. CONQUISTAS (/conquistas)

- Header com nível atual: "Nível 3 — Disciplinado" e barra para próximo nível

- Card "Pontos totais": 2.840 ⭐ com explicação rápida "Ganhe pontos cumprindo dieta, treino e avaliações"

- Grid de badges: 8 conquistas, 5 desbloqueadas (com glow dourado) e 3 bloqueadas (cinza com cadeado)

  · Exemplos: "Primeira semana", "14 dias firme", "Avaliação completa", "Hidratação master", "Mestre do macro", "30 dias firme (bloqueado)", "Meta intermediária (bloqueado)", "Transformação (bloqueado)"

- Seção "Prêmios disponíveis" — itens que o paciente pode resgatar com pontos, escolhidos pelo Gabriel:

  · Camiseta Iron Nutrição (1.500 ⭐) — disponível

  · Consulta extra gratuita (3.000 ⭐) — falta pouco

  · Kit suplementos (5.000 ⭐) — bloqueado

- Cada prêmio com botão "Resgatar" (só visual, abre toast "Solicitação enviada ao Gabriel")

INTERAÇÕES IMPORTANTES (só visuais, sem persistência)

- Toda ação tem feedback visual imediato (toast, animação, check)

- Use sonner para toasts

- Use framer-motion para microanimações nos cards e badges

- Modais com sheet do shadcn deslizando de baixo

ESTRUTURA TÉCNICA

- React + Vite + Tailwind + shadcn/ui + lucide-react + recharts + framer-motion + sonner

- React Router para navegação

- Layout component com BottomNav fixo

- Todos os dados em /src/data: paciente.ts, dieta.ts, evolucao.ts, treino.ts, conquistas.ts

- Componentes reutilizáveis em /src/components: StatCard, MealCard, BadgeCard, ProgressRing, etc.

- Sem autenticação, sem Supabase, sem chamadas de API — TUDO mockado

NÃO FAÇA

- Não use formulários reais que persistem

- Não crie tela de login

- Não conecte banco nenhum

- Não use animações que dependam de dados reais

Foco em fazer cada tela ser visualmente impressionante já no primeiro screenshot — esse protótipo vai virar vídeo de venda.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ironcoach-journey.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7bd61a08-fb2d-46c3-9ca7-3bfe58aec3b6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
