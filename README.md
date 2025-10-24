# MCP-Lumora_Prompter v2.0

🚀 **Meta-Otimizador de Prompts com QI 160**

Um servidor MCP (Model Context Protocol) avançado que transforma solicitações simples em prompts de alta qualidade, aplicando técnicas comprovadas de engenharia de prompts.

## 📋 Visão Geral

O **MCP-Lumora_Prompter** atua como um meta-otimizador inteligente que analisa suas solicitações e aplica estrategicamente técnicas de prompting para maximizar:

- ✅ **Clareza e precisão** das instruções
- ✅ **Profundidade e qualidade** das respostas
- ✅ **Aplicação contextual** de técnicas de prompting
- ✅ **Estruturação lógica** e coerente

## 🎯 Características Principais

### Análise RE2 (Read Twice)
O sistema realiza duas leituras da sua solicitação:
1. **Primeira Leitura**: Identificação de tipo, complexidade e contexto
2. **Segunda Leitura**: Análise profunda e reformulação estratégica

### Técnicas de Prompting Implementadas

#### 🔹 Técnicas Obrigatórias (sempre aplicadas)
- **Role Prompting**: Atribui papel específico à IA
- **Emotion Prompting**: Adiciona peso emocional quando apropriado
- **Atribuição de QI**: Define nível de sofisticação (130-160)

#### 🔹 Técnicas Situacionais (aplicadas conforme contexto)
- **Fake Past Consistency**: Para tópicos técnicos complexos
- **Fake Audience**: Para explicações didáticas
- **Obviously**: Para debates e análises críticas
- **False Restriction**: Para criatividade e analogias
- **Version 2.0**: Para iteração e inovação
- **Someone Disagrees**: Para validação crítica
- **Bet 100 Dollars**: Para validação técnica rigorosa
- **SimToM**: Para análise multi-perspectiva
- **RaR**: Para clarificação de ambiguidades

### Validação Inteligente
- ✅ Máximo 3-4 técnicas por prompt (evita sobrecarga cognitiva)
- ✅ Prioriza clareza sobre complexidade
- ✅ Adapta tom ao contexto
- ✅ Garante especificidade e acionabilidade

## 🛠️ Instalação

### Pré-requisitos
- Node.js >= 18.0.0
- npm ou yarn

### Setup com Nix (Recomendado)

```bash
# Entre no ambiente Nix
nix-shell

# Instale as dependências
npm install

# Compile o projeto
npm run build
```

### Setup Manual

```bash
# Instale as dependências
npm install

# Compile o projeto
npm run build
```

## 🚀 Uso

### Como Servidor MCP

Configure o servidor no seu cliente MCP (ex: Claude Desktop):

```json
{
  "mcpServers": {
    "lumora-prompter": {
      "command": "node",
      "args": ["/caminho/para/LumoraPrompter/dist/index.js"]
    }
  }
}
```

### Tool: `optimize_prompt`

**Input Schema:**
```typescript
{
  user_request: string;  // Solicitação original (obrigatório)
  context?: string;      // Contexto adicional (opcional)
}
```

**Exemplo de Uso:**

```json
{
  "user_request": "Eu quero criar uma ascii art de um donut girando"
}
```

**Output:**
O servidor retorna um prompt otimizado estruturado em três seções:

1. **🎯 Análise da Solicitação**
   - Tipo de tarefa identificado
   - Objetivo principal
   - Técnicas aplicadas

2. **📋 Prompt Otimizado**
   - Prompt completo pronto para uso
   - Estruturado com markdown
   - Inclui todas as técnicas aplicadas

3. **🔍 Justificativa Técnica**
   - Razão de cada técnica
   - Melhorias esperadas

## 📁 Estrutura do Projeto

```
LumoraPrompter/
├── src/
│   ├── index.ts              # Servidor MCP principal
│   ├── types.ts              # Definições de tipos
│   ├── techniques.ts         # Registro de técnicas
│   ├── analyzer.ts           # Analisador RE2
│   ├── technique-selector.ts # Seletor estratégico
│   ├── optimizer.ts          # Orquestrador principal
│   └── formatter.ts          # Formatador de saída
├── dist/                     # Código compilado
├── package.json
├── tsconfig.json
├── shell.nix                 # Ambiente Nix
└── README.md
```

## 🧪 Exemplo Completo

**Input:**
```
"Criar um sistema de autenticação JWT para minha API REST"
```

**Output (simplificado):**

```markdown
# 🎯 ANÁLISE DA SOLICITAÇÃO

**Tipo de Tarefa**: Código/Programação
**Objetivo**: Implementar código para autenticação e JWT
**Técnicas Aplicadas**: Role Prompting, Atribuição de QI, Emotion Prompting, Bet 100 Dollars

---

# 📋 PROMPT OTIMIZADO

Você é um desenvolvedor senior especializado em autenticação e JWT com QI 160 
e profundo conhecimento em segurança e APIs.

**Tarefa Crítica**: Isso é crítico para produção e requer máxima qualidade 
e atenção aos detalhes.

**Tarefa Principal**: Criar um sistema de autenticação JWT para API REST

## Requisitos:
1. Código/solução otimizada e seguindo melhores práticas
2. Comentários explicativos detalhados
3. Código completo e imediatamente executável
4. Tratamento de erros apropriado
5. Documentação clara de decisões técnicas

**Validação**: Vamos validar com precisão extrema, como se apostássemos nisso

## Formato da Resposta:
- Código completo e funcional
- Explicação das decisões técnicas
- Exemplos de uso quando apropriado

---

# 🔍 JUSTIFICATIVA TÉCNICA

**Por que estas técnicas?**
- Role Prompting: Estabelece expertise e contexto profissional adequado
- Atribuição de QI: Define nível de sofisticação expert
- Emotion Prompting: Aumenta atenção e cuidado na resposta
- Bet 100 Dollars: Garante validação técnica rigorosa

**Melhorias Esperadas**:
- Resposta mais contextualizada e profissional
- Profundidade de resposta apropriada para nível expert
- Maior atenção a detalhes e qualidade
- Código mais robusto e bem estruturado
- Validação técnica mais rigorosa
```

## 🔧 Desenvolvimento

```bash
# Modo desenvolvimento com watch
npm run dev

# Build de produção
npm run build

# Executar servidor
npm start
```

## 📊 Tipos de Tarefa Suportados

- **Código**: Implementação, debugging, refatoração
- **Técnica**: Explicações de métodos e processos
- **Criativa**: Design, arte, soluções inovadoras
- **Analítica**: Comparações, avaliações
- **Educacional**: Tutoriais, explicações
- **Debate**: Argumentações e discussões
- **Documentação**: READMEs, comentários
- **Mista**: Tarefas multidisciplinares

## 🎓 Níveis de Complexidade

- **Básico** (QI 130): Tarefas simples e introdutórias
- **Intermediário** (QI 140): Tarefas moderadas
- **Avançado** (QI 150): Tarefas complexas
- **Expert** (QI 160): Tarefas de alta complexidade

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

MIT License - veja LICENSE para detalhes

## 🙏 Agradecimentos

Baseado em pesquisas de prompting engineering e técnicas comprovadas de otimização de instruções para LLMs.

---

**MCP-Lumora_Prompter** - Transformando solicitações simples em prompts extraordinários! 🚀
