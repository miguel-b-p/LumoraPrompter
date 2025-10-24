/**
 * Quality metrics system for meta-instruction evaluation
 * Provides quantitative and qualitative assessment of generated meta-instructions
 */

import type { MetaInstructionFramework, AnalysisResult, TechniqueApplication } from './types.js';

export interface QualityScore {
  overall: number; // 0-100
  breakdown: {
    clarity: number;
    completeness: number;
    specificity: number;
    techniqueBalance: number;
    actionability: number;
  };
  strengths: string[];
  improvements: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface MetaInstructionMetrics {
  directiveCount: number;
  avgDirectiveLength: number;
  structuralElementsCount: number;
  thinkingSteps: number;
  techniquesCovered: number;
  hasExamples: boolean;
  hasFallbacks: boolean;
}

/**
 * Evaluates quality of generated meta-instructions
 */
export class QualityEvaluator {
  
  /**
   * Calculates comprehensive quality score
   */
  evaluateQuality(
    metaInstructions: MetaInstructionFramework,
    analysis: AnalysisResult,
    techniques: TechniqueApplication[]
  ): QualityScore {
    
    const metrics = this.calculateMetrics(metaInstructions);
    
    const clarity = this.evaluateClarity(metaInstructions, metrics);
    const completeness = this.evaluateCompleteness(metaInstructions, metrics);
    const specificity = this.evaluateSpecificity(metaInstructions, analysis);
    const techniqueBalance = this.evaluateTechniqueBalance(techniques);
    const actionability = this.evaluateActionability(metaInstructions);
    
    const overall = this.calculateOverallScore({
      clarity,
      completeness,
      specificity,
      techniqueBalance,
      actionability
    });
    
    const strengths = this.identifyStrengths({
      clarity,
      completeness,
      specificity,
      techniqueBalance,
      actionability
    }, metrics);
    
    const improvements = this.identifyImprovements({
      clarity,
      completeness,
      specificity,
      techniqueBalance,
      actionability
    }, metrics);
    
    const confidence = this.assessConfidence(overall, metrics);
    
    return {
      overall,
      breakdown: {
        clarity,
        completeness,
        specificity,
        techniqueBalance,
        actionability
      },
      strengths,
      improvements,
      confidence
    };
  }
  
  /**
   * Calculates quantitative metrics
   */
  private calculateMetrics(metaInstructions: MetaInstructionFramework): MetaInstructionMetrics {
    const directives = metaInstructions.promptEngineeringDirectives;
    const avgLength = directives.length > 0
      ? directives.reduce((sum, d) => sum + d.directive.length, 0) / directives.length
      : 0;
    
    const structuralCount = 
      metaInstructions.requiredStructuralElements.contextRequirements.length +
      metaInstructions.requiredStructuralElements.constraintsToObserve.length +
      metaInstructions.requiredStructuralElements.outputFormatGuidelines.length;
    
    return {
      directiveCount: directives.length,
      avgDirectiveLength: avgLength,
      structuralElementsCount: structuralCount,
      thinkingSteps: metaInstructions.thinkingProtocol.length,
      techniquesCovered: directives.length,
      hasExamples: false, // Will be updated when examples are integrated
      hasFallbacks: false
    };
  }
  
