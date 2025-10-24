/**
 * Main prompt optimizer - orchestrates analysis, technique selection, and META-INSTRUCTION building
 * 
 * CRITICAL CHANGE: Now generates META-INSTRUCTIONS instead of ready-made prompts
 * The AI calling this MCP must CONSTRUCT its own prompt based on the instructions
 */

import type { OptimizationRequest, OptimizationResult } from './types.js';
import { RequestAnalyzer } from './analyzer.js';
import { TechniqueSelector } from './technique-selector.js';
import { MetaInstructionBuilder } from './meta-instruction-builder.js';
import { PromptFormatter } from './formatter.js'; // Keep for legacy justification

export class PromptOptimizer {
  private analyzer: RequestAnalyzer;
  private selector: TechniqueSelector;
  private metaBuilder: MetaInstructionBuilder;
  private formatter: PromptFormatter; // Legacy for justification only
  
  constructor() {
    this.analyzer = new RequestAnalyzer();
    this.selector = new TechniqueSelector();
    this.metaBuilder = new MetaInstructionBuilder();
    this.formatter = new PromptFormatter();
  }
  
  /**
   * Main optimization pipeline - NOW RETURNS META-INSTRUCTIONS
   */
  optimize(request: OptimizationRequest): OptimizationResult {
    // Step 1: Analyze the request using RE2
    const analysis = this.analyzer.analyze(request.user_request, request.context);
    
    // Step 2: Select appropriate techniques
    const techniques = this.selector.selectTechniques(analysis);
    
    // Step 3: Build META-INSTRUCTIONS (not a prompt!)
    const metaInstructions = this.metaBuilder.buildMetaInstructions(
      request.user_request,
      analysis,
      techniques
    );
    
    // Step 4: Generate justification (legacy compatibility)
    const justification = this.formatter.buildJustification(techniques, analysis);
    
    // Step 5: Assemble final result with META-INSTRUCTIONS
    return {
      analysis: {
        originalRequest: request.user_request,
        taskType: analysis.taskType,
        identifiedObjective: analysis.mainObjective,
        appliedTechniques: techniques.map(t => t.technique)
      },
      metaInstructions,
      technicalJustification: justification
    };
  }
  
  /**
   * Validates optimization result - NOW VALIDATES META-INSTRUCTIONS
   */
  validateResult(result: OptimizationResult): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    // Check: Clear objective
    if (!result.analysis.identifiedObjective || result.analysis.identifiedObjective.length < 10) {
      issues.push('Objetivo não está claro e bem definido');
    }
    
    // Check: Technique count (3-4 max)
    if (result.analysis.appliedTechniques.length > 4) {
      issues.push('Muitas técnicas aplicadas (máximo 4)');
    }
    if (result.analysis.appliedTechniques.length < 2) {
      issues.push('Poucas técnicas aplicadas (mínimo 2)');
    }
    
    // NEW: Validate meta-instructions structure
    const metaValidation = this.metaBuilder.validateMetaInstructions(result.metaInstructions);
    if (!metaValidation.isValid) {
      issues.push(...metaValidation.issues);
    }
    
    // CRITICAL: Check that we're NOT generating a ready prompt
    if (!result.metaInstructions.generationDirective.toLowerCase().includes('generate') &&
        !result.metaInstructions.generationDirective.toLowerCase().includes('build') &&
        !result.metaInstructions.generationDirective.toLowerCase().includes('construct')) {
      issues.push('CRITICAL: Meta-instructions must instruct AI to GENERATE prompt, not provide it ready');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
