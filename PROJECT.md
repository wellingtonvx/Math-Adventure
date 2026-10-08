# Projeto: Math Adventure

## Visão Geral

O objetivo deste projeto é criar uma aplicação web educacional gamificada para ajudar crianças de 6 a 10 anos a aprender matemática de forma divertida, intuitiva e motivadora.

O sistema será desenvolvido em Next.js e terá foco principal em dispositivos móveis.

A aplicação deve ser pensada como um produto educacional infantil completo, e não apenas como uma sequência de exercícios matemáticos.

O principal objetivo é fazer com que a criança tenha vontade de voltar todos os dias para aprender.

---

# Público-Alvo

## Primário

- Crianças entre 6 e 10 anos
- Alunos do 2º ao 5º ano do Ensino Fundamental

## Secundário

- Pais
- Responsáveis
- Professores

---

# Objetivos Pedagógicos

Ensinar:

- Adição
- Subtração
- Multiplicação
- Divisão

Utilizando:

- Repetição espaçada
- Aprendizado progressivo
- Reforço positivo
- Representações visuais
- Gamificação

---

# Princípios de UX

## A criança sempre deve sentir progresso

Evitar:

- Telas complexas
- Muito texto
- Menus profundos
- Sensação de fracasso

Priorizar:

- Recompensas constantes
- Feedback imediato
- Elementos visuais
- Interações simples

---

# Estrutura de Sessões

O sistema NÃO deve incentivar sessões longas.

Toda experiência deve ser baseada em sessões curtas.

## Duração ideal

5 a 10 minutos

Após esse período:

- sugerir pausa
- exibir conquistas
- salvar progresso

Exemplo:

"Parabéns! Você completou sua missão de hoje! 🎉"

---

# Jornada de Aprendizado

## Mundo 1

Somas até 10

### Fases

- 1 + 1
- 2 + 1
- 2 + 2
- até completar

Objetivo:

Entender conceito de soma.

---

## Mundo 2

Somas até 20

---

## Mundo 3

Subtrações simples

---

## Mundo 4

Subtrações avançadas

---

## Mundo 5

Tabuada do 2

---

## Mundo 6

Tabuada do 3

---

## Mundo 7

Tabuada do 4

---

## Mundo 8

Tabuada do 5

---

## Mundo 9

Multiplicação intermediária

---

## Mundo 10

Divisão simples

---

## Mundo 11

Operações misturadas

---

## Mundo 12

Desafios avançados

---

# Sistema de Progressão

Cada atividade gera:

- XP
- Estrelas
- Moedas

Exemplo:

Resposta correta:

+10 XP
+1 estrela

Desafio concluído:

+50 XP
+5 moedas

---

# Sistema de Níveis

Nível 1 → 100 XP

Nível 2 → 250 XP

Nível 3 → 500 XP

Nível 4 → 1000 XP

E assim sucessivamente.

---

# Sistema de Conquistas

Exemplos:

Primeira Vitória

Acertar 10 contas

Mestre da Soma

Completar todas as somas

Rei da Multiplicação

Completar todas as tabuadas

Estudioso

7 dias consecutivos

Lenda da Matemática

100% do jogo

---

# Mascote

Criar um mascote amigável.

Características:

- divertido
- positivo
- educativo

Responsabilidades:

- ensinar
- incentivar
- comemorar conquistas
- explicar erros

Exemplos:

"Você conseguiu! 🎉"

"Muito bem!"

"Vamos tentar novamente?"

"Olha essa dica 👀"

---

# Modos de Jogo

## Aprender

Modo visual.

Exemplo:

3 × 4

🍎🍎🍎🍎

🍎🍎🍎🍎

🍎🍎🍎🍎

Resultado:

12

Explicação:

4 + 4 + 4

---

## Praticar

Perguntas simples.

Exemplo:

5 × 2 = ?

Botões grandes.

---

## Desafio Rápido

Tempo limitado.

Exemplo:

60 segundos.

Objetivo:

Acertar o máximo possível.

---

## Missão Diária

Gerada automaticamente.

