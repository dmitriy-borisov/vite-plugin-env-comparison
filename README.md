# vite-plugin-env-comparison

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dmitriy-borisov/vite-plugin-env-comparison/test.yml)
[![npm](https://img.shields.io/npm/v/vite-plugin-env-comparison)](https://www.npmjs.com/package/vite-plugin-env-comparison)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Plugin is used for synchronization environment variables from sample file to another one.

> If you are working with env file which ignored by `.gitignore` you can create a sample with default values. All new or non-existing variables will be synchronized with your target file.

## 📦 Install

```bash
# Using NPM
npm i -D vite-plugin-env-comparison

# Using Yarn
yarn add -D vite-plugin-env-comparison

# Using pnpm
pnpm add -D vite-plugin-env-comparison

```

## 🚀 Usage

Change your Vite config file

```ts
import envComparison from 'vite-plugin-env-comparison';
...

export default defineConfig({
  plugin: [
    envComparison({
      source: '.env.local.sample',
      target: '.env.local',
    }),
    ...
  ],
  ...
});
```

Do not forget to add your `.env.local` file to `.gitgnore` ;)

## ⚙️ Options

```ts
export interface EnvComparisonOptions {
  /**
   * Path to source file or array of files
   */
  source: string | string[];

  /**
   * Path to target file
   */
  target: string;

  /**
   * If you need to ignore some environment variables from source file you can pass the environment keys
   */
  ignoreKeys?: string[];

  /**
   * Condition of execution the plugin
   *
   * serve - running only with dev-server
   * build - running with build
   * both - both conditions
   *
   * @defaultValue 'serve'
   */
  executionCondition?: 'serve' | 'build' | 'both';
}
```
