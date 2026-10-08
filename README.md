# Math Adventure 🎮✨

Aplicação educacional gamificada para crianças de 6 a 10 anos aprenderem matemática de forma divertida e motivadora.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 📁 Arquitetura

O projeto segue **Domain Driven Design (DDD)** + **Atomic Design**:

```
src/
├── app/                    # Next.js App Router
│   ├── learn/             # Rotas de aprendizado
│   │   ├── visual/       # Modo Aprender (visual)
│   │   └── practice/     # Modo Praticar
├── domains/                # Domínios DDD
│   ├── progress/          # Sistema de XP, níveis, moedas, streak
│   └── learning/          # Sistema de aprendizado e questões
├── shared/                 # Código compartilhado
│   ├── components/        # Atomic Design
│   │   ├── atoms/        # Componentes base
│   │   ├── molecules/    # Combinação de atoms
│   │   ├── organisms/    # Blocos completos
│   │   └── templates/    # Estruturas de página
│   ├── design-system/    # Tokens de design
│   └── types/            # Tipos compartilhados
└── infrastructure/        # Camada de infraestrutura
    └── storage/          # Persistência (LocalStorage)
```

## 🎨 Design System

Todos os componentes utilizam **tokens** do design system:

- **Colors** - Cores primárias, secundárias, feedback, gamificação
- **Spacing** - Espaçamentos responsivos
- **Radius** - Bordas arredondadas
- **Shadows** - Sombras
- **Typography** - Tipografia
- **Animations** - Animações e transições

## 💾 Persistência

Sistema de **LocalStorage** com abstração para futura migração:

- Interface `StorageProvider`
- Implementação `LocalStorageProvider`
- Funcionamento 100% offline
- Sem necessidade de login

## 🎯 Sistema de Progresso

### XP e Níveis
- Sistema exponencial de progressão
- Feedback visual imediato
- Cálculo automático de level ups

### Moedas
- Ganho por conquistas
- Sistema de gastos

### Streak
- Dias consecutivos jogando
- Recompensas por consistência
- Reset automático ao quebrar sequência

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

## 📱 Mobile First

Todo o design é **mobile first**:
- Áreas de toque mínimas de 44px
- Responsivo em todos os breakpoints
- Otimizado para smartphones

## ✅ Status do Projeto

### TASK-001-FOUNDATION ✅
- [x] Setup Next.js + TypeScript
- [x] Configuração Tailwind CSS
- [x] Arquitetura DDD
- [x] Atomic Design
- [x] Design System com tokens
- [x] Sistema de persistência
- [x] Domínio de progresso (XP, moedas, streak)
- [x] Componentes base (Atoms, Molecules, Organisms)
- [x] Tela Home funcional

### TASK-002-LEARNING-ADDITION ✅
- [x] Domínio de aprendizado (entidades, serviços, repositório)
- [x] Sistema de geração de questões
- [x] Sistema de fases progressivas
- [x] Modo Aprender (visualização com emojis)
- [x] Modo Praticar (questões interativas)
- [x] Sistema de feedback imediato
- [x] Integração com sistema de XP e moedas
- [x] Tela de conclusão com estrelas
- [x] Reino das Somas (3 fases)

### TASK-003-LEARNING-SUBTRACTION ✅
- [x] Floresta das Subtrações (3 fases)
- [x] Visualização de remoção de elementos
- [x] Sistema de desbloqueio após Reino das Somas
- [x] Modo visual para subtração
- [x] Integração com sistema existente
- [x] Exercícios de subtração até 20

### TASK-004-MULTIPLICATION ✅
- [x] Ilha da Multiplicação (4 fases - tabuadas)
- [x] Visualização por grupos de elementos
- [x] Tabuada do 2, 3, 4 e 5
- [x] Sistema de geração específico para tabuadas
- [x] Modo visual para multiplicação
- [x] Integração com sistema existente

### TASK-005-DIVISION ✅
- [x] Planeta da Divisão (4 fases - divisões)
- [x] Visualização de distribuição em grupos
- [x] Divisão por 2, 3, 4 e 5
- [x] Sistema de geração sem restos (divisão exata)
- [x] Modo visual para divisão
- [x] Integração com sistema existente

### TASK-006-GAMIFICATION ✅
- [x] Sistema de Conquistas (23 conquistas)
  - [x] Conquistas de Aprendizado (4)
  - [x] Conquistas de Consistência/Streak (4)
  - [x] Conquistas de Maestria (3)
  - [x] Conquistas de Exploração (5)
  - [x] Conquistas de Progresso (4)
  - [x] Sistema de tiers (Bronze, Prata, Ouro, Platina)
  - [x] Recompensas automáticas (XP e moedas)
  - [x] Verificação automática ao atingir objetivos
