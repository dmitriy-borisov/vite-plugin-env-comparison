export type TEnvs = Record<string, string>;

export interface EnvComparisonOptions {
  source: string | string[];
  target: string;
  ignoreKeys?: string[];
  executionCondition?: 'serve' | 'build' | 'both';
}
