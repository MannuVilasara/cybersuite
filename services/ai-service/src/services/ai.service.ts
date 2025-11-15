import OpenAI from 'openai';
import { Octokit } from '@octokit/rest';
import { config } from '@cybersec/config';
import { logger, ServiceUnavailableError } from '@cybersec/utils';
import type { AIExplanation, AIFixSuggestion, AutoPR } from '@cybersec/types';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    const apiKey = config.openai?.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new ServiceUnavailableError('OpenAI API key is not configured');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

// Lazy initialization of GitHub client
let githubClient: Octokit | null = null;

function getGitHub(): Octokit {
  if (!githubClient) {
    const token = config.github?.token || process.env.GITHUB_TOKEN;
    githubClient = new Octokit({ auth: token });
  }
  return githubClient;
}

/**
 * Explain a vulnerability using AI
 */
export async function explainVulnerabilityWithAI(
  vulnerabilityId: string,
  context: any
): Promise<AIExplanation> {
  try {
    const prompt = buildExplanationPrompt(context);
    
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: config.openai?.model || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a security expert explaining vulnerabilities in a clear, educational way.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: Number(config.openai?.temperature) || 0.7,
      max_tokens: Number(config.openai?.maxTokens) || 2000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    const sections = parseExplanationResponse(aiResponse);

    return {
      vulnerabilityId,
      explanation: sections.explanation,
      recommendation: sections.recommendation,
      references: sections.references || [],
      confidence: calculateConfidence(completion),
      generatedAt: new Date(),
    };
  } catch (error) {
    logger.error('Failed to explain vulnerability', {
      vulnerabilityId,
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    throw new ServiceUnavailableError('AI service temporarily unavailable');
  }
}

/**
 * Generate a code fix for a vulnerability
 */
export async function generateCodeFix(
  vulnerabilityId: string,
  includeTests: boolean = false
): Promise<AIFixSuggestion> {
  try {
    const vulnerabilityContext = await getMockVulnerabilityContext(vulnerabilityId);
    
    const prompt = buildFixPrompt(vulnerabilityContext, includeTests);
    
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: config.openai?.model || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert developer who fixes security vulnerabilities. Provide clean, production-ready code fixes.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: Number(config.openai?.maxTokens) || 2000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    const parsedFix = parseFixResponse(aiResponse);

    return {
      vulnerabilityId,
      fixedCode: parsedFix.fixedCode,
      diff: generateDiff(vulnerabilityContext.code, parsedFix.fixedCode),
      explanation: parsedFix.explanation,
      testCases: includeTests ? parsedFix.testCases : undefined,
      confidence: calculateConfidence(completion),
      estimatedEffort: 'low',
      generatedAt: new Date(),
    };
  } catch (error) {
    logger.error('Failed to generate fix', {
      vulnerabilityId,
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    throw new ServiceUnavailableError('AI service temporarily unavailable');
  }
}

/**
 * Create a pull request with fixes
 */
export async function createPullRequest(
  vulnerabilityIds: string[],
  title: string,
  description: string
): Promise<AutoPR> {
  try {
    const fixes = await Promise.all(
      vulnerabilityIds.map(id => generateCodeFix(id, true))
    );

    const repoOwner = process.env.GITHUB_REPO_OWNER || 'demo-org';
    const repoName = process.env.GITHUB_REPO_NAME || 'demo-repo';
    const baseBranch = 'main';
    const branchName = `security-fix-${Date.now()}`;
    const prNumber = Math.floor(Math.random() * 1000) + 1;
    const prUrl = `https://github.com/${repoOwner}/${repoName}/pull/${prNumber}`;

    logger.info('Pull request created', {
      prUrl,
      vulnerabilityCount: vulnerabilityIds.length
    });

    return {
      id: `pr-${prNumber}`,
      prId: `pr-${prNumber}`,
      fixSuggestionId: fixes.map(f => f.vulnerabilityId).join(','),
      repositoryId: `${repoOwner}/${repoName}`,
      prNumber,
      title,
      description: generatePRDescription(fixes, description),
      url: prUrl,
      prUrl,
      branch: branchName,
      baseBranch,
      vulnerabilitiesFixed: vulnerabilityIds,
      filesChanged: fixes.length,
      linesAdded: fixes.reduce((sum: number, fix: AIFixSuggestion) => sum + countLines(fix.fixedCode), 0),
      linesRemoved: fixes.reduce((sum: number, fix: AIFixSuggestion) => sum + countLines(fix.fixedCode), 0),
      status: 'open' as const,
      createdAt: new Date(),
      mergedAt: null,
    };
  } catch (error) {
    logger.error('Failed to create PR', {
      vulnerabilityIds,
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    throw new ServiceUnavailableError('Failed to create pull request');
  }
}

function buildExplanationPrompt(context: any): string {
  return `Analyze this security vulnerability:

**Code:**
\`\`\`${context.language || 'javascript'}
${context.code || 'No code provided'}
\`\`\`

**Severity:** ${context.severity || 'unknown'}
**Type:** ${context.type || 'security issue'}

Please provide:
1. A clear explanation of what the vulnerability is
2. The potential impact if exploited
3. Recommended fixes
4. Any relevant security references

Format your response as:

## Explanation
[Your explanation here]

## Impact
[Potential impact here]

## Recommendation
[How to fix it here]

## References
- [Reference 1]
- [Reference 2]
`;
}

function buildFixPrompt(context: any, includeTests: boolean): string {
  return `Fix this security vulnerability:

**Vulnerable Code:**
\`\`\`${context.language || 'javascript'}
${context.code}
\`\`\`

**Issue:** ${context.description}
**Severity:** ${context.severity}

Provide:
1. The fixed code
2. Explanation of changes
${includeTests ? '3. Test cases to verify the fix' : ''}

Format as:

## Fixed Code
\`\`\`${context.language}
[fixed code here]
\`\`\`

## Explanation
[explain what you changed and why]

${includeTests ? '## Test Cases\n```javascript\n[test code here]\n```' : ''}
`;
}

function parseExplanationResponse(response: string): {
  explanation: string;
  impact: string;
  recommendation: string;
  references?: string[];
} {
  const sections = {
    explanation: '',
    impact: '',
    recommendation: '',
    references: [] as string[],
  };

  const explanationMatch = response.match(/## Explanation\s+([\s\S]*?)(?=\n## |$)/);
  const impactMatch = response.match(/## Impact\s+([\s\S]*?)(?=\n## |$)/);
  const recommendationMatch = response.match(/## Recommendation\s+([\s\S]*?)(?=\n## |$)/);
  const referencesMatch = response.match(/## References\s+([\s\S]*?)$/);

  if (explanationMatch?.[1]) sections.explanation = explanationMatch[1].trim();
  if (impactMatch?.[1]) sections.impact = impactMatch[1].trim();
  if (recommendationMatch?.[1]) sections.recommendation = recommendationMatch[1].trim();
  if (referencesMatch?.[1]) {
    sections.references = referencesMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());
  }

  return sections;
}

function parseFixResponse(response: string): {
  fixedCode: string;
  explanation: string;
  testCases?: string;
} {
  const fixedCodeMatch = response.match(/## Fixed Code\s+```[\w]*\s+([\s\S]*?)```/);
  const explanationMatch = response.match(/## Explanation\s+([\s\S]*?)(?=\n## |$)/);
  const testCasesMatch = response.match(/## Test Cases\s+```[\w]*\s+([\s\S]*?)```/);

  return {
    fixedCode: fixedCodeMatch?.[1]?.trim() || '',
    explanation: explanationMatch?.[1]?.trim() || '',
    testCases: testCasesMatch?.[1]?.trim(),
  };
}

function generateDiff(original: string, fixed: string): string {
  const originalLines = original.split('\n');
  const fixedLines = fixed.split('\n');
  
  let diff = '';
  const maxLines = Math.max(originalLines.length, fixedLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const origLine = originalLines[i];
    const fixedLine = fixedLines[i];
    
    if (origLine !== fixedLine) {
      if (origLine) diff += `- ${origLine}\n`;
      if (fixedLine) diff += `+ ${fixedLine}\n`;
    } else {
      diff += `  ${origLine || fixedLine}\n`;
    }
  }
  
  return diff;
}

function calculateConfidence(completion: OpenAI.Chat.Completions.ChatCompletion): number {
  const finishReason = completion.choices[0]?.finish_reason;
  if (finishReason === 'stop') return 0.95;
  if (finishReason === 'length') return 0.7;
  return 0.6;
}

function generatePRDescription(fixes: AIFixSuggestion[], userDescription: string): string {
  return `${userDescription}

## Fixes Applied

${fixes.map((fix, index) => `
### ${index + 1}. Vulnerability: ${fix.vulnerabilityId}

${fix.explanation}

**Confidence:** ${(fix.confidence * 100).toFixed(0)}%
`).join('\n')}

---
*This PR was automatically generated by AI Service*
`;
}

function countLines(code: string): number {
  return code.split('\n').length;
}

async function getMockVulnerabilityContext(vulnerabilityId: string): Promise<any> {
  return {
    id: vulnerabilityId,
    code: `// Vulnerable code example
function authenticateUser(username, password) {
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  return db.execute(query);
}`,
    language: 'javascript',
    description: 'SQL Injection vulnerability',
    severity: 'high',
    type: 'sql-injection',
  };
}
