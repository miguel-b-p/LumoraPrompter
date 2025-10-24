/**
 * Types and interfaces for MCP-Lumora_Prompter v3.0
 * Now includes domain templates, few-shot examples, and quality metrics
 */

export type TaskType = 
  | 'criativa' 
  | 'tecnica' 
  | 'analitica' 
  | 'educacional' 
  | 'debate'
  | 'documentacao'
  | 'codigo'
  | 'mista';

export type ComplexityLevel = 'basico' | 'intermediario' | 'avancado' | 'expert';

export type PromptingTechnique = 
  | 'role_prompting'
  | 'emotion_prompting'
  | 'iq_attribution'
  | 'fake_past_consistency'
  | 'fake_audience'
  | 'obviously'
  | 'false_restriction'
  | 'version_2'
  | 'someone_disagrees'
  | 'bet_100_dollars'
  | 'simtom'
  | 're2'
  | 'rar';

export interface TechniqueDefinition {
  name: PromptingTechnique;
  displayName: string;
  description: string;
  whenToUse: string[];
  example: string;
  isMandatory: boolean;
}

export interface AnalysisResult {
  taskType: TaskType;
  mainObjective: string;
  complexityLevel: ComplexityLevel;
  implicitContext: string[];
  targetAudience: string;
  suggestedIQ: number;
  keywords: string[];
  detectedDomain?: string; // NEW: Detected specialized domain
  intentAnalysis?: string; // NEW: Deeper intent understanding
}

export interface TechniqueApplication {
  technique: PromptingTechnique;
  reason: string;
  implementation: string;
}

export interface OptimizationRequest {
  user_request: string;
  context?: string;
}

/**
 * Meta-Instruction Framework - O que o MCP retorna
 */
export interface MetaInstructionFramework {
  type: 'meta_instructions';
  cognitiveAnalysisProtocol: {
    taskIdentification: string;
    complexityAssessment: string;
    objectiveClarity: string;
  };
  promptEngineeringDirectives: Array<{
    step: number;
    directive: string;
    technique: string;
    reasoning: string;
  }>;
  requiredStructuralElements: {
    contextRequirements: string[];
    constraintsToObserve: string[];
    outputFormatGuidelines: string[];
  };
  thinkingProtocol: string[];
  originalRequest: string;
  generationDirective: string;
}

/**
 * Main optimization result interface
 */
export interface OptimizationResult {
  analysis: {
    originalRequest: string;
    taskType: TaskType;
    identifiedObjective: string;
    appliedTechniques: string[];
    detectedDomain?: string;
  };
  metaInstructions: MetaInstructionFramework;
  technicalJustification: {
    techniques: Array<{
      name: string;
      reason: string;
    }>;
    expectedImprovements: string[];
  };
  qualityScore?: {
    overall: number;
    confidence: string;
    breakdown: Record<string, number>;
  };
  fewShotExamples?: string; // NEW: Examples to guide AI
}
