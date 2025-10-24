/**
 * Strategic technique selector for prompt optimization
 */

import type { AnalysisResult, TechniqueApplication, PromptingTechnique } from './types.js';
import { TECHNIQUES, MANDATORY_TECHNIQUES, SITUATIONAL_TECHNIQUES } from './techniques.js';

export class TechniqueSelector {
  
  /**
   * Selects appropriate techniques based on analysis
   * Returns 3-4 techniques maximum (Golden Rule)
   */
  selectTechniques(analysis: AnalysisResult): TechniqueApplication[] {
    const applications: TechniqueApplication[] = [];
    
    // Always include mandatory techniques
    applications.push(...this.applyMandatoryTechniques(analysis));
    
    // Select 1-2 situational techniques
    const situational = this.selectSituationalTechniques(analysis);
    applications.push(...situational.slice(0, 2));
    
    return applications;
  }
  
  /**
   * Applies mandatory techniques with context
   */
  private applyMandatoryTechniques(analysis: AnalysisResult): TechniqueApplication[] {
    const applications: TechniqueApplication[] = [];
    
    // Role Prompting
    const role = this.generateRole(analysis);
    applications.push({
      technique: 'role_prompting',
      reason: 'Estabelece expertise e contexto profissional adequado',
      implementation: role
    });
    
    // IQ Attribution
    applications.push({
      technique: 'iq_attribution',
      reason: `Define nível de sofisticação ${analysis.complexityLevel}`,
      implementation: `com QI ${analysis.suggestedIQ}`
    });
    
    // Emotion Prompting (if appropriate)
    if (this.shouldUseEmotionPrompting(analysis)) {
      const emotion = this.generateEmotionPrompt(analysis);
      applications.push({
        technique: 'emotion_prompting',
        reason: 'Aumenta atenção e cuidado na resposta',
        implementation: emotion
      });
    }
    
    return applications;
  }
  
  /**
   * Selects situational techniques based on context
   */
  private selectSituationalTechniques(analysis: AnalysisResult): TechniqueApplication[] {
    const candidates: TechniqueApplication[] = [];
    
    // Fake Past Consistency - for technical/complex tasks
    if (analysis.complexityLevel === 'expert' || analysis.taskType === 'tecnica') {
      candidates.push({
        technique: 'fake_past_consistency',
        reason: 'Estabelece continuidade para tópico técnico complexo',
        implementation: this.generatePastConsistency(analysis)
      });
    }
    
    // Fake Audience - for educational tasks
    if (analysis.taskType === 'educacional' || analysis.targetAudience.includes('Estudante')) {
      candidates.push({
        technique: 'fake_audience',
        reason: 'Adapta explicação para audiência específica',
        implementation: `Explique como se apresentasse para ${analysis.targetAudience.toLowerCase()}`
      });
    }
    
    // False Restriction - for creative tasks
    if (analysis.taskType === 'criativa') {
      candidates.push({
        technique: 'false_restriction',
        reason: 'Força pensamento criativo através de restrições',
        implementation: this.generateFalseRestriction(analysis)
      });
    }
    
    // Someone Disagrees - for analytical/debate tasks
    if (analysis.taskType === 'analitica' || analysis.taskType === 'debate') {
      candidates.push({
        technique: 'someone_disagrees',
        reason: 'Estimula análise crítica através de perspectiva oposta',
        implementation: this.generateDisagreement(analysis)
      });
    }
    
    // Bet 100 Dollars - for code/technical precision
    if (analysis.taskType === 'codigo' && analysis.complexityLevel !== 'basico') {
      candidates.push({
        technique: 'bet_100_dollars',
        reason: 'Garante validação técnica rigorosa',
        implementation: 'Vamos validar com precisão extrema, como se apostássemos nisso'
      });
    }
    
    // SimToM - for mixed or complex stakeholder tasks
    if (analysis.taskType === 'mista' || analysis.implicitContext.some(c => c.includes('Cliente'))) {
      candidates.push({
        technique: 'simtom',
        reason: 'Analisa sob múltiplas perspectivas de stakeholders',
        implementation: 'Considere as perspectivas do usuário final, desenvolvedor e negócio'
      });
    }
    
    // RaR - for ambiguous requests
    if (analysis.keywords.length < 3 || analysis.mainObjective.includes('Resolver solicitação')) {
      candidates.push({
        technique: 'rar',
        reason: 'Clarifica entendimento antes de responder',
        implementation: 'Primeiro confirme o entendimento reformulando o pedido'
      });
    }
    
    // Sort by relevance and return top candidates
    return this.rankCandidates(candidates, analysis);
  }
  