  /**
   * Evaluates clarity (0-100)
   */
  private evaluateClarity(metaInstructions: MetaInstructionFramework, metrics: MetaInstructionMetrics): number {
    let score = 100;
    
    // Check directive clarity
    for (const directive of metaInstructions.promptEngineeringDirectives) {
      // Too short = vague
      if (directive.directive.length < 30) {
        score -= 5;
      }
      // Too long = confusing
      if (directive.directive.length > 200) {
        score -= 3;
      }
      // Missing reasoning
      if (!directive.reasoning || directive.reasoning.length < 20) {
        score -= 8;
      }
    }
    
    // Check thinking protocol clarity
    if (metrics.thinkingSteps < 4) {
      score -= 10;
    }
    if (metrics.thinkingSteps > 10) {
      score -= 5; // Too many steps can be confusing
    }
    
    // Generation directive clarity
    if (!metaInstructions.generationDirective.includes('generate') &&
        !metaInstructions.generationDirective.includes('construct') &&
        !metaInstructions.generationDirective.includes('build')) {
      score -= 15;
    }
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Evaluates completeness (0-100)
   */
  private evaluateCompleteness(metaInstructions: MetaInstructionFramework, metrics: MetaInstructionMetrics): number {
    let score = 0;
    
    // Has cognitive analysis (20 points)
    if (metaInstructions.cognitiveAnalysisProtocol.taskIdentification.length > 10) score += 7;
    if (metaInstructions.cognitiveAnalysisProtocol.complexityAssessment.length > 10) score += 7;
    if (metaInstructions.cognitiveAnalysisProtocol.objectiveClarity.length > 10) score += 6;
    
    // Has sufficient directives (25 points)
    if (metrics.directiveCount >= 3) score += 10;
    if (metrics.directiveCount >= 4) score += 8;
    if (metrics.directiveCount >= 5) score += 7;
    
    // Has structural elements (25 points)
    const structural = metaInstructions.requiredStructuralElements;
    if (structural.contextRequirements.length > 0) score += 8;
    if (structural.outputFormatGuidelines.length > 0) score += 9;
    if (structural.constraintsToObserve.length > 0) score += 8;
    
    // Has thinking protocol (20 points)
    if (metrics.thinkingSteps >= 4) score += 10;
    if (metrics.thinkingSteps >= 6) score += 10;
    
    // Has clear generation directive (10 points)
    if (metaInstructions.generationDirective.length > 50) score += 10;
    
    return Math.min(100, score);
  }
  
  /**
   * Evaluates specificity (0-100)
   */
  private evaluateSpecificity(metaInstructions: MetaInstructionFramework, analysis: AnalysisResult): number {
    let score = 70; // Start at 70
    
    // Check if directives are specific to the domain
    const hasKeywordInDirectives = metaInstructions.promptEngineeringDirectives.some(d => 
      analysis.keywords.some(kw => d.directive.toLowerCase().includes(kw.toLowerCase()))
    );
    if (hasKeywordInDirectives) score += 15;
    
    // Check context requirements specificity
    const contextReqs = metaInstructions.requiredStructuralElements.contextRequirements;
    if (contextReqs.length >= 3) score += 10;
    if (contextReqs.some(req => req.length > 30)) score += 5;
    
    // Check if constraints are specific
    const constraints = metaInstructions.requiredStructuralElements.constraintsToObserve;
    if (constraints.length > 0) score += 5;
    
    // Generic directives reduce score
    const genericPhrases = ['appropriate', 'relevant', 'suitable', 'proper'];
    const genericCount = metaInstructions.promptEngineeringDirectives.filter(d =>
      genericPhrases.some(phrase => d.directive.toLowerCase().includes(phrase))
    ).length;
    score -= genericCount * 3;
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Evaluates technique balance (0-100)
   */
  private evaluateTechniqueBalance(techniques: TechniqueApplication[]): number {
    let score = 100;
    
    // Too few techniques
    if (techniques.length < 3) {
      score -= 20;
    }
    
    // Too many techniques (cognitive overload)
    if (techniques.length > 5) {
      score -= (techniques.length - 5) * 10;
    }
    
    // Check for mandatory techniques
    const hasMandatory = techniques.some(t => 
      ['role_prompting', 'iq_attribution'].includes(t.technique)
    );
    if (!hasMandatory) {
      score -= 30;
    }
    
    // Bonus for good balance
    const mandatoryCount = techniques.filter(t =>
      ['role_prompting', 'iq_attribution', 'emotion_prompting'].includes(t.technique)
    ).length;
    const situationalCount = techniques.length - mandatoryCount;
    
    if (mandatoryCount >= 2 && situationalCount >= 1 && situationalCount <= 2) {
      score += 10;
    }
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Evaluates actionability (0-100)
   */
  private evaluateActionability(metaInstructions: MetaInstructionFramework): number {
    let score = 80; // Start at 80
    
    // Check for action verbs in directives
    const actionVerbs = ['apply', 'implement', 'use', 'include', 'add', 'create', 'define', 'specify'];
    const actionableCount = metaInstructions.promptEngineeringDirectives.filter(d =>
      actionVerbs.some(verb => d.directive.toLowerCase().includes(verb))
    ).length;
    
    score += Math.min(20, actionableCount * 4);
    
    // Thinking protocol must have clear steps
    const hasStepNumbers = metaInstructions.thinkingProtocol.some(step =>
      /step\s+\d+/i.test(step)
    );
    if (hasStepNumbers) score += 5;
    
    // Generation directive must be clear
    if (metaInstructions.generationDirective.toLowerCase().includes('based on these') ||
        metaInstructions.generationDirective.toLowerCase().includes('following these')) {
      score += 5;
    }
    
    // Vague directives reduce score
    const vagueCount = metaInstructions.promptEngineeringDirectives.filter(d =>
      d.directive.length < 40 || !d.reasoning
    ).length;
    score -= vagueCount * 5;
    
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Calculates overall weighted score
   */
  private calculateOverallScore(breakdown: Record<string, number>): number {
    const weights = {
      clarity: 0.25,
      completeness: 0.25,
      specificity: 0.20,
      techniqueBalance: 0.15,
      actionability: 0.15
    };
    
    let overall = 0;
    for (const [key, value] of Object.entries(breakdown)) {
      overall += value * (weights[key as keyof typeof weights] || 0);
    }
    
    return Math.round(overall);
  }
  
  /**
   * Identifies strengths
   */
  private identifyStrengths(breakdown: Record<string, number>, metrics: MetaInstructionMetrics): string[] {
    const strengths: string[] = [];
    
    if (breakdown.clarity >= 85) {
      strengths.push('Exceptionally clear and well-structured directives');
    }
    if (breakdown.completeness >= 85) {
      strengths.push('Comprehensive coverage of all necessary elements');
    }
    if (breakdown.specificity >= 85) {
      strengths.push('Highly specific and domain-relevant instructions');
    }
    if (breakdown.techniqueBalance >= 85) {
      strengths.push('Optimal balance of prompting techniques');
    }
    if (breakdown.actionability >= 85) {
      strengths.push('Clear, actionable directives easy to follow');
    }
    
    if (metrics.thinkingSteps >= 6) {
      strengths.push('Detailed thinking protocol for systematic approach');
    }
    if (metrics.structuralElementsCount >= 6) {
      strengths.push('Rich structural requirements for comprehensive output');
    }
    
    return strengths;
  }
  
  /**
   * Identifies areas for improvement
   */
  private identifyImprovements(breakdown: Record<string, number>, metrics: MetaInstructionMetrics): string[] {
    const improvements: string[] = [];
    
    if (breakdown.clarity < 70) {
      improvements.push('Increase clarity of directives with more specific language');
    }
    if (breakdown.completeness < 70) {
      improvements.push('Add missing structural elements or thinking steps');
    }
    if (breakdown.specificity < 70) {
      improvements.push('Make instructions more domain-specific and less generic');
    }
    if (breakdown.techniqueBalance < 70) {
      improvements.push('Adjust number of techniques for better cognitive balance');
    }
    if (breakdown.actionability < 70) {
      improvements.push('Use more action verbs and specific implementation guidance');
    }
    
    if (metrics.directiveCount < 3) {
      improvements.push('Add more prompt engineering directives');
    }
    if (metrics.thinkingSteps < 5) {
      improvements.push('Expand thinking protocol with more detailed steps');
    }
    if (metrics.structuralElementsCount < 4) {
      improvements.push('Include more structural requirements and constraints');
    }
    
    return improvements;
  }
  
  /**
   * Assesses confidence level
   */
  private assessConfidence(overall: number, metrics: MetaInstructionMetrics): 'high' | 'medium' | 'low' {
    if (overall >= 85 && metrics.directiveCount >= 4 && metrics.thinkingSteps >= 5) {
      return 'high';
    }
    if (overall >= 70 && metrics.directiveCount >= 3) {
      return 'medium';
    }
    return 'low';
  }
  
  /**
   * Generates quality report as formatted string
   */
  formatQualityReport(score: QualityScore): string {
    const sections: string[] = [];
    
    sections.push(`## 📊 Quality Assessment\n`);
    sections.push(`**Overall Score**: ${score.overall}/100 (${score.confidence.toUpperCase()} confidence)\n`);
    
    sections.push(`### Score Breakdown:`);
    sections.push(`- Clarity: ${score.breakdown.clarity}/100`);
    sections.push(`- Completeness: ${score.breakdown.completeness}/100`);
    sections.push(`- Specificity: ${score.breakdown.specificity}/100`);
    sections.push(`- Technique Balance: ${score.breakdown.techniqueBalance}/100`);
    sections.push(`- Actionability: ${score.breakdown.actionability}/100\n`);
    
    if (score.strengths.length > 0) {
      sections.push(`### ✅ Strengths:`);
      score.strengths.forEach(s => sections.push(`- ${s}`));
      sections.push('');
    }
    
    if (score.improvements.length > 0) {
      sections.push(`### 💡 Areas for Improvement:`);
      score.improvements.forEach(i => sections.push(`- ${i}`));
      sections.push('');
    }
    
    return sections.join('\n');
  }
}
