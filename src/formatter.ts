/**
 * Prompt formatter - builds the final optimized prompt with proper structure
 */

import type { AnalysisResult, TechniqueApplication } from './types.js';
import { TECHNIQUES } from './techniques.js';

export class PromptFormatter {
  
  /**
   * Builds the complete optimized prompt
   */
  buildOptimizedPrompt(
    originalRequest: string,
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): string {
    const sections: string[] = [];
    
    // 1. Role and IQ assignment (mandatory)
    sections.push(this.buildRoleSection(techniques, analysis));
    
    // 2. Past consistency if applicable
    const pastConsistency = techniques.find(t => t.technique === 'fake_past_consistency');
    if (pastConsistency) {
      sections.push(`\n**Contexto Prévio**: ${pastConsistency.implementation}`);
    }
    
    // 3. Emotion/importance if applicable
    const emotion = techniques.find(t => t.technique === 'emotion_prompting');
    if (emotion) {
      sections.push(`\n**Tarefa Crítica**: ${emotion.implementation}`);
    }
    
    // 4. Main task description
    sections.push(this.buildTaskSection(originalRequest, analysis));
    
    // 5. Requirements and specifications
    sections.push(this.buildRequirementsSection(analysis, techniques));
    
    // 6. Additional technique applications
    sections.push(this.buildAdditionalTechniques(techniques));
    
    // 7. Output expectations
    sections.push(this.buildOutputSection(analysis));
    
    return sections.filter(s => s.length > 0).join('\n\n');
  }
  
  /**
   * Builds role and expertise section
   */
  private buildRoleSection(
    techniques: TechniqueApplication[],
    analysis: AnalysisResult
  ): string {
    const role = techniques.find(t => t.technique === 'role_prompting');
    const iq = techniques.find(t => t.technique === 'iq_attribution');
    
    if (!role || !iq) {
      return '';
    }
    
    const expertise = analysis.keywords.slice(0, 2).join(' e ');
    return `${role.implementation} ${iq.implementation} e profundo conhecimento em ${expertise}.`;
  }
  
  /**
   * Builds main task section
   */
  private buildTaskSection(originalRequest: string, analysis: AnalysisResult): string {
    return `**Tarefa Principal**:\n\n${this.enhanceRequest(originalRequest, analysis)}`;
  }
  
  /**
   * Enhances the original request with clarity
   */
  private enhanceRequest(request: string, analysis: AnalysisResult): string {
    // If request is already detailed, return as is
    if (request.length > 100) {
      return request;
    }
    
    // Otherwise, add context
    return `${request}\n\n*Objetivo*: ${analysis.mainObjective}`;
  }
  
