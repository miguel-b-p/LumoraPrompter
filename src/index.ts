#!/usr/bin/env node

/**
 * MCP-Lumora_Prompter Server v3.0
 * Meta-Cognitive Instruction Framework
 * 
 * This MCP does NOT generate ready-made prompts.
 * It generates META-INSTRUCTIONS that teach AI how to construct optimized prompts.
 * 
 * The AI calling this MCP must THINK and BUILD its own prompt based on the instructions.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { PromptOptimizer } from './optimizer.js';
import type { OptimizationRequest } from './types.js';

/**
 * MCP Server for prompt optimization
 */
class LumoraPrompterServer {
  private server: Server;
  private optimizer: PromptOptimizer;

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-lumora-prompter',
        version: '3.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.optimizer = new PromptOptimizer();
    this.setupHandlers();
    
    // Error handling
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };
    
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Setup request handlers
   */
  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'optimize_prompt',
          description: 'Recebe uma solicitação do usuário e retorna um FRAMEWORK DE META-INSTRUÇÕES que ensina a IA a construir seu próprio prompt otimizado. NÃO retorna um prompt pronto, mas sim instruções cognitivas para geração autônoma do prompt.',
          inputSchema: {
            type: 'object',
            properties: {
              user_request: {
                type: 'string',
                description: 'A solicitação original do usuário que precisa ser otimizada',
              },
              context: {
                type: 'string',
                description: 'Contexto adicional ou requisitos especiais (opcional)',
              },
            },
            required: ['user_request'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'optimize_prompt') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool não encontrada: ${request.params.name}`
        );
      }

      return await this.handleOptimizePrompt(request.params.arguments);
    });
  }

  /**
   * Handles optimize_prompt tool call
   */
  private async handleOptimizePrompt(args: any) {
    try {
      // Validate input
      if (!args.user_request || typeof args.user_request !== 'string') {
        throw new McpError(
          ErrorCode.InvalidParams,
          'user_request é obrigatório e deve ser uma string'
        );
      }

      const optimizationRequest: OptimizationRequest = {
        user_request: args.user_request,
        context: args.context,
      };

      // Run optimization
      const result = this.optimizer.optimize(optimizationRequest);

      // Validate result
      const validation = this.optimizer.validateResult(result);
      
      // Format output according to specification
      const formattedOutput = this.formatOutput(result, validation);

      return {
        content: [
          {
            type: 'text',
            text: formattedOutput,
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      
      throw new McpError(
        ErrorCode.InternalError,
        `Erro ao otimizar prompt: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Formats the optimization result - NOW OUTPUTS META-INSTRUCTIONS
   */
  private formatOutput(result: any, validation: any): string {
    const sections: string[] = [];
    const meta = result.metaInstructions;

    // Header - Clear indication this is META-INSTRUCTIONS
    sections.push('# 🧠 META-INSTRUCTION SET');
    sections.push('## Cognitive Enhancement Framework for AI Prompt Generation\n');
    sections.push('⚠️ **IMPORTANT**: These are INSTRUCTIONS for you to GENERATE an optimized prompt.');
    sections.push('Do NOT use these as the final prompt. You must CONSTRUCT your own prompt based on these directives.\n');
    sections.push('---\n');
    
    // Cognitive Analysis Protocol
    sections.push('## 🔍 Cognitive Analysis Protocol\n');
    sections.push(`**Task Identification**: ${meta.cognitiveAnalysisProtocol.taskIdentification}`);
    sections.push(`**Complexity Assessment**: ${meta.cognitiveAnalysisProtocol.complexityAssessment}`);
    sections.push(`**Objective Clarity**: ${meta.cognitiveAnalysisProtocol.objectiveClarity}\n`);
    
    // Prompt Engineering Directives
    sections.push('## 🎯 Prompt Engineering Directives\n');
    sections.push('Apply the following techniques when constructing your prompt:\n');
    
    meta.promptEngineeringDirectives.forEach((directive: any) => {
      sections.push(`### Step ${directive.step}: ${directive.technique}`);
      sections.push(`**Directive**: ${directive.directive}`);
      sections.push(`**Reasoning**: ${directive.reasoning}\n`);
    });
    
    sections.push('---\n');
    
    // Required Structural Elements
    sections.push('## 📝 Required Structural Elements\n');
    
    sections.push('### Context Requirements:');
    meta.requiredStructuralElements.contextRequirements.forEach((req: string) => {
      sections.push(`- ${req}`);
    });
    sections.push('');
    
    if (meta.requiredStructuralElements.constraintsToObserve.length > 0) {
      sections.push('### Constraints to Observe:');
      meta.requiredStructuralElements.constraintsToObserve.forEach((constraint: string) => {
        sections.push(`- ${constraint}`);
      });
      sections.push('');
    }
    
    sections.push('### Output Format Guidelines:');
    meta.requiredStructuralElements.outputFormatGuidelines.forEach((guideline: string) => {
      sections.push(`- ${guideline}`);
    });
    sections.push('\n---\n');
    
    // Thinking Protocol
    sections.push('## 🧑‍💻 Thinking Protocol\n');
    sections.push('Follow this cognitive process when generating your prompt:\n');
    meta.thinkingProtocol.forEach((step: string) => {
      sections.push(`- ${step}`);
    });
    sections.push('\n---\n');
    
    // Original Request
    sections.push('## 📬 Original Request\n');
    sections.push(`"${meta.originalRequest}"\n`);
    sections.push('---\n');
    
    // Generation Directive - THE MOST IMPORTANT PART
    sections.push('## ⚙️ GENERATION DIRECTIVE\n');
    sections.push(`📢 **${meta.generationDirective}**\n`);
    sections.push('---\n');
    
    // Validation warnings if any
    if (!validation.isValid) {
      sections.push('## ⚠️ Validation Warnings\n');
      validation.issues.forEach((issue: string) => {
        sections.push(`- ${issue}`);
      });
      sections.push('\n---\n');
    }
    
    // Technical Justification (why these techniques)
    sections.push('## 🔍 Technical Justification\n');
    sections.push('**Why These Techniques?**\n');
    result.technicalJustification.techniques.forEach((tech: any) => {
      sections.push(`- **${tech.name}**: ${tech.reason}`);
    });
    sections.push('\n**Expected Improvements**:\n');
    result.technicalJustification.expectedImprovements.forEach((imp: string) => {
      sections.push(`- ${imp}`);
    });
    
    // Quality Assessment
    if (result.qualityScore) {
      sections.push('\n## 📊 Quality Assessment\n');
      sections.push(`**Overall Score**: ${result.qualityScore.overall}/100 (${result.qualityScore.confidence.toUpperCase()} confidence)\n`);
      sections.push('**Score Breakdown**:');
      sections.push(`- Clarity: ${result.qualityScore.breakdown.clarity}/100`);
      sections.push(`- Completeness: ${result.qualityScore.breakdown.completeness}/100`);
      sections.push(`- Specificity: ${result.qualityScore.breakdown.specificity}/100`);
      sections.push(`- Technique Balance: ${result.qualityScore.breakdown.techniqueBalance}/100`);
      sections.push(`- Actionability: ${result.qualityScore.breakdown.actionability}/100`);
      sections.push('\n---\n');
    }
    
    // Few-Shot Examples
    if (result.fewShotExamples && result.fewShotExamples.length > 0) {
      sections.push('## 💡 Example: How to Apply These Instructions\n');
      sections.push(result.fewShotExamples);
      sections.push('\n---\n');
    }
    
    // Footer
    sections.push('\n---\n');
    sections.push('*Generated by MCP-Lumora_Prompter v3.0 - Meta-Cognitive Instruction Framework*');
    sections.push('*Enhanced with domain-specific templates, quality metrics, and few-shot examples*');
    sections.push('*Remember: This is a TEACHER, not a GENERATOR. Build your own optimized prompt based on these instructions.*');

    return sections.join('\n');
  }

  /**
   * Translates task type to Portuguese
   */
  private translateTaskType(type: string): string {
    const translations: Record<string, string> = {
      codigo: 'Código/Programação',
      tecnica: 'Técnica/Metodologia',
      criativa: 'Criativa',
      analitica: 'Analítica',
      educacional: 'Educacional',
      debate: 'Debate/Argumentação',
      documentacao: 'Documentação',
      mista: 'Mista/Multidisciplinar',
    };
    return translations[type] || type;
  }

  /**
   * Gets technique display name
   */
  private getTechniqueName(technique: string): string {
    const names: Record<string, string> = {
      role_prompting: 'Role Prompting',
      emotion_prompting: 'Emotion Prompting',
      iq_attribution: 'Atribuição de QI',
      fake_past_consistency: 'Consistência Passada',
      fake_audience: 'Audiência Específica',
      obviously: 'Obviamente',
      false_restriction: 'Restrição Falsa',
      version_2: 'Versão 2.0',
      someone_disagrees: 'Discordância',
      bet_100_dollars: 'Aposta de $100',
      simtom: 'SimToM',
      re2: 'RE2',
      rar: 'RaR',
    };
    return names[technique] || technique;
  }

  /**
   * Start the server
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP-Lumora_Prompter server running on stdio');
  }
}

/**
 * Main entry point
 */
const server = new LumoraPrompterServer();
server.run().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});
