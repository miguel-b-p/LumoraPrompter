/**
 * Few-shot examples to guide AI in prompt construction
 * Shows concrete examples of how to apply meta-instructions
 */

import type { TaskType } from './types.js';

export interface FewShotExample {
  userRequest: string;
  metaInstructionsSummary: string;
  constructedPromptExample: string;
  expectedOutputQuality: string;
}

/**
 * High-quality examples showing how to construct prompts from meta-instructions
 */
export const FEW_SHOT_EXAMPLES: Record<TaskType, FewShotExample[]> = {
  
  codigo: [
    {
      userRequest: 'Create a REST API for user authentication with JWT',
      metaInstructionsSummary: 'Role: Senior backend dev | IQ: 160 | Emotion: Critical | Bet: $100',
      constructedPromptExample: `You are a senior backend developer specialized in authentication with IQ 160 and deep expertise in security and JWT.

**Critical Task**: This is production-critical code requiring maximum quality and security attention.

**Task**: Create a complete REST API authentication system using JWT

**Requirements**:
1. Implement secure password hashing (bcrypt/argon2)
2. JWT token generation and refresh mechanism
3. Protected route middleware
4. Proper error handling and validation
5. Security best practices (OWASP guidelines)

**Validation**: Let's validate with extreme precision - this code must be production-ready and secure as if we bet $100 on it.

**Output Format**:
- Complete, runnable code with all dependencies
- Clear comments explaining security decisions
- Usage examples for all endpoints
- Environment variables configuration`,
      expectedOutputQuality: 'Production-ready code with comprehensive security, proper error handling, complete documentation, and usage examples'
    },
    {
      userRequest: 'Implement binary search algorithm in Python',
      metaInstructionsSummary: 'Role: Algorithms specialist | IQ: 150 | Structure: Educational',
      constructedPromptExample: `You are a senior algorithms specialist with IQ 150 and deep understanding of computational complexity.

**Task**: Implement binary search algorithm in Python with educational clarity

**Requirements**:
1. Clean, well-commented implementation
2. Time complexity analysis (O log n)
3. Space complexity analysis
4. Edge cases handling (empty array, single element, not found)
5. Iterative and recursive versions

**Output Format**:
- Both iterative and recursive implementations
- Detailed comments explaining each step
- Complexity analysis
- Test cases with edge cases
- Visual explanation of how algorithm works`,
      expectedOutputQuality: 'Clear, educational code with both implementations, thorough complexity analysis, and comprehensive test cases'
    }
  ],

  tecnica: [
    {
      userRequest: 'Explain how to implement CI/CD pipeline for microservices',
      metaInstructionsSummary: 'Role: DevOps expert | IQ: 155 | Audience: Dev team | SimToM: Multiple perspectives',
      constructedPromptExample: `You are a senior DevOps engineer specialized in cloud infrastructure with IQ 155 and extensive experience in microservices deployment.

**Context**: Explaining to a development team transitioning to microservices architecture.

**Task**: Comprehensive guide to implement CI/CD pipeline for microservices

**Consider Multiple Perspectives**:
- Developer: Ease of use, fast feedback
- Operations: Reliability, monitoring
- Business: Cost, deployment speed

**Requirements**:
1. Pipeline architecture overview
2. Tool recommendations (Jenkins, GitLab CI, GitHub Actions)
3. Containerization strategy (Docker, Kubernetes)
4. Testing stages (unit, integration, e2e)
5. Deployment strategies (blue-green, canary)
6. Monitoring and rollback procedures

**Output Format**:
- Step-by-step implementation guide
- Architecture diagrams (described in text/ASCII)
- Configuration examples
- Best practices and common pitfalls
- Cost and complexity considerations`,
      expectedOutputQuality: 'Comprehensive guide with multiple perspectives, practical examples, clear steps, and consideration of trade-offs'
    }
  ],

  criativa: [
    {
      userRequest: 'Create ASCII art of a rotating donut',
      metaInstructionsSummary: 'Role: Creative ASCII artist | IQ: 145 | False restriction: Mathematical precision',
      constructedPromptExample: `You are a creative ASCII artist and innovator with IQ 145 specialized in mathematical visualizations and ASCII art.

**Creative Challenge**: Create rotating donut ASCII art with mathematical precision

**Constraints**:
- Use mathematical principles (torus equations) for authentic 3D rotation
- Characters must represent depth and shading realistically
- Animation frames must show smooth rotation

**Task**: Generate ASCII art animation of a 3D donut (torus) rotating 360 degrees

**Requirements**:
1. 8-12 frames showing complete rotation
2. Use varying characters for depth (@, #, *, +, -, ., space)
3. Consistent size across frames (approximately 20x20 chars)
4. Clear sense of 3D perspective
5. Instructions for animation playback (timing, fps)

**Output Format**:
- Each frame clearly labeled
- Character legend explaining depth mapping
- Animation parameters (fps recommendation)
- Optional: Brief explanation of the mathematical approach`,
      expectedOutputQuality: 'Creative, mathematically-grounded ASCII art with smooth animation frames, clear depth perception, and playback instructions'
    }
  ],

  analitica: [
    {
      userRequest: 'Compare React vs Vue for enterprise application',
      metaInstructionsSummary: 'Role: Frontend architect | IQ: 160 | Someone disagrees: Vue advocate | Evidence-based',
      constructedPromptExample: `You are a senior frontend architect with IQ 160 and extensive experience in enterprise-scale applications using both React and Vue.

**Context**: Some developers argue Vue is superior for enterprise due to better learning curve and official ecosystem.

**Task**: Comprehensive comparison of React vs Vue for enterprise applications

**Analysis Framework**:
1. Learning curve and developer onboarding
2. Ecosystem maturity (libraries, tools, community)
3. Performance characteristics
4. TypeScript integration
5. Enterprise features (SSR, state management, testing)
6. Team scalability and maintenance
7. Long-term support and stability
8. Migration and integration costs

**Requirements**:
- Evidence-based analysis with concrete examples
- Pros and cons for each framework
- Real-world enterprise use cases
- Consider the opposing viewpoint fairly
- Final recommendation with reasoning

**Output Format**:
- Structured comparison table
- Detailed analysis for each criterion
- Case studies or examples
- Risk assessment
- Clear, justified recommendation`,
      expectedOutputQuality: 'Balanced, evidence-based analysis considering multiple perspectives, with concrete examples and clear recommendation'
    }
  ],

  educacional: [
    {
      userRequest: 'Explain how neural networks learn',
      metaInstructionsSummary: 'Role: Educator | IQ: 150 | Fake audience: Undergraduate CS students | Analogies',
      constructedPromptExample: `You are an experienced educator with IQ 150 specialized in machine learning, presenting to undergraduate computer science students.

**Educational Objective**: Explain neural network learning process in an intuitive, accessible way

**Approach**:
- Start with intuitive analogies (brain neurons, learning from examples)
- Build up to mathematical concepts gradually
- Use visual descriptions and examples
- Address common misconceptions

**Content Structure**:
1. **Intuitive Introduction**: What is learning? Analogy to human learning
2. **Basic Concepts**: Neurons, weights, activation functions
3. **Forward Pass**: How information flows through the network
4. **Loss Function**: Measuring how wrong we are
5. **Backpropagation**: How the network adjusts (simplified explanation)
6. **Gradient Descent**: Finding the way down the error mountain
7. **Practical Example**: Simple classification task walkthrough

**Requirements**:
- Clear analogies for complex concepts
- Progressive complexity (simple → advanced)
- Visual descriptions (ASCII diagrams acceptable)
- Common misconceptions addressed
- Practical examples

**Output Format**:
- Structured sections with clear headers
- Analogies for each major concept
- Simple numerical example
- Summary of key points
- Further learning resources`,
      expectedOutputQuality: 'Clear, progressive explanation with effective analogies, visual aids, and practical examples suitable for the target audience'
    }
  ],

  debate: [
    {
      userRequest: 'Is microservices architecture always better than monolithic?',
      metaInstructionsSummary: 'Role: Systems architect | IQ: 160 | Obviously: Challenge assumption | Critical thinking',
      constructedPromptExample: `You are a senior systems architect with IQ 160 and experience in both monolithic and microservices architectures.

**Controversial Statement**: "Obviously microservices are always better than monolithic architecture, right?"

**Task**: Critical analysis challenging this common assumption

**Analytical Framework**:
1. **Question the premise**: When is this actually false?
2. **Context matters**: Company size, team size, domain complexity
3. **Trade-offs analysis**: What do you gain vs lose?
4. **Real-world failures**: When microservices made things worse
5. **Success patterns**: When each approach excels

**Arguments to Address**:
- **Pro-Microservices**: Scalability, independence, technology flexibility
- **Pro-Monolithic**: Simplicity, easier debugging, lower operational overhead
- **Nuanced View**: It depends on context

**Requirements**:
- Challenge the "always better" assumption
- Provide concrete examples and case studies
- Analyze trade-offs honestly
- Consider organizational factors (team size, expertise)
- Provide decision framework

**Output Format**:
- Thesis statement
- Argument structure with evidence
- Counter-arguments addressed
- Real-world examples
- Decision framework/guidelines
- Nuanced conclusion`,
      expectedOutputQuality: 'Thoughtful, critical analysis that challenges assumptions, provides evidence, and offers nuanced decision framework'
    }
  ],

  documentacao: [
    {
      userRequest: 'Write API documentation for payment gateway',
      metaInstructionsSummary: 'Role: Technical writer | IQ: 145 | Audience: External developers | Comprehensive',
      constructedPromptExample: `You are a specialized technical writer with IQ 145 and extensive experience documenting payment APIs for external developers.

**Audience**: External developers integrating with your payment gateway (various skill levels)

**Task**: Comprehensive API documentation for payment gateway

**Documentation Structure**:
1. **Overview**: What the API does, key capabilities
2. **Getting Started**: Authentication, API keys, test environment
3. **Core Concepts**: Payment flow, webhooks, idempotency
4. **Authentication**: How to authenticate requests
5. **Endpoints**: Detailed reference for each endpoint
6. **Request/Response Examples**: Real, runnable examples
7. **Error Handling**: All error codes and meanings
8. **Webhooks**: Event types and payload structures
9. **Testing**: Test cards, sandbox environment
10. **Security Best Practices**: PCI compliance, secure storage
11. **SDKs and Libraries**: Available integrations
12. **FAQs and Troubleshooting**: Common issues

**Requirements**:
- Clear, jargon-free language when possible
- Runnable code examples in multiple languages
- All possible error scenarios documented
- Security considerations highlighted
- Quick start guide for impatient developers
- Comprehensive reference for detailed integration

**Output Format**:
- Structured markdown with clear hierarchy
- Code blocks with syntax highlighting indicators
- Tables for endpoint parameters
- Warning callouts for security issues
- Links to related sections`,
      expectedOutputQuality: 'Clear, comprehensive documentation with practical examples, security guidance, and both quick-start and detailed reference sections'
    }
  ],

  mista: [
    {
      userRequest: 'Design and implement a scalable chat application',
      metaInstructionsSummary: 'Role: Full-stack architect | IQ: 160 | SimToM: Multiple perspectives | Comprehensive',
      constructedPromptExample: `You are a multidisciplinary senior architect with IQ 160, experienced in full-stack development, system design, and UX.

**Complex Task**: Design and implement scalable real-time chat application

**Multiple Perspectives to Consider**:
- **User**: Intuitive interface, fast messaging, reliability
- **Developer**: Maintainable code, clear architecture
- **Operations**: Easy deployment, monitoring, scaling
- **Business**: Cost-effective, time to market

**Task Breakdown**:

**1. System Design**:
- Architecture (WebSocket, pub/sub, database)
- Scalability strategy (horizontal scaling, load balancing)
- Data modeling (users, messages, rooms)
- Real-time communication approach

**2. Backend Implementation**:
- WebSocket server setup
- Message persistence
- Authentication and authorization
- Presence detection (online/offline)

**3. Frontend Implementation**:
- Real-time message updates
- Typing indicators
- Message history loading
- Responsive design

**4. DevOps**:
- Containerization
- Deployment strategy
- Monitoring and logging

**Requirements**:
- Complete, runnable code for all components
- Scalability considerations at each layer
- Security best practices
- UX considerations
- Cost and performance trade-offs documented

**Output Format**:
- Architecture diagram (text/ASCII description)
- Backend code with comments
- Frontend code with comments
- Database schema
- Deployment configuration
- Performance and scaling considerations
- Future improvements roadmap`,
      expectedOutputQuality: 'Comprehensive solution covering all aspects (system design, implementation, UX, DevOps) with code, documentation, and trade-off analysis'
    }
  ]
};

/**
 * Selects relevant few-shot examples based on task type
 */
export class FewShotSelector {
  
  /**
   * Gets relevant examples for a task type
   */
  getExamples(taskType: TaskType, limit: number = 2): FewShotExample[] {
    const examples = FEW_SHOT_EXAMPLES[taskType] || [];
    return examples.slice(0, limit);
  }
  
  /**
   * Formats examples for inclusion in meta-instructions
   */
  formatExamplesForOutput(examples: FewShotExample[]): string {
    if (examples.length === 0) {
      return '';
    }
    
    const formatted = examples.map((example, idx) => {
      return `### Example ${idx + 1}: ${example.userRequest}

**Meta-Instructions Applied**: ${example.metaInstructionsSummary}

**How to Construct the Prompt**:
\`\`\`
${example.constructedPromptExample}
\`\`\`

**Expected Quality**: ${example.expectedOutputQuality}`;
    });
    
    return formatted.join('\n\n---\n\n');
  }
}
