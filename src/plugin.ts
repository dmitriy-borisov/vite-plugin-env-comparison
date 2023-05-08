import type { Plugin } from 'vite';
import { compare } from './core';
import { EnvComparisonOptions } from './typings';

export default function plugin(options: EnvComparisonOptions): Plugin {
  const { executionCondition = 'serve' } = options;
  return {
    name: 'env-comparison',
    config(_, { command }) {
      if (executionCondition === 'both' || executionCondition === command) {
        compare(options);
      }
    },
  };
}
