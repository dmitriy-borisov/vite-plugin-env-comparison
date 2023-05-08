import { compare } from '../src/core';
import { beforeAll, describe, expect, test } from 'vitest';
import * as fs from 'fs';

const TARGET_FILE = './tests/.env.local';

describe('creating files', () => {
  test('should create new env file', () => {
    compare({
      source: ['./tests/.env.local.sample'],
      target: TARGET_FILE,
    });
    expect(fs.existsSync(TARGET_FILE)).toBeTruthy();
  });

  test('should log invalid source file', () => {
    expect(() =>
      compare({
        source: ['./tests/.env.invalid'],
        target: TARGET_FILE,
      })
    ).rejects.toThrowError(/^(Cannot read or parse file)(.*)\.env.invalid'$/);
  });
});

describe('working with existing file', () => {
  test('should be equal to source', () => {
    const res = `VITE_TESTING_1=1\nVITE_TESTING_2=2\n`;
    const target = fs.readFileSync(TARGET_FILE).toString();

    expect(target).toBe(res);
  });

  test('should add missing environment variables', () => {
    const res = `VITE_TESTING_1=1\nVITE_TESTING_2=2\nVITE_TESTING_3=3\nVITE_TESTING_4=4\n`;
    compare({
      source: ['./tests/.env.local.sample', './tests/.env.local.sample2'],
      target: TARGET_FILE,
    });

    const target = fs.readFileSync(TARGET_FILE).toString();
    expect(target).toBe(res);
  });

  test('should ignore some keys', () => {
    const res = `VITE_TESTING_1=1\nVITE_TESTING_2=2\nVITE_TESTING_4=4\n`;

    fs.unlinkSync(TARGET_FILE);
    compare({
      source: ['./tests/.env.local.sample', './tests/.env.local.sample2'],
      target: TARGET_FILE,
      ignoreKeys: ['VITE_TESTING_3'],
    });

    const target = fs.readFileSync(TARGET_FILE).toString();
    expect(target).toBe(res);
  });
});

beforeAll(() => {
  if (fs.existsSync(TARGET_FILE)) {
    fs.unlinkSync(TARGET_FILE);
  }

  return () => fs.unlinkSync(TARGET_FILE);
});
