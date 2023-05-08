import * as fs from 'fs';
import { TEnvs } from './typings';

export function parseEnvsFromFile(path: string, force?: boolean): TEnvs {
  try {
    const source = fs.readFileSync(path).toString();
    const res = source
      .split('\n')
      .map(l => l.trim())
      .filter(l => {
        return !l.startsWith('#') && Boolean(l);
      })
      .map(l => l.split('='));

    return Object.fromEntries(res);
  } catch {
    if (force) {
      return {};
    }

    throw new Error(`Cannot read or parse file '${path}'`);
  }
}

export function diffEnvs(source: TEnvs, target: TEnvs): TEnvs {
  return Object.keys(source).reduce<TEnvs>((acc, key) => {
    if (target[key]) {
      return acc;
    }

    acc[key] = source[key];
    return acc;
  }, {});
}

export function appendEnvsToFile(path: string, envs: TEnvs) {
  let res = fs.existsSync(path) ? fs.readFileSync(path).toString() : '';
  if (res.length && !res.endsWith('\n')) {
    res += '\n';
  }

  Object.keys(envs).forEach(key => {
    res += `${key}=${envs[key]}\n`;
  });

  fs.writeFileSync(path, res);
}
