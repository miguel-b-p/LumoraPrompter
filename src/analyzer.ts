/**
 * Request analyzer using RE2 (Read Twice) methodology
 */

import type { AnalysisResult, TaskType, ComplexityLevel } from './types.js';

export class RequestAnalyzer {
  
  /**
   * Analyzes a user request using RE2 methodology
   */
  analyze(userRequest: string, context?: string): AnalysisResult {
    // ETAPA 1: PRIMEIRA LEITURA
    const firstReading = this.firstReading(userRequest, context);
    
    // ETAPA 2: SEGUNDA LEITURA (RaR - Rephrase and Respond)
    const secondReading = this.secondReading(userRequest, firstReading);
    
    return secondReading;
  }
  
  /**
   * First reading: Initial identification
   */
  private firstReading(userRequest: string, context?: string) {
    const taskType = this.identifyTaskType(userRequest);
    const complexityLevel = this.assessComplexity(userRequest);
    const keywords = this.extractKeywords(userRequest);
    
    return {
      taskType,
      complexityLevel,
      keywords,
      hasContext: !!context
    };
  }
  
  /**
   * Second reading: Deep analysis and refinement
   */
  private secondReading(userRequest: string, firstReading: any): AnalysisResult {
    const mainObjective = this.identifyMainObjective(userRequest, firstReading);
    const implicitContext = this.extractImplicitContext(userRequest, firstReading);
    const targetAudience = this.identifyAudience(userRequest, firstReading);
    const suggestedIQ = this.suggestIQLevel(firstReading.complexityLevel);
    
    return {
      taskType: firstReading.taskType,
      mainObjective,
      complexityLevel: firstReading.complexityLevel,
      implicitContext,
      targetAudience,
      suggestedIQ,
      keywords: firstReading.keywords
    };
  }
  
  /**
   * Identifies the type of task
   */
  private identifyTaskType(request: string): TaskType {
    const lowerRequest = request.toLowerCase();
    
    // Patterns for task identification
    const patterns: Record<TaskType, string[]> = {
      codigo: ['código', 'programa', 'função', 'class', 'implementar', 'debug', 'refactor', 'bug', 'script', 'api'],
      tecnica: ['como fazer', 'técnica', 'método', 'processo', 'algoritmo', 'otimizar', 'configurar', 'setup'],
      criativa: ['criar', 'design', 'arte', 'criativo', 'inovador', 'imaginar', 'inventar', 'ascii art', 'logo'],
      analitica: ['analisar', 'comparar', 'avaliar', 'qual melhor', 'diferença', 'prós e contras', 'vs'],
      educacional: ['explicar', 'ensinar', 'como funciona', 'o que é', 'tutorial', 'aprender', 'entender'],
      debate: ['discutir', 'argumentar', 'opinião', 'debate', 'controverso', 'melhor', 'pior'],
      documentacao: ['documentar', 'documentação', 'readme', 'comentar', 'especificar', 'descrever'],
      mista: []
    };
    
    const scores: Partial<Record<TaskType, number>> = {};
    
    for (const [type, keywords] of Object.entries(patterns)) {
      const score = keywords.filter(keyword => lowerRequest.includes(keyword)).length;
      if (score > 0) {
        scores[type as TaskType] = score;
      }
    }
    
    // If multiple types match, it's mixed
    const matchedTypes = Object.keys(scores);
    if (matchedTypes.length > 2) {
      return 'mista';
    }
    
    // Return type with highest score
    const topType = Object.entries(scores).sort(([, a], [, b]) => b - a)[0];
    return topType ? (topType[0] as TaskType) : 'tecnica';
  }
  
  /**
   * Assesses complexity level
   */
  private assessComplexity(request: string): ComplexityLevel {
    const lowerRequest = request.toLowerCase();
    
    const expertIndicators = ['avançado', 'expert', 'complexo', 'otimizado', 'performance', 'arquitetura', 'escalável', '3d', 'algoritmo'];
    const intermediateIndicators = ['melhorar', 'refatorar', 'estruturar', 'organizar', 'integrar', 'api'];
    const basicIndicators = ['simples', 'básico', 'iniciante', 'exemplo', 'hello world', 'tutorial'];
    
    const expertScore = expertIndicators.filter(word => lowerRequest.includes(word)).length;
    const intermediateScore = intermediateIndicators.filter(word => lowerRequest.includes(word)).length;
    const basicScore = basicIndicators.filter(word => lowerRequest.includes(word)).length;
    
    // Length and technical terms also indicate complexity
    const wordCount = request.split(/\s+/).length;
    const hasCodeTerms = /\b(class|function|async|await|api|database|server)\b/i.test(request);
    
    if (expertScore > 0 || (wordCount > 30 && hasCodeTerms)) {
      return 'expert';
    }
    if (intermediateScore > 0 || wordCount > 20) {
      return 'avancado';
    }
    if (basicScore > 0) {
      return 'basico';
    }
    
    return 'intermediario';
  }
  