  /**
   * Builds requirements section
   */
  private buildRequirementsSection(
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): string {
    const requirements: string[] = [];
    
    // Add quality requirements based on complexity
    if (analysis.complexityLevel === 'expert' || analysis.complexityLevel === 'avancado') {
      requirements.push('Código/solução otimizada e seguindo melhores práticas');
      requirements.push('Comentários explicativos detalhados');
    }
    
    // Add structure requirements
    if (analysis.taskType === 'codigo') {
      requirements.push('Código completo e imediatamente executável');
      requirements.push('Tratamento de erros apropriado');
    }
    
    // Add documentation requirements
    if (analysis.complexityLevel !== 'basico') {
      requirements.push('Documentação clara de decisões técnicas');
    }
    
    // SimToM perspective requirement
    const simtom = techniques.find(t => t.technique === 'simtom');
    if (simtom) {
      requirements.push(simtom.implementation);
    }
    
    if (requirements.length === 0) {
      return '';
    }
    
    return `## Requisitos:\n\n${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
  }
  
  /**
   * Builds additional technique applications
   */
  private buildAdditionalTechniques(techniques: TechniqueApplication[]): string {
    const sections: string[] = [];
    
    // Fake audience
    const audience = techniques.find(t => t.technique === 'fake_audience');
    if (audience) {
      sections.push(`**Audiência**: ${audience.implementation}`);
    }
    
    // False restriction
    const restriction = techniques.find(t => t.technique === 'false_restriction');
    if (restriction) {
      sections.push(`**Abordagem**: ${restriction.implementation}`);
    }
    
    // Someone disagrees
    const disagree = techniques.find(t => t.technique === 'someone_disagrees');
    if (disagree) {
      sections.push(`**Consideração Importante**: ${disagree.implementation}. Considere isso na sua resposta.`);
    }
    
    // Bet
    const bet = techniques.find(t => t.technique === 'bet_100_dollars');
    if (bet) {
      sections.push(`**Validação**: ${bet.implementation}`);
    }
    
    // RaR
    const rar = techniques.find(t => t.technique === 'rar');
    if (rar) {
      sections.push(`**Antes de Responder**: ${rar.implementation}`);
    }
    
    return sections.join('\n\n');
  }
  
  /**
   * Builds output expectations section
   */
  private buildOutputSection(analysis: AnalysisResult): string {
    const expectations: string[] = [];
    
    if (analysis.taskType === 'codigo') {
      expectations.push('Código completo e funcional');
      expectations.push('Explicação das decisões técnicas');
      expectations.push('Exemplos de uso quando apropriado');
    } else if (analysis.taskType === 'educacional') {
      expectations.push('Explicação clara e didática');
      expectations.push('Exemplos práticos');
      expectations.push('Conceitos fundamentais destacados');
    } else if (analysis.taskType === 'analitica') {
      expectations.push('Análise comparativa detalhada');
      expectations.push('Prós e contras de cada opção');
      expectations.push('Recomendação fundamentada');
    }
    
    if (expectations.length === 0) {
      return '';
    }
    
    return `## Formato da Resposta:\n\n${expectations.map((e, i) => `- ${e}`).join('\n')}`;
  }
  
  /**
   * Builds technical justification section
   */
  buildJustification(
    techniques: TechniqueApplication[],
    analysis: AnalysisResult
  ): {
    techniques: Array<{ name: string; reason: string }>;
    expectedImprovements: string[];
  } {
    const techniqueJustifications = techniques.map(t => ({
      name: TECHNIQUES[t.technique].displayName,
      reason: t.reason
    }));
    
    const improvements = this.identifyImprovements(analysis, techniques);
    
    return {
      techniques: techniqueJustifications,
      expectedImprovements: improvements
    };
  }
  
  /**
   * Identifies expected improvements
   */
  private identifyImprovements(
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): string[] {
    const improvements: string[] = [];
    
    // Role prompting improvement
    if (techniques.some(t => t.technique === 'role_prompting')) {
      improvements.push('Resposta mais contextualizada e profissional');
    }
    
    // IQ attribution improvement
    if (techniques.some(t => t.technique === 'iq_attribution')) {
      improvements.push(`Profundidade de resposta apropriada para nível ${analysis.complexityLevel}`);
    }
    
    // Emotion prompting improvement
    if (techniques.some(t => t.technique === 'emotion_prompting')) {
      improvements.push('Maior atenção a detalhes e qualidade');
    }
    
    // Task-specific improvements
    if (analysis.taskType === 'codigo') {
      improvements.push('Código mais robusto e bem estruturado');
      improvements.push('Melhores práticas aplicadas consistentemente');
    } else if (analysis.taskType === 'educacional') {
      improvements.push('Explicação mais clara e didática');
      improvements.push('Conceitos mais bem exemplificados');
    }
    
    // Complexity-based improvements
    if (analysis.complexityLevel === 'expert') {
      improvements.push('Abordagem mais sofisticada e otimizada');
      improvements.push('Consideração de edge cases e cenários complexos');
    }
    
    // Technique-specific improvements
    if (techniques.some(t => t.technique === 'fake_past_consistency')) {
      improvements.push('Maior coerência e continuidade técnica');
    }
    if (techniques.some(t => t.technique === 'simtom')) {
      improvements.push('Análise multi-perspectiva mais completa');
    }
    if (techniques.some(t => t.technique === 'bet_100_dollars')) {
      improvements.push('Validação técnica mais rigorosa');
    }
    
    return improvements;
  }
}
