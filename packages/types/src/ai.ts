/**
 * AI Service Types
 */

export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  CUSTOM = 'custom',
}

export enum FixStatus {
  PENDING = 'pending',
  GENERATED = 'generated',
  APPLIED = 'applied',
  PR_CREATED = 'pr_created',
  FAILED = 'failed',
  REJECTED = 'rejected',
}

export interface AIExplanation {
  id?: string;
  vulnerabilityId: string;
  provider?: AIProvider;
  model?: string;
  explanation: string;
  severity?: string;
  confidence: number; // 0-1
  reasoning?: string;
  recommendation?: string;
  references?: string[];
  tokens?: number;
  createdAt?: Date;
  generatedAt: Date;
}

export interface AIFixSuggestion {
  id?: string;
  vulnerabilityId: string;
  provider?: AIProvider;
  model?: string;
  originalCode?: string;
  fixedCode: string;
  suggestedFix?: string;
  diff: string;
  confidence: number; // 0-1
  explanation: string;
  status?: FixStatus;
  appliedAt?: Date | null;
  testCases?: string;
  estimatedEffort?: 'low' | 'medium' | 'high';
  tokens?: number;
  createdAt?: Date;
  generatedAt: Date;
}

export interface AutoFixPR {
  id: string;
  fixSuggestionId: string;
  repositoryId: string;
  prNumber: number;
  prUrl: string;
  branch: string;
  status: 'open' | 'merged' | 'closed';
  mergedAt: Date | null;
  createdAt: Date;
}

// Alias for AutoFixPR for backward compatibility
export type AutoPR = AutoFixPR & {
  prId: string;
  title: string;
  description: string;
  url: string;
  baseBranch: string;
  vulnerabilitiesFixed: string[];
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
};

export interface AIPromptTemplate {
  id: string;
  name: string;
  type: 'explanation' | 'fix' | 'analysis';
  template: string;
  variables: string[];
  provider: AIProvider;
  model: string;
  temperature: number;
  maxTokens: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIUsage {
  id: string;
  organizationId: string;
  userId: string;
  provider: AIProvider;
  model: string;
  operation: 'explanation' | 'fix' | 'analysis';
  tokensUsed: number;
  cost: number;
  timestamp: Date;
}