Exemplos:

- Acertar 10 contas
- Completar uma fase
- Ganhar 100 XP

---

## Arena

Mistura operações.

Dificuldade progressiva.

---

# Gamificação

## Moedas

Utilizadas para desbloquear:

- avatares
- roupas
- fundos
- mascotes

---

## Estrelas

Utilizadas para:

- desbloquear fases

---

## XP

Utilizado para:

- subir de nível

---

# Sistema de Streak

Sequência diária.

Exemplo:

🔥 5 dias seguidos

Recompensas crescentes.

---

# Área dos Pais

Acesso separado.

Mostrar:

- tempo estudado
- progresso
- acertos
- erros
- fases concluídas
- sequência diária

---

# Sons

Criar efeitos para:

- acerto
- erro
- conquista
- moedas
- estrelas
- conclusão de fase

Adicionar opção:

"Desativar sons"

---

# Acessibilidade

Garantir:

- botões grandes
- contraste adequado
- suporte a toque
- textos legíveis

---

# Responsividade

Mobile First.

Prioridade:

1. Smartphones
2. Tablets
3. Desktop

---

# Tecnologias

## Obrigatórias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion

---

## Persistência

A primeira versão do projeto deve utilizar exclusivamente LocalStorage.

Objetivos:

- simplicidade
- velocidade de desenvolvimento
- funcionamento offline
- ausência de login
- foco total na experiência da criança

Todos os dados de progresso devem ser armazenados localmente.

Exemplos:

- XP
- nível
- moedas
- streak
- fases concluídas
- conquistas
- configurações

O sistema deve possuir uma camada de abstração de persistência para permitir futura migração para Supabase sem alterar as regras de negócio.

---

# Estrutura Inicial

src/

app/

components/

features/

game/

learning/

challenges/

achievements/

store/

hooks/

services/

data/

types/

assets/

sounds/

images/

---

# Diretrizes para Claude

IMPORTANTE:

Antes de implementar qualquer tela:

1. Ler este documento inteiro.
2. Criar plano técnico.
3. Identificar componentes reutilizáveis.
4. Definir arquitetura.
5. Definir stores.
6. Definir tipos.
7. Definir fluxo de navegação.
8. Validar dependências.

---

# Estratégia de Implementação

Executar em etapas.

## Etapa 1

Infraestrutura

- Setup Next.js
- Tailwind
- Zustand
- Estrutura de pastas
- Layout base

Entrega completa antes de avançar.

---

## Etapa 2

Sistema de navegação

- Home
- Menu principal
- Jornada

Entrega completa antes de avançar.

---

## Etapa 3

Sistema de progresso

- XP
- Estrelas
- Moedas
- Streak

Entrega completa antes de avançar.

---

## Etapa 4

Modo Aprender

Entrega completa antes de avançar.

---

## Etapa 5

Modo Praticar

Entrega completa antes de avançar.

---

## Etapa 6

Desafios

Entrega completa antes de avançar.

---

## Etapa 7

Conquistas

Entrega completa antes de avançar.

---

## Etapa 8

Painel dos Pais (Futuro)

Não faz parte do MVP.

O foco inicial é exclusivamente a experiência da criança.

---

## Regra Fundamental

Claude deve concluir e validar cada etapa antes de iniciar a próxima.

Não implementar funcionalidades futuras sem concluir a etapa atual.

Não alterar padrões visuais já estabelecidos.

Não criar componentes duplicados.

Sempre reutilizar componentes existentes.

Sempre manter consistência visual e arquitetural em todo o projeto.

# Filosofia do MVP

Sempre priorizar:

1. Diversão
2. Aprendizado
3. Simplicidade

Evitar:

- cadastros
- formulários
- configurações complexas
- fluxos administrativos

A criança deve conseguir abrir o aplicativo e começar a jogar em menos de 10 segundos.



Nenhuma funcionalidade futura deve ser construída antes que pelo menos uma criança utilize e valide a funcionalidade atual.

Decisões devem ser guiadas pelo uso real e não por possibilidades futuras.