- [x] Sistema de Missões Diárias (5 tipos)
  - [x] Responder questões
  - [x] Acertos consecutivos
  - [x] Completar fases
  - [x] Ganhar XP
  - [x] Praticar operação específica
  - [x] Renovação automática diária
  - [x] Recompensas por missão
  - [x] Sistema de reivindicação
- [x] Página de Conquistas (/achievements)
- [x] Página de Missões (/missions)
- [x] Integração com sistema de aprendizado
- [x] Preview de missões na home
- [x] Estatísticas e progresso

### TASK-007-POLISH ✅
- [x] Sistema de Celebração
  - [x] Modal de conquista desbloqueada com confetti
  - [x] Modal de level up com animações
  - [x] Confetti na conclusão de fases
  - [x] Integração automática com progresso
- [x] Mascote Interativo
  - [x] Componente de mascote com balão de fala
  - [x] Mensagens contextuais
  - [x] Diferentes humores (feliz, animado, pensando, celebração, encorajador)
  - [x] Auto-hide configurável
- [x] Sistema de Onboarding
  - [x] Tutorial de 5 passos na primeira visita
  - [x] Explicação dos recursos principais
  - [x] Navegação com progresso visual
  - [x] Opção de pular
- [x] Componentes de UX
  - [x] Loading Spinner
  - [x] Empty State
  - [x] Page Transition com animações
  - [x] Tooltip
  - [x] Pulse (destaque pulsante)
- [x] Melhorias Visuais
  - [x] Animações suaves em todos os componentes
  - [x] Feedback visual aprimorado
  - [x] Transições de página
  - [x] Estados visuais claros

## 🎮 Funcionalidades Disponíveis

### 🏰 Reino das Somas
- **Fase 1**: Primeiros Passos (somas até 5)
- **Fase 2**: Crescendo (somas até 10)
- **Fase 3**: Desafio das Somas (somas até 20)

### 🌳 Floresta das Subtrações
- **Fase 4**: Aprendendo a Tirar (subtrações até 5)
- **Fase 5**: Tirando Mais (subtrações até 10)
- **Fase 6**: Mestre das Subtrações (subtrações até 20)
- Desbloqueia ao completar o Reino das Somas

### 🏴‍☠️ Ilha da Multiplicação (Tabuadas Completas)
- **Fase 7**: Tabuada do 2 (10 exercícios: 2×1 até 2×10)
- **Fase 8**: Tabuada do 3 (10 exercícios: 3×1 até 3×10)
- **Fase 9**: Tabuada do 4 (10 exercícios: 4×1 até 4×10)
- **Fase 10**: Tabuada do 5 (10 exercícios: 5×1 até 5×10)
- **Fase 11**: Tabuada do 6 (10 exercícios: 6×1 até 6×10)
- **Fase 12**: Tabuada do 7 (10 exercícios: 7×1 até 7×10)
- **Fase 13**: Tabuada do 8 (10 exercícios: 8×1 até 8×10)
- **Fase 14**: Tabuada do 9 (10 exercícios: 9×1 até 9×10)
- **Fase 15**: Tabuada do 10 (10 exercícios: 10×1 até 10×10)
- **Disponível desde o início** - Primeira fase desbloqueada
- Visualização por grupos (ex: 3 grupos de 4)
- Questões em ordem sequencial (facilita aprendizado)
- Navegação direta entre tabuadas após completar

### 🚀 Planeta da Divisão (Divisões Completas)
- **Fase 16**: Dividindo por 2 (10 exercícios de divisão por 2)
- **Fase 17**: Dividindo por 3 (10 exercícios de divisão por 3)
- **Fase 18**: Dividindo por 4 (10 exercícios de divisão por 4)
- **Fase 19**: Dividindo por 5 (10 exercícios de divisão por 5)
- **Fase 20**: Dividindo por 6 (10 exercícios de divisão por 6)
- **Fase 21**: Dividindo por 7 (10 exercícios de divisão por 7)
- **Fase 22**: Dividindo por 8 (10 exercícios de divisão por 8)
- **Fase 23**: Dividindo por 9 (10 exercícios de divisão por 9)
- **Fase 24**: Dividindo por 10 (10 exercícios de divisão por 10)
- **Disponível desde o início** - Primeira fase desbloqueada
- Visualização de distribuição em grupos iguais (ex: 12 elementos em 3 grupos = 4 cada)
- Apenas divisões exatas (sem resto)
- Questões em ordem sequencial

