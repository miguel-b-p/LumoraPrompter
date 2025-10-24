/**
 * Meta-Instruction Builder - Generates cognitive instructions for AI to build its own prompt
 * 
 * CRITICAL: This does NOT generate ready-made prompts
 * It generates INSTRUCTIONS for the AI to think and construct its own optimized prompt
 */

import type { AnalysisResult, TechniqueApplication, MetaInstructionFramework, TaskType } from './types.js';
import { TECHNIQUES } from './techniques.js';

export class MetaInstructionBuilder {
  
  /**
   * Builds a complete meta-instruction framework
   * Returns INSTRUCTIONS, not a prompt
   */
  buildMetaInstructions(
    originalRequest: string,
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): MetaInstructionFramework {
    
    return {
      type: 'meta_instructions',
      cognitiveAnalysisProtocol: this.buildCognitiveProtocol(analysis),
      promptEngineeringDirectives: this.buildEngineeringDirectives(analysis, techniques),
      requiredStructuralElements: this.buildStructuralRequirements(analysis, techniques),
      thinkingProtocol: this.buildThinkingProtocol(analysis),
      originalRequest,
      generationDirective: this.buildGenerationDirective(analysis)
    };
  }
  
  /**
   * Builds cognitive analysis protocol - teaches AI HOW to analyze
   */
  private buildCognitiveProtocol(analysis: AnalysisResult): {
    taskIdentification: string;
    complexityAssessment: string;
    objectiveClarity: string;
  } {
    return {
      taskIdentification: `Identify this as a ${this.translateTaskType(analysis.taskType)} task requiring ${this.getApproachType(analysis.taskType)} approach`,
      complexityAssessment: `Assess complexity level as ${analysis.complexityLevel} requiring ${analysis.suggestedIQ}+ IQ attribution`,
      objectiveClarity: `Clarify the main objective: ${analysis.mainObjective}`
    };
  }
  
  /**
   * Builds prompt engineering directives - step-by-step instructions
   */
  private buildEngineeringDirectives(
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): Array<{
    step: number;
    directive: string;
    technique: string;
    reasoning: string;
  }> {
    const directives: Array<{
      step: number;
      directive: string;
      technique: string;
      reasoning: string;
    }> = [];
    
    let stepNumber = 1;
    
    // Step 1: Role and expertise establishment
    const roleInstruction = this.getRoleInstruction(analysis);
    directives.push({
      step: stepNumber++,
      directive: roleInstruction,
      technique: 'Role Prompting',
      reasoning: 'Establish domain expertise and professional context'
    });
    
    // Step 2: IQ attribution
    directives.push({
      step: stepNumber++,
      directive: `Apply IQ Attribution technique by stating you have IQ ${analysis.suggestedIQ} in this domain`,
      technique: 'IQ Attribution',
      reasoning: `Sets sophistication level appropriate for ${analysis.complexityLevel} complexity`
    });
    
    // Step 3: Additional techniques
    for (const tech of techniques) {
      if (tech.technique === 'role_prompting' || tech.technique === 'iq_attribution') {
        continue; // Already handled
      }
      
      const instruction = this.getTechniqueInstruction(tech, analysis);
      if (instruction) {
        directives.push({
          step: stepNumber++,
          directive: instruction,
          technique: TECHNIQUES[tech.technique].displayName,
          reasoning: tech.reason
        });
      }
    }
    
    // Step: Structure requirement
    directives.push({
      step: stepNumber++,
      directive: this.getStructureInstruction(analysis),
      technique: 'Structural Organization',
      reasoning: 'Ensures clear organization and readability'
    });
    
    return directives;
  }
  
  /**
   * Builds required structural elements - what MUST be included
   */
  private buildStructuralRequirements(
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): {
    contextRequirements: string[];
    constraintsToObserve: string[];
    outputFormatGuidelines: string[];
  } {
    const requirements = {
      contextRequirements: this.getContextRequirements(analysis),
      constraintsToObserve: this.getConstraints(analysis, techniques),
      outputFormatGuidelines: this.getFormatGuidelines(analysis)
    };
    
    return requirements;
  }
  
