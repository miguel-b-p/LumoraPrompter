# Exemplos de Uso - MCP-Lumora_Prompter

Este documento contém exemplos práticos de como o MCP-Lumora_Prompter transforma solicitações simples em prompts otimizados.

---

## Exemplo 1: Código - ASCII Art de Donut

### Input
```json
{
  "user_request": "Eu quero criar uma ascii art de um donut girando"
}
```

### Análise Automática
- **Tipo de Tarefa**: Criativa + Técnica (código + arte)
- **Complexidade**: Expert
- **Técnicas Aplicadas**: Role Prompting, IQ 160, Emotion Prompting, Fake Past Consistency

### Prompt Otimizado (resumido)
```markdown
Você é um desenvolvedor criativo especializado em computação gráfica e arte ASCII 
com QI 160 e profundo conhecimento em renderização e 3D.

**Contexto Prévio**: Você me explicou anteriormente sobre projeção 3D em espaço 2D 
usando ASCII, mas agora preciso implementar especificamente um donut girando.

**Tarefa Crítica**: Isso é crítico e demanda precisão e expertise.

Crie um programa completo que renderize uma animação ASCII de um toro 3D (donut) 
com rotação suave.

## Requisitos:
1. Equações paramétricas de toro
2. Iluminação básica
3. Caracteres ASCII por intensidade
4. Z-buffer para profundidade
5. Animação em loop contínuo
...
```

---

## Exemplo 2: Técnica - Explicar Microserviços

### Input
```json
{
  "user_request": "Explique o que são microserviços e quando usar",
  "context": "Para estudantes de graduação"
}
```

### Análise Automática
- **Tipo de Tarefa**: Educacional
- **Complexidade**: Intermediário
- **Técnicas Aplicadas**: Role Prompting, IQ 140, Fake Audience

### Prompt Otimizado (resumido)
```markdown
Você é um educador experiente em arquitetura de software com QI 140 e profundo 
conhecimento em microserviços e arquitetura.

**Audiência**: Explique como se apresentasse para estudantes de graduação

**Tarefa Principal**: Explicar o que são microserviços e quando usar

## Requisitos:
1. Explicação clara e didática
2. Exemplos práticos
3. Conceitos fundamentais destacados

## Formato da Resposta:
- Explicação clara e didática
- Exemplos práticos
- Conceitos fundamentais destacados
```

---

## Exemplo 3: Análise - React vs Vue

### Input
```json
{
  "user_request": "Qual framework é melhor: React ou Vue?"
}
```

### Análise Automática
- **Tipo de Tarefa**: Analítica + Debate
- **Complexidade**: Avançado
- **Técnicas Aplicadas**: Role Prompting, IQ 150, Someone Disagrees, SimToM

### Prompt Otimizado (resumido)
```markdown
Você é um analista especializado em frameworks com QI 150 e profundo conhecimento 
em React e Vue.

**Consideração Importante**: Alguns especialistas argumentam contra essa abordagem 
de frameworks. Considere isso na sua resposta.

**Tarefa Principal**: Analisar e comparar React vs Vue

## Requisitos:
1. Código/solução otimizada e seguindo melhores práticas
2. Documentação clara de decisões técnicas
3. Analise da perspectiva do usuário, do desenvolvedor e do negócio

## Formato da Resposta:
- Análise comparativa detalhada
- Prós e contras de cada opção
- Recomendação fundamentada
```

---

## Exemplo 4: Código - API REST com JWT

### Input
```json
{
  "user_request": "Criar sistema de autenticação JWT para API REST em produção"
}
```

### Análise Automática
- **Tipo de Tarefa**: Código
- **Complexidade**: Expert
- **Técnicas Aplicadas**: Role Prompting, IQ 160, Emotion Prompting, Bet $100

### Prompt Otimizado (resumido)
```markdown
Você é um desenvolvedor senior especializado em autenticação e JWT com QI 160 
e profundo conhecimento em segurança e REST.

**Tarefa Crítica**: Isso é crítico para produção e requer máxima qualidade 
e atenção aos detalhes.

**Validação**: Vamos validar com precisão extrema, como se apostássemos nisso

## Requisitos:
1. Código/solução otimizada e seguindo melhores práticas
2. Comentários explicativos detalhados
3. Código completo e imediatamente executável
4. Tratamento de erros apropriado
5. Documentação clara de decisões técnicas

## Formato da Resposta:
- Código completo e funcional
- Explicação das decisões técnicas
- Exemplos de uso quando apropriado
```

---

## Exemplo 5: Criativo - Design de Logo

### Input
```json
{
  "user_request": "Criar conceito de logo para startup de IA"
}
```

### Análise Automática
- **Tipo de Tarefa**: Criativa
- **Complexidade**: Avançado
- **Técnicas Aplicadas**: Role Prompting, IQ 150, False Restriction

### Prompt Otimizado (resumido)
```markdown
Você é um designer criativo e inovador em logo com QI 150 e profundo conhecimento 
em startup e IA.

**Abordagem**: Use conceitos de design moderno e minimalista

**Tarefa Principal**: Criar conceito de logo para startup de IA

## Requisitos:
1. Código/solução otimizada e seguindo melhores práticas
2. Documentação clara de decisões técnicas
```

---

## Exemplo 6: Documentação - README de Projeto

### Input
```json
{
  "user_request": "Escrever README completo para biblioteca Python de ML"
}
```

### Análise Automática
- **Tipo de Tarefa**: Documentação
- **Complexidade**: Intermediário
- **Técnicas Aplicadas**: Role Prompting, IQ 140, Emotion Prompting

### Prompt Otimizado (resumido)
```markdown
Você é um technical writer especializado em documentação com QI 140 e profundo 
conhecimento em biblioteca e Python.

**Tarefa Crítica**: Isso é importante e precisa ser feito com cuidado e precisão.

**Tarefa Principal**: Documentar biblioteca Python de ML

## Requisitos:
1. Código/solução otimizada e seguindo melhores práticas
2. Documentação clara de decisões técnicas
```

---

## Padrões Observados

### Técnicas Obrigatórias (Sempre Presentes)
- ✅ **Role Prompting**: Define papel específico baseado no tipo de tarefa
- ✅ **IQ Attribution**: Ajusta sofisticação (130-160) baseado em complexidade

### Técnicas Situacionais (Aplicadas Conforme Contexto)
- 🎯 **Emotion Prompting**: Código, produção, alta complexidade
- 🎯 **Fake Past Consistency**: Tópicos técnicos complexos
- 🎯 **Fake Audience**: Tarefas educacionais
- 🎯 **False Restriction**: Tarefas criativas
- 🎯 **Someone Disagrees**: Debates e análises
- 🎯 **Bet $100**: Validação técnica rigorosa
- 🎯 **SimToM**: Múltiplas perspectivas

### Melhorias Esperadas
1. **Clareza**: Objetivos e requisitos explícitos
2. **Contexto**: Papel e expertise adequados
3. **Estrutura**: Organização hierárquica clara
4. **Especificidade**: Instruções acionáveis
5. **Validação**: Critérios de qualidade definidos

---

## Testando o MCP

Para testar esses exemplos:

1. Configure o servidor MCP
2. Use a tool `optimize_prompt`
3. Compare a saída otimizada com sua solicitação original
4. Observe a melhoria na qualidade da resposta da IA

## Dicas de Uso

1. **Seja específico**: Quanto mais contexto, melhor a otimização
2. **Use o campo context**: Para requisitos especiais ou audiência
3. **Experimente diferentes formulações**: Veja como o sistema adapta
4. **Analise a justificativa**: Aprenda com as técnicas aplicadas
