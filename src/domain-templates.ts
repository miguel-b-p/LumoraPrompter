/**
 * Advanced domain-specific templates for meta-instruction generation
 * Provides specialized frameworks for different domains
 */

import type { TaskType, ComplexityLevel } from './types.js';

export interface DomainTemplate {
  domain: string;
  taskType: TaskType;
  roleTemplate: string;
  contextualHints: string[];
  structuralGuidelines: string[];
  commonPitfalls: string[];
  examplePatterns: string[];
}

/**
 * Specialized templates for high-quality domain-specific instructions
 */
export const DOMAIN_TEMPLATES: Record<string, DomainTemplate> = {
  
  // WEB DEVELOPMENT
  web_frontend: {
    domain: 'Frontend Web Development',
    taskType: 'codigo',
    roleTemplate: 'senior frontend developer specialized in modern web technologies',
    contextualHints: [
      'Consider responsive design and mobile-first approach',
      'Think about accessibility (WCAG 2.1 guidelines)',
      'Performance optimization (Core Web Vitals)',
      'SEO implications',
      'Browser compatibility'
    ],
    structuralGuidelines: [
      'Component architecture and reusability',
      'State management strategy',
      'Styling approach (CSS-in-JS, modules, etc)',
      'Performance considerations',
      'Testing strategy'
    ],
    commonPitfalls: [
      'Avoid inline styles without justification',
      'Consider bundle size impact',
      'Ensure proper error boundaries',
      'Handle loading and error states'
    ],
    examplePatterns: [
      'Use TypeScript for type safety',
      'Implement proper prop validation',
      'Follow component composition patterns'
    ]
  },

  web_backend: {
    domain: 'Backend Web Development',
    taskType: 'codigo',
    roleTemplate: 'senior backend developer specialized in scalable architectures',
    contextualHints: [
      'Consider scalability and performance',
      'Think about database optimization',
      'API design best practices (RESTful/GraphQL)',
      'Security considerations (OWASP Top 10)',
      'Caching strategies'
    ],
    structuralGuidelines: [
      'Clean architecture principles',
      'Database schema design',
      'API endpoint structure',
      'Error handling and logging',
      'Authentication/Authorization flow'
    ],
    commonPitfalls: [
      'Avoid N+1 query problems',
      'Prevent SQL injection',
      'Handle rate limiting',
      'Implement proper validation'
    ],
    examplePatterns: [
      'Use dependency injection',
      'Implement repository pattern',
      'Apply SOLID principles'
    ]
  },

  // DATA SCIENCE & ML
  machine_learning: {
    domain: 'Machine Learning & AI',
    taskType: 'codigo',
    roleTemplate: 'senior ML engineer with deep understanding of algorithms and model optimization',
    contextualHints: [
      'Consider data preprocessing requirements',
      'Think about model interpretability',
      'Evaluate computational complexity',
      'Address bias and fairness',
      'Plan for model monitoring'
    ],
    structuralGuidelines: [
      'Data pipeline architecture',
      'Model selection rationale',
      'Hyperparameter tuning strategy',
      'Evaluation metrics selection',
      'Deployment considerations'
    ],
    commonPitfalls: [
      'Avoid data leakage',
      'Prevent overfitting',
      'Handle class imbalance',
      'Consider edge cases in production'
    ],
    examplePatterns: [
      'Use cross-validation properly',
      'Implement proper train/val/test splits',
      'Document model assumptions'
    ]
  },

  data_analysis: {
    domain: 'Data Analysis & Visualization',
    taskType: 'analitica',
    roleTemplate: 'senior data analyst specialized in statistical analysis and visualization',
    contextualHints: [
      'Consider statistical significance',
      'Think about data quality and outliers',
      'Choose appropriate visualization types',
      'Address missing data',
      'Ensure reproducibility'
    ],
    structuralGuidelines: [
      'Exploratory data analysis steps',
      'Statistical test selection',
      'Visualization design principles',
      'Interpretation guidelines',
      'Reporting format'
    ],
    commonPitfalls: [
      'Avoid correlation-causation confusion',
      'Be aware of Simpson\'s paradox',
      'Handle missing data appropriately',
      'Choose correct statistical tests'
    ],
    examplePatterns: [
      'Document data transformations',
      'Provide context for metrics',
      'Include confidence intervals'
    ]
  },

  // DEVOPS & INFRASTRUCTURE
  devops: {
    domain: 'DevOps & Infrastructure',
    taskType: 'tecnica',
    roleTemplate: 'senior DevOps engineer specialized in cloud infrastructure and automation',
    contextualHints: [
      'Consider infrastructure as code practices',
      'Think about CI/CD pipeline optimization',
      'Evaluate cost implications',
      'Plan for disaster recovery',
      'Address security compliance'
    ],
    structuralGuidelines: [
      'Infrastructure architecture',
      'Deployment strategy',
      'Monitoring and alerting setup',
      'Backup and recovery procedures',
      'Security hardening steps'
    ],
    commonPitfalls: [
      'Avoid hardcoded credentials',
      'Prevent configuration drift',
      'Handle secrets management',
      'Implement proper logging'
    ],
    examplePatterns: [
      'Use declarative configurations',
      'Implement blue-green deployments',
      'Apply principle of least privilege'
    ]
  },

  // SECURITY
  security: {
    domain: 'Cybersecurity & Application Security',
    taskType: 'tecnica',
    roleTemplate: 'senior security engineer specialized in application and infrastructure security',
    contextualHints: [
      'Consider OWASP Top 10 vulnerabilities',
      'Think about defense in depth',
      'Evaluate attack surface',
      'Plan for incident response',
      'Address compliance requirements'
    ],
    structuralGuidelines: [
      'Threat modeling approach',
      'Security controls implementation',
      'Vulnerability assessment process',
      'Security testing strategy',
      'Documentation requirements'
    ],
    commonPitfalls: [
      'Avoid security through obscurity',
      'Never trust user input',
      'Implement proper session management',
      'Use secure cryptographic practices'
    ],
    examplePatterns: [
      'Apply principle of least privilege',
      'Implement defense in depth',
      'Use secure defaults'
    ]
  },

  // DATABASE DESIGN
  database_design: {
    domain: 'Database Design & Optimization',
    taskType: 'codigo',
    roleTemplate: 'senior database architect specialized in data modeling and performance optimization',
    contextualHints: [
      'Consider normalization vs denormalization tradeoffs',
      'Think about query performance',
      'Evaluate indexing strategy',
      'Plan for data growth',
      'Address data integrity'
    ],
    structuralGuidelines: [
      'Entity-relationship modeling',
      'Schema design decisions',
      'Index strategy',
      'Query optimization',
      'Transaction management'
    ],
    commonPitfalls: [
      'Avoid over-normalization',
      'Prevent index bloat',
      'Handle concurrent access properly',
      'Consider query execution plans'
    ],
    examplePatterns: [
      'Use appropriate data types',
      'Implement proper constraints',
      'Design for query patterns'
    ]
  },

  // SYSTEM DESIGN
  system_design: {
    domain: 'Distributed Systems & Architecture',
    taskType: 'tecnica',
    roleTemplate: 'senior systems architect specialized in distributed systems and scalability',
    contextualHints: [
      'Consider CAP theorem tradeoffs',
      'Think about consistency models',
      'Evaluate latency requirements',
      'Plan for failure scenarios',
      'Address network partitions'
    ],
    structuralGuidelines: [
      'Architecture diagram and components',
      'Communication patterns',
      'Data flow and storage',
      'Scalability strategy',
      'Failure handling'
    ],
    commonPitfalls: [
      'Avoid single points of failure',
      'Consider network unreliability',
      'Handle eventual consistency',
      'Prevent cascading failures'
    ],
    examplePatterns: [
      'Use circuit breakers',
      'Implement retry with backoff',
      'Apply saga pattern for transactions'
    ]
  },

  // UI/UX DESIGN
  ui_ux_design: {
    domain: 'UI/UX Design',
    taskType: 'criativa',
    roleTemplate: 'senior UX designer specialized in user-centered design',
    contextualHints: [
      'Consider user research findings',
      'Think about accessibility',
      'Evaluate cognitive load',
      'Plan for different devices',
      'Address user pain points'
    ],
    structuralGuidelines: [
      'User journey mapping',
      'Information architecture',
      'Interaction design patterns',
      'Visual hierarchy',
      'Usability testing plan'
    ],
    commonPitfalls: [
      'Avoid design for designers',
      'Don\'t ignore edge cases',
      'Prevent feature bloat',
      'Consider loading states'
    ],
    examplePatterns: [
      'Follow platform conventions',
      'Apply progressive disclosure',
      'Use consistent patterns'
    ]
  },

  // API DESIGN
  api_design: {
    domain: 'API Design & Integration',
    taskType: 'tecnica',
    roleTemplate: 'senior API architect specialized in RESTful and GraphQL design',
    contextualHints: [
      'Consider API versioning strategy',
      'Think about rate limiting',
      'Evaluate authentication methods',
      'Plan for backward compatibility',
      'Address documentation needs'
    ],
    structuralGuidelines: [
      'Endpoint design and naming',
      'Request/response structure',
      'Error handling format',
      'Authentication flow',
      'Documentation approach'
    ],
    commonPitfalls: [
      'Avoid chatty APIs',
      'Prevent over-fetching/under-fetching',
      'Handle pagination properly',
      'Implement proper versioning'
    ],
    examplePatterns: [
      'Use standard HTTP methods correctly',
      'Implement HATEOAS principles',
      'Follow OpenAPI specification'
    ]
  },

  // ALGORITHMS & DATA STRUCTURES
  algorithms: {
    domain: 'Algorithms & Data Structures',
    taskType: 'codigo',
    roleTemplate: 'senior algorithms specialist with deep understanding of computational complexity',
    contextualHints: [
      'Consider time and space complexity',
      'Think about edge cases',
      'Evaluate algorithm correctness',
      'Plan for large inputs',
      'Address optimization opportunities'
    ],
    structuralGuidelines: [
      'Algorithm description and intuition',
      'Complexity analysis (Big-O)',
      'Implementation with comments',
      'Test cases including edge cases',
      'Optimization discussion'
    ],
    commonPitfalls: [
      'Avoid premature optimization',
      'Consider integer overflow',
      'Handle empty inputs',
      'Test with large datasets'
    ],
    examplePatterns: [
      'Start with brute force, then optimize',
      'Use appropriate data structures',
      'Document time/space tradeoffs'
    ]
  }
};