  /**
   * Builds thinking protocol - cognitive steps
   */
  private buildThinkingProtocol(analysis: AnalysisResult): string[] {
    const protocol: string[] = [
      'Step 1: Read and analyze the original request carefully',
      'Step 2: Identify the core problem and implicit requirements',
      'Step 3: Consider the domain expertise needed'
    ];
    
    if (analysis.taskType === 'codigo') {
      protocol.push('Step 4: Think about architecture, edge cases, and best practices');
      protocol.push('Step 5: Consider error handling and maintainability');
    } else if (analysis.taskType === 'criativa') {
      protocol.push('Step 4: Think about innovative approaches and creative constraints');
      protocol.push('Step 5: Consider aesthetic and functional balance');
    } else if (analysis.taskType === 'analitica') {
      protocol.push('Step 4: Analyze multiple perspectives and trade-offs');
      protocol.push('Step 5: Formulate evidence-based conclusions');
    }
    
    protocol.push('Step 6: Structure the prompt with clear sections and requirements');
    protocol.push('Step 7: Validate that all meta-instructions are incorporated');
    
    return protocol;
  }
  
  /**
   * Builds final generation directive
   */
  private buildGenerationDirective(analysis: AnalysisResult): string {
    const taskDesc = this.translateTaskType(analysis.taskType);
    return `Based on these meta-instructions, generate an optimized prompt that incorporates all the directives above. The prompt should guide the AI to produce ${taskDesc} output with ${analysis.complexityLevel} level sophistication. Remember: you are GENERATING the prompt now, not executing it.`;
  }
  
  /**
   * Gets role establishment instruction
   */
  private getRoleInstruction(analysis: AnalysisResult): string {
    const roleMap: Record<TaskType, string> = {
      codigo: 'Assume the role of a senior software developer specialized in',
      tecnica: 'Assume the role of a technical specialist in',
      criativa: 'Assume the role of a creative designer and innovator in',
      analitica: 'Assume the role of an analytical specialist in',
      educacional: 'Assume the role of an experienced educator in',
      debate: 'Assume the role of a critical thinker and debater in',
      documentacao: 'Assume the role of a specialized technical writer in',
      mista: 'Assume the role of a multidisciplinary professional in'
    };
    
    const domain = analysis.keywords[0] || 'the relevant domain';
    return `${roleMap[analysis.taskType]} ${domain}`;
  }
  
  /**
   * Gets technique-specific instruction
   */
  private getTechniqueInstruction(tech: TechniqueApplication, analysis: AnalysisResult): string {
    const instructionMap: Record<string, string> = {
      fake_past_consistency: `Apply "Fake Past Consistency" by mentioning previous work or discussion about ${analysis.keywords[0] || 'this topic'}`,
      emotion_prompting: 'Add emotional weight using "Emotion Prompting" - emphasize importance and critical nature of the task',
      fake_audience: `Include "Fake Audience" technique - frame as if presenting to ${analysis.targetAudience}`,
      obviously: 'Use "Obviously" technique to frame certain aspects as self-evident',
      false_restriction: `Apply creative constraints using "False Restriction" - ${tech.implementation}`,
      version_2: 'Reference this as version 2.0 of a solution',
      someone_disagrees: `Use "Someone Disagrees" technique - acknowledge opposing viewpoint: ${tech.implementation}`,
      bet_100_dollars: 'Apply "Bet $100" technique to emphasize validation and precision',
      simtom: 'Include "SimToM" (Simulation Theory of Mind) - consider multiple stakeholder perspectives',
      rar: 'Use "RaR" (Rephrase and Respond) - first rephrase the request to confirm understanding',
      re2: 'Apply "RE2" (Read Twice) methodology for deeper analysis'
    };
    
    return instructionMap[tech.technique] || '';
  }
  
  /**
   * Gets structure instruction based on task type
   */
  private getStructureInstruction(analysis: AnalysisResult): string {
    if (analysis.taskType === 'codigo') {
      return 'Structure the prompt in sections: Role & Context, Task Description, Technical Requirements, Quality Standards, Expected Output';
    } else if (analysis.taskType === 'educacional') {
      return 'Structure the prompt in sections: Expert Role, Learning Objective, Explanation Approach, Examples Required, Validation Criteria';
    } else {
      return 'Structure the prompt in clear sections: Context, Objective, Requirements, Constraints, Expected Output Format';
    }
  }
  
