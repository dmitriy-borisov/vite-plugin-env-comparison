import * as path from 'path';
import { parseEnvsFromFile, diffEnvs, appendEnvsToFile } from './utils';
import { EnvComparisonOptions, TEnvs } from './typings';

export async function compare(options: EnvComparisonOptions) {
  const { source, target, ignoreKeys = [] } = options;

  const sourceEnvs = (typeof source === 'string' ? [source] : source).reduce<TEnvs>((acc, file) => {
    const filePath = path.resolve(file);
    const envs = parseEnvsFromFile(filePath);
    return Object.assign(acc, envs);
  }, {});

  const targetPath = path.resolve(target);
  const targetEnvs = parseEnvsFromFile(targetPath, true);

  // Ignoring keys
  ignoreKeys.forEach(key => (targetEnvs[key] = '_ignored'));

  // Diff
  const diff = diffEnvs(sourceEnvs, targetEnvs);
  if (!Object.keys(diff).length) {
    return;
  }

  return appendEnvsToFile(targetPath, diff);
}