### 📚 Modos de Aprendizado
- **Modo Aprender** (`/learn`): Visualização com elementos visuais + prática
  - Escolhe mundos temáticos
  - Vê exemplos visuais antes de praticar
  - Pode acessar visualizações por operação
  - Adição: mostra soma de elementos
  - Subtração: mostra remoção de elementos
  - Multiplicação: mostra grupos de elementos
  - Divisão: mostra distribuição em grupos iguais
- **Modo Prática** (`/practice`): Exercícios diretos
  - Lista direta de todas as fases
  - Vai direto para as questões
  - Sem visualizações prévias
  - Ideal para treino rápido

### 🗺️ Sistema de Progressão
- **Todos os reinos disponíveis desde o início**
  - 🏰 Reino das Somas - Desbloqueado
  - 🌳 Floresta das Subtrações - Desbloqueado
  - 🏴‍☠️ Ilha da Multiplicação - Desbloqueado
  - 🚀 Planeta da Divisão - Desbloqueado
- **Dentro de cada reino**: fases desbloqueiam sequencialmente
- **Após completar uma tabuada**: opção de repetir ou ir para próxima
- **Navegação inteligente**: botão "Próxima Tabuada" aparece automaticamente

### 🎯 Sistema de Recompensas
- XP por questão correta (+10 XP)
- XP por fase completada (50-200 XP)
- Moedas por fase completada (10-50 moedas)
- Sistema de estrelas (1-3 baseado na performance)

### 🏆 Sistema de Conquistas
- **23 Conquistas** divididas em 5 categorias
  - 📚 Aprendizado: Responder questões
  - 🔥 Consistência: Manter streak
  - 🎯 Maestria: Acertos e fases perfeitas
  - 🗺️ Exploração: Completar mundos
  - ⬆️ Progresso: Níveis e moedas
- **4 Tiers**: Bronze 🥉, Prata 🥈, Ouro 🥇, Platina 💎
- Recompensas automáticas ao desbloquear
- Barra de progresso para cada conquista

### 🎯 Missões Diárias
- **3 missões novas por dia**
- **5 tipos diferentes**:
  - Responder questões
  - Acertos consecutivos
  - Completar fases
  - Ganhar XP
  - Praticar operação específica
- **3 níveis de dificuldade**: Fácil ⭐, Médio ⭐⭐, Difícil ⭐⭐⭐
- Recompensas em XP e moedas
- Renovação automática às 00:00

### 🎊 Sistema de Celebração
- **Modal de Conquista Desbloqueada**
  - Animação de entrada com confetti
  - Exibe tier da conquista
  - Mostra recompensas (XP e moedas)
  - Aparece automaticamente ao desbloquear
- **Modal de Level Up**
  - Celebração especial com confetti
  - Animação 3D do número do nível
  - Mensagem motivacional
- **Confetti**
  - 50-80 partículas coloridas
  - Animação de queda realista
  - Aparece em conclusões de fase e conquistas

### 😊 Mascote Interativo
- **5 humores diferentes**:
  - 😊 Feliz - Para encorajamento geral
  - 🤩 Animado - Para grandes conquistas
  - 🤔 Pensando - Para momentos de reflexão
  - 🎉 Celebração - Para vitórias
  - 💪 Encorajador - Para motivar
- **Mensagens contextuais** para momentos-chave
- **Balão de fala animado**
- **Auto-hide** após 5 segundos

### 📚 Onboarding/Tutorial
- **5 passos explicativos** na primeira visita
- Introduz os conceitos principais:
  - Jogabilidade gamificada
  - Exploração de mundos
  - Conquistas e missões
  - Sistema de XP e níveis
- **Indicadores de progresso** visuais
- **Opção de pular** o tutorial
- **Nunca mais aparece** após conclusão

## 📝 Próximos Passos

### Fase 8 - Validação com Usuário Real 🧪

**Objetivo:** Observar uma criança utilizando a aplicação.

**Perguntas a responder:**
- O que ela mais usa?
- Onde ela desiste?
- Quais desafios ela gosta?
- O que gera mais engajamento?

**IMPORTANTE:** Somente após essa etapa de validação considerar:
- Backend e autenticação
- Sistema multiusuário
- Painel dos pais
- Novas funcionalidades

---

**Todas as 7 tasks do MVP foram completadas! ✅**

O aplicativo está pronto para validação com usuários reais.

---

Desenvolvido com ❤️ para crianças aprenderem brincando