/**
 * Matches request to best domain template
 */
export class DomainMatcher {
  
  /**
   * Finds the most appropriate domain template
   */
  matchDomain(request: string, keywords: string[], taskType: TaskType): DomainTemplate | null {
    const lowerRequest = request.toLowerCase();
    const scores: Array<{ template: DomainTemplate; score: number }> = [];
    
    for (const template of Object.values(DOMAIN_TEMPLATES)) {
      let score = 0;
      
      // Task type match
      if (template.taskType === taskType) {
        score += 5;
      }
      
      // Domain keywords in request
      const domainKeywords = template.domain.toLowerCase().split(/\s+/);
      for (const keyword of domainKeywords) {
        if (lowerRequest.includes(keyword)) {
          score += 3;
        }
      }
      
      // User keywords match
      for (const keyword of keywords) {
        if (template.domain.toLowerCase().includes(keyword)) {
          score += 2;
        }
      }
      
      if (score > 0) {
        scores.push({ template, score });
      }
    }
    
    // Return best match if score is high enough
    scores.sort((a, b) => b.score - a.score);
    return scores.length > 0 && scores[0].score >= 5 ? scores[0].template : null;
  }
  
  /**
   * Gets contextual hints from domain template
   */
  getContextualHints(template: DomainTemplate, complexityLevel: ComplexityLevel): string[] {
    const hints = [...template.contextualHints];
    
    // Add complexity-specific hints
    if (complexityLevel === 'expert' || complexityLevel === 'avancado') {
      hints.push(...template.commonPitfalls);
    }
    
    return hints;
  }
}
