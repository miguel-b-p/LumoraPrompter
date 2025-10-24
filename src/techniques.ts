/**
 * Prompting techniques definitions and registry
 */

import type { TechniqueDefinition, PromptingTechnique } from './types.js';

export const TECHNIQUES: Record<PromptingTechnique, TechniqueDefinition> = {
  role_prompting: {
    name: 'role_prompting',
    displayName: 'Role Prompting',
    description: 'Atribui um papel específico e relevante à IA',
    whenToUse: ['sempre', 'qualquer tarefa'],
    example: 'Você é um desenvolvedor senior especializado em...',
    isMandatory: true
  },
  
  emotion_prompting: {
    name: 'emotion_prompting',
    displayName: 'Emotion Prompting',
    description: 'Adiciona peso emocional para aumentar a atenção',
    whenToUse: ['tarefas críticas', 'alta precisão necessária'],
    example: 'Isso é crucial para o projeto e precisa ser perfeito',
    isMandatory: true
  },
  
  iq_attribution: {
    name: 'iq_attribution',
    displayName: 'Atribuir QI/Expertise',
    description: 'Define o nível de sofisticação esperado',
    whenToUse: ['sempre', 'definir nível de expertise'],
    example: 'com QI 160 e profundo conhecimento em...',
    isMandatory: true
  },
  
  fake_past_consistency: {
    name: 'fake_past_consistency',
    displayName: 'Fingir Consistência Passada',
    description: 'Cria contexto de conversa prévia',
    whenToUse: ['tópicos técnicos complexos', 'continuidade contextual'],
    example: 'Você me explicou anteriormente sobre renderização 3D...',
    isMandatory: false
  },
  
  fake_audience: {
    name: 'fake_audience',
    displayName: 'Finja uma Plateia',
    description: 'Define uma audiência específica para adaptar a explicação',
    whenToUse: ['explicações didáticas', 'apresentações', 'ensino'],
    example: 'Explique como se apresentasse para estudantes de graduação',
    isMandatory: false
  },
  
  obviously: {
    name: 'obviously',
    displayName: 'Obviamente...',
    description: 'Usa afirmação controversa para gerar análise crítica',
    whenToUse: ['debates', 'comparações', 'análise crítica'],
    example: 'Obviamente React é melhor que Vue, certo?',
    isMandatory: false
  },
  
  false_restriction: {
    name: 'false_restriction',
    displayName: 'Restrição Falsa',
    description: 'Impõe limitações criativas para forçar analogias',
    whenToUse: ['criatividade', 'explicações analogias', 'inovação'],
    example: 'Explique usando apenas analogias de culinária',
    isMandatory: false
  },
  
  version_2: {
    name: 'version_2',
    displayName: 'Versão 2.0',
    description: 'Solicita iteração melhorada de algo existente',
    whenToUse: ['iteração', 'melhoria', 'inovação'],
    example: 'Crie uma Versão 2.0 com abordagem completamente nova',
    isMandatory: false
  },
  
  someone_disagrees: {
    name: 'someone_disagrees',
    displayName: 'Alguém Discorda',
    description: 'Apresenta visão oposta para análise profunda',
    whenToUse: ['análise crítica', 'validação de ideias', 'debate'],
    example: 'Meu colega diz que microserviços são overhead desnecessário',
    isMandatory: false
  },
  
  bet_100_dollars: {
    name: 'bet_100_dollars',
    displayName: 'Apostar 100 Dólares',
    description: 'Cria aposta para validação rigorosa',
    whenToUse: ['validação técnica', 'code review', 'precisão extrema'],
    example: 'Vamos apostar $100 que esse código está bug-free',
    isMandatory: false
  },
  
  simtom: {
    name: 'simtom',
    displayName: 'SimToM (Theory of Mind)',
    description: 'Adota múltiplas perspectivas de diferentes entidades',
    whenToUse: ['análise multiperspectiva', 'stakeholders', 'UX'],
    example: 'Analise da perspectiva do usuário, do desenvolvedor e do negócio',
    isMandatory: false
  },
  
  re2: {
    name: 're2',
    displayName: 'RE2 (Leia Duas Vezes)',
    description: 'Força releitura e análise profunda',
    whenToUse: ['análise complexa', 'compreensão profunda'],
    example: 'Leia o requisito duas vezes antes de responder',
    isMandatory: false
  },
  
  rar: {
    name: 'rar',
    displayName: 'RaR (Rephrase and Respond)',
    description: 'Reformula a pergunta antes de responder',
    whenToUse: ['clarificação', 'ambiguidade', 'confirmação'],
    example: 'Primeiro reformule o que entendeu, depois responda',
    isMandatory: false
  }
};

export const MANDATORY_TECHNIQUES: PromptingTechnique[] = Object.values(TECHNIQUES)
  .filter(t => t.isMandatory)
  .map(t => t.name);

export const SITUATIONAL_TECHNIQUES: PromptingTechnique[] = Object.values(TECHNIQUES)
  .filter(t => !t.isMandatory)
  .map(t => t.name);