  /**
   * Extracts key terms from request
   */
  private extractKeywords(request: string): string[] {
    const words = request.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
      .filter(word => !/^(para|isso|esse|este|como|fazer|criar|você|pode|deve|quero|preciso)$/.test(word));
    
    // Remove duplicates and return top 5
    return [...new Set(words)].slice(0, 5);
  }
  
  /**
   * Identifies the main objective
   */
  private identifyMainObjective(request: string, firstReading: any): string {
    const { taskType, keywords } = firstReading;
    
    // Use task type and keywords to formulate objective
    const objectiveTemplates: Record<TaskType, string> = {
      codigo: `Implementar código para ${keywords.slice(0, 2).join(' e ')}`,
      tecnica: `Explicar técnica/método de ${keywords[0] || 'processo'}`,
      criativa: `Criar solução criativa para ${keywords[0] || 'projeto'}`,
      analitica: `Analisar e comparar ${keywords.slice(0, 2).join(' vs ')}`,
      educacional: `Ensinar conceito de ${keywords[0] || 'tópico'}`,
      debate: `Debater argumentos sobre ${keywords[0] || 'tema'}`,
      documentacao: `Documentar ${keywords[0] || 'projeto'}`,
      mista: `Realizar tarefa complexa envolvendo ${keywords.slice(0, 2).join(' e ')}`
    };
    
    return objectiveTemplates[taskType as TaskType] || 'Resolver solicitação do usuário';
  }
  
  /**
   * Extracts implicit context
   */
  private extractImplicitContext(request: string, firstReading: any): string[] {
    const context: string[] = [];
    const lowerRequest = request.toLowerCase();
    
    // Technology stack inference
    if (lowerRequest.includes('node') || lowerRequest.includes('javascript') || lowerRequest.includes('npm')) {
      context.push('Ambiente Node.js/JavaScript');
    }
    if (lowerRequest.includes('python')) {
      context.push('Ambiente Python');
    }
    if (lowerRequest.includes('react') || lowerRequest.includes('vue') || lowerRequest.includes('angular')) {
      context.push('Frontend framework');
    }
    
    // Purpose inference
    if (lowerRequest.includes('produção') || lowerRequest.includes('production')) {
      context.push('Código para produção - alta qualidade necessária');
    }
    if (lowerRequest.includes('aprender') || lowerRequest.includes('estudar')) {
      context.push('Finalidade educacional');
    }
    
    // Quality indicators
    if (firstReading.complexityLevel === 'expert') {
      context.push('Necessita abordagem profissional e otimizada');
    }
    
    return context;
  }
  
  /**
   * Identifies target audience
   */
  private identifyAudience(request: string, firstReading: any): string {
    const lowerRequest = request.toLowerCase();
    
    if (lowerRequest.includes('cliente') || lowerRequest.includes('apresentar')) {
      return 'Cliente/Stakeholder';
    }
    if (lowerRequest.includes('time') || lowerRequest.includes('equipe')) {
      return 'Equipe de desenvolvimento';
    }
    if (lowerRequest.includes('aprender') || lowerRequest.includes('estudar')) {
      return 'Estudante/Aprendiz';
    }
    if (firstReading.complexityLevel === 'expert') {
      return 'Desenvolvedor experiente';
    }
    
    return 'Desenvolvedor geral';
  }
  
  /**
   * Suggests IQ level based on complexity
   */
  private suggestIQLevel(complexity: ComplexityLevel): number {
    const iqMap: Record<ComplexityLevel, number> = {
      basico: 130,
      intermediario: 140,
      avancado: 150,
      expert: 160
    };
    
    return iqMap[complexity];
  }
}