  /**
   * Generates role description
   */
  private generateRole(analysis: AnalysisResult): string {
    const roleMap: Record<string, string> = {
      codigo: 'desenvolvedor senior especializado',
      tecnica: 'especialista técnico',
      criativa: 'designer criativo e inovador',
      analitica: 'analista especializado',
      educacional: 'educador experiente',
      debate: 'debatedor e pensador crítico',
      documentacao: 'technical writer especializado',
      mista: 'profissional multidisciplinar'
    };
    
    const role = roleMap[analysis.taskType] || 'especialista';
    const domain = analysis.keywords[0] || 'sua área';
    
    return `Você é um ${role} em ${domain}`;
  }
  
  /**
   * Determines if emotion prompting should be used
   */
  private shouldUseEmotionPrompting(analysis: AnalysisResult): boolean {
    return analysis.complexityLevel !== 'basico' && 
           (analysis.taskType === 'codigo' || 
            analysis.taskType === 'tecnica' ||
            analysis.implicitContext.some(c => c.includes('produção')));
  }
  
  /**
   * Generates emotion prompt
   */
  private generateEmotionPrompt(analysis: AnalysisResult): string {
    if (analysis.implicitContext.some(c => c.includes('produção'))) {
      return 'Isso é crítico para produção e requer máxima qualidade e atenção aos detalhes';
    }
    if (analysis.complexityLevel === 'expert') {
      return 'Esse é um desafio técnico importante que demanda precisão e expertise';
    }
    return 'Isso é importante e precisa ser feito com cuidado e precisão';
  }
  
  /**
   * Generates past consistency prompt
   */
  private generatePastConsistency(analysis: AnalysisResult): string {
    const topic = analysis.keywords[0] || 'esse tópico';
    return `Você me explicou anteriormente sobre ${topic}, mas agora preciso aplicar especificamente`;
  }
  
  /**
   * Generates false restriction
   */
  private generateFalseRestriction(analysis: AnalysisResult): string {
    const restrictions = [
      'Use conceitos de design moderno e minimalista',
      'Aplique princípios de UX/UI de alta qualidade',
      'Pense em termos de experiência do usuário excepcional'
    ];
    return restrictions[Math.floor(Math.random() * restrictions.length)];
  }
  
  /**
   * Generates disagreement prompt
   */
  private generateDisagreement(analysis: AnalysisResult): string {
    const topic = analysis.keywords.slice(0, 2).join(' e ');
    return `Alguns especialistas argumentam contra essa abordagem de ${topic}`;
  }
  
  /**
   * Ranks candidate techniques by relevance
   */
  private rankCandidates(
    candidates: TechniqueApplication[], 
    analysis: AnalysisResult
  ): TechniqueApplication[] {
    // Simple ranking: prefer techniques matching task type closely
    return candidates.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, analysis);
      const bScore = this.calculateRelevanceScore(b, analysis);
      return bScore - aScore;
    });
  }
  
  /**
   * Calculates relevance score for a technique
   */
  private calculateRelevanceScore(
    application: TechniqueApplication, 
    analysis: AnalysisResult
  ): number {
    let score = 0;
    
    // Higher score for techniques that match task complexity
    if (analysis.complexityLevel === 'expert') {
      if (['fake_past_consistency', 'bet_100_dollars', 'simtom'].includes(application.technique)) {
        score += 3;
      }
    }
    
    // Bonus for matching task type
    const techniqueTaskMatch: Record<string, string[]> = {
      fake_audience: ['educacional'],
      false_restriction: ['criativa'],
      someone_disagrees: ['analitica', 'debate'],
      bet_100_dollars: ['codigo'],
      simtom: ['mista']
    };
    
    const matchingTasks = techniqueTaskMatch[application.technique] || [];
    if (matchingTasks.includes(analysis.taskType)) {
      score += 5;
    }
    
    return score;
  }
}
