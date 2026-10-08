# CLAUDE.md

## Objetivo

Este documento define as regras obrigatórias de arquitetura, organização de código, padrões de desenvolvimento e UI que devem ser seguidos durante todo o projeto.

Antes de implementar qualquer funcionalidade, leia este documento integralmente.

---

# Princípios

O projeto deve seguir:

- Domain Driven Design (DDD)
- Atomic Design
- SOLID
- Clean Code
- Clean Architecture
- Mobile First
- Componentização máxima
- Reutilização de código

---

# Regra Principal

Nenhuma implementação deve ser feita sem antes verificar se já existe:

- componente reutilizável
- hook reutilizável
- serviço reutilizável
- regra de negócio reutilizável

Evitar duplicação de código.

---

# Stack

## Framework

- Next.js App Router
- React
- TypeScript

## UI

- TailwindCSS
- Framer Motion
- Lucide React

## Estado

- Zustand

## Utilitários

- date-fns

---

# Arquitetura

O projeto utiliza DDD.

Cada domínio deve possuir autonomia.

Exemplo:

src/domains

learning

challenges

achievements

profile

parent-dashboard

game

progress

---

# Estrutura

src/

app/

domains/

shared/

infrastructure/

---

# Domínios

Cada domínio deve seguir:

domains/

learning/

application/

domain/

infrastructure/

presentation/

---

# Domain

Contém apenas regras de negócio.

Nunca importar:

- React
- Next.js
- Tailwind

Exemplo:

domains/learning/domain/

entities/

value-objects/

services/

types/

---

# Application

Responsável por casos de uso.

Exemplo:

StartLessonUseCase

CompleteChallengeUseCase

GrantXpUseCase

UnlockAchievementUseCase

---

# Infrastructure

Persistência.

Exemplo:

repositories/

storage/

api/

---

# Presentation

Interface da feature.

Exemplo:

components/

hooks/

pages/

stores/

---

# Atomic Design

Toda UI deve seguir Atomic Design.

---

# Atoms

Menor unidade visual.

Exemplos:

Button

Input

Badge

Icon

Avatar

ProgressBar

Text

---

# Molecules

Combinação de atoms.

Exemplos:

QuestionCard

AchievementBadge

LevelProgress

MissionCard

RewardCard

---

# Organisms

Blocos completos.

Exemplos:

LessonSection

ChallengeSection

AchievementsSection

ParentDashboardSection

---

# Templates

Estrutura da página.

Exemplos:

GameTemplate

DashboardTemplate

LessonTemplate

---

# Pages

Montagem final.

Nunca conter regras complexas.

---

# Estrutura UI

shared/

components/

atoms/

molecules/

organisms/

templates/

---

# Design System

Todos os componentes devem utilizar tokens.

Nunca usar valores hardcoded.

Errado:

px-4
text-blue-500
rounded-xl

Correto:

tokens.spacing.md

tokens.colors.primary

tokens.radius.lg

---

# Tokens

shared/design-system/

tokens/

colors.ts

spacing.ts

radius.ts

typography.ts

shadows.ts

animations.ts

z-index.ts

---

# Responsividade

Prioridade:

1 Mobile
2 Tablet
3 Desktop

Todo componente deve nascer mobile first.

---

# Acessibilidade

Obrigatório:

- aria-label
- navegação por teclado
- contraste adequado
- áreas de toque mínimas de 44px

---

# Estado Global

Utilizar Zustand.

Dividir stores por domínio.

Exemplo:

stores/

useProgressStore

useGameStore

useChallengeStore

useProfileStore

---


# Persistência

O projeto deve utilizar LocalStorage.

Não utilizar:

- banco de dados
- Supabase
- APIs
- autenticação

Criar abstração obrigatória:

StorageProvider

LocalStorageProvider

Toda leitura e gravação deve passar por essa camada.

Nunca acessar localStorage diretamente dentro de componentes React.

---

# Navegação

Utilizar App Router.

Nunca utilizar lógica de negócio diretamente em páginas.

---

# Estrutura de Rotas

/

/learn

/challenges

/journey

/achievements

/profile

/parent-dashboard

/settings

---

# Convenções

## Componentes

PascalCase

Exemplo:

LessonCard.tsx

ChallengeCard.tsx

ProgressBar.tsx

---

## Hooks

useNomeDoHook

Exemplo:

useProgress

useChallenges

useJourney

---

## Casos de Uso

Nome + UseCase

Exemplo:

GrantXpUseCase

CompleteLessonUseCase

UnlockRewardUseCase

---

# Regras para Claude

Antes de implementar qualquer funcionalidade:

1. Identificar domínio.
2. Identificar caso de uso.
3. Criar entidades.
4. Criar tipos.
5. Criar componentes.
6. Criar testes de integração da feature.
7. Implementar UI.

Nunca começar pela tela.

---

# Regras de UI

A aplicação é destinada para crianças.

Portanto:

- Botões grandes
- Pouco texto
- Ícones grandes
- Feedback visual constante
- Navegação simples

---

# Regras de Gamificação

Toda ação relevante deve gerar feedback.

Exemplos:

Acertou pergunta:

- XP
- animação
- som

Completou fase:

- moedas
- estrelas
- animação

Subiu de nível:

- celebração
- recompensa

---

# Mascote

O mascote deve ser tratado como componente global.

Exemplo:

MascotAssistant

Funções:

- dicas
- incentivo
- onboarding
- tutoriais

---

# Performance

Objetivo:

Lighthouse acima de 90.

Priorizar:

- lazy loading
- dynamic imports
- memoização
- server components quando possível

---

# Qualidade

Antes de finalizar qualquer tarefa:

- verificar duplicação
- verificar acessibilidade
- verificar responsividade
- verificar consistência visual
- verificar reutilização

---

# Regra Final

Sempre priorizar:

1. Reutilização
2. Consistência
3. Simplicidade
4. Escalabilidade

Nunca criar soluções rápidas que comprometam a arquitetura futura do projeto.

Nenhuma funcionalidade futura deve ser construída antes que pelo menos uma criança utilize e valide a funcionalidade atual.

Decisões devem ser guiadas pelo uso real e não por possibilidades futuras.