  /**
   * Gets context requirements
   */
  private getContextRequirements(analysis: AnalysisResult): string[] {
    const requirements: string[] = [
      `Domain: ${analysis.keywords.join(', ')}`,
      `Complexity Level: ${analysis.complexityLevel}`,
      `Target Audience: ${analysis.targetAudience}`
    ];
    
    if (analysis.implicitContext.length > 0) {
      requirements.push(...analysis.implicitContext.map(c => `Context: ${c}`));
    }
    
    return requirements;
  }
  
  /**
   * Gets constraints to observe
   */
  private getConstraints(analysis: AnalysisResult, techniques: TechniqueApplication[]): string[] {
    const constraints: string[] = [];
    
    if (analysis.taskType === 'codigo') {
      constraints.push('Code must be complete and immediately executable');
      constraints.push('Include proper error handling');
      constraints.push('Follow best practices and clean code principles');
    }
    
    if (analysis.complexityLevel === 'expert' || analysis.complexityLevel === 'avancado') {
      constraints.push('Solution must be optimized and production-ready');
      constraints.push('Consider edge cases and scalability');
    }
    
    // Add technique-specific constraints
    const restrictionTech = techniques.find(t => t.technique === 'false_restriction');
    if (restrictionTech) {
      constraints.push(restrictionTech.implementation);
    }
    
    return constraints;
  }
  
  /**
   * Gets output format guidelines
   */
  private getFormatGuidelines(analysis: AnalysisResult): string[] {
    const guidelines: string[] = [];
    
    if (analysis.taskType === 'codigo') {
      guidelines.push('Provide complete, runnable code');
      guidelines.push('Include explanatory comments');
      guidelines.push('Add usage examples when appropriate');
    } else if (analysis.taskType === 'educacional') {
      guidelines.push('Clear, didactic explanation');
      guidelines.push('Practical examples');
      guidelines.push('Highlighted key concepts');
    } else if (analysis.taskType === 'analitica') {
      guidelines.push('Detailed comparative analysis');
      guidelines.push('Pros and cons for each option');
      guidelines.push('Evidence-based recommendation');
    } else {
      guidelines.push('Clear and structured response');
      guidelines.push('Actionable information');
      guidelines.push('Examples when relevant');
    }
    
    return guidelines;
  }
  
  /**
   * Translates task type to English
   */
  private translateTaskType(type: TaskType): string {
    const translations: Record<TaskType, string> = {
      codigo: 'code/programming',
      tecnica: 'technical/methodological',
      criativa: 'creative',
      analitica: 'analytical',
      educacional: 'educational',
      debate: 'debate/argumentation',
      documentacao: 'documentation',
      mista: 'mixed/multidisciplinary'
    };
    return translations[type] || type;
  }
  
  /**
   * Gets approach type for task
   */
  private getApproachType(type: TaskType): string {
    const approaches: Record<TaskType, string> = {
      codigo: 'implementation-focused',
      tecnica: 'methodological',
      criativa: 'innovative and design-thinking',
      analitica: 'comparative and evidence-based',
      educacional: 'pedagogical',
      debate: 'argumentative and critical',
      documentacao: 'descriptive and comprehensive',
      mista: 'holistic'
    };
    return approaches[type] || 'systematic';
  }
  
  /**
   * Validates that output is meta-instructional, not prescriptive
   */
  validateMetaInstructions(framework: MetaInstructionFramework): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    // Check 1: Must have directives, not direct content
    if (framework.promptEngineeringDirectives.length === 0) {
      issues.push('No prompt engineering directives provided');
    }
    
    // Check 2: Generation directive must instruct, not execute
    if (!framework.generationDirective.toLowerCase().includes('generate') &&
        !framework.generationDirective.toLowerCase().includes('construct') &&
        !framework.generationDirective.toLowerCase().includes('build')) {
      issues.push('Generation directive does not instruct AI to generate prompt');
    }
    
    // Check 3: Must have thinking protocol
    if (framework.thinkingProtocol.length < 3) {
      issues.push('Thinking protocol is too shallow (minimum 3 steps)');
    }
    
    // Check 4: Must have structural requirements
    if (framework.requiredStructuralElements.contextRequirements.length === 0) {
      issues.push('Missing context requirements');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
