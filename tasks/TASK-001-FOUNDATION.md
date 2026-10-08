# TASK-001-FOUNDATION

## Objetivo

Criar a fundação completa do projeto Math Adventure.

Nenhuma funcionalidade de matemática deve ser implementada nesta etapa.

O foco é exclusivamente arquitetura, design system e experiência inicial.

---

## Documentos Obrigatórios

Antes de iniciar:

- PROJECT.md
- CLAUDE.md
- ROADMAP.md

---

## Escopo

### Setup

Configurar:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- ESLint
- Prettier

---

### Arquitetura

Implementar:

- DDD simplificado
- Atomic Design
- Design System
- Storage Layer

---

### Persistência

Criar:

StorageProvider

LocalStorageProvider

Nenhum acesso direto ao localStorage fora da camada de persistência.

---

### Design System

Criar:

- colors
- spacing
- radius
- shadows
- typography
- animations

---

### Atomic Design

#### Atoms

- Button
- Card
- Text
- Heading
- Icon
- Badge
- ProgressBar

#### Molecules

- XPIndicator
- CoinIndicator
- StreakIndicator
- LevelIndicator

#### Organisms

- HomeHeader
- JourneyPreview
- DailyMissionPreview

#### Templates

- AppTemplate
- GameTemplate

---

### Home

Criar tela inicial contendo:

- Saudação
- XP
- Nível
- Moedas
- Streak

Cards:

- Aprender
- Jornada
- Desafios
- Conquistas

---

## Critérios de Aceite

- Responsivo
- Mobile First
- Estrutura DDD criada
- Atomic Design criado
- Home funcional
- Persistência funcionando
- Sem código duplicado

---

## Não Implementar

- Matemática
- Quiz
- Missões
- Conquistas
- Sons
- Mascote
- Supabase
- Login

Aguardar aprovação após conclusão.
