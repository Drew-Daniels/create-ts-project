#!/usr/bin/env node

'use strict';

// inspiration: https://github.com/facebook/create-react-app/blob/main/tasks/cra.js

import fs, { existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import cp from 'child_process';
import { exit } from 'process';
import lodash from "lodash";
import ora from 'ora';

// Where the user called the script
const CWD = process.env.INIT_CWD as string;
const spinner = ora();

// Paths to files created
const MISE_CONF_PATH = join(CWD, 'mise.toml');

import defaultPkgJson from "./package.json" with { type: "json"};
import defaultTSConfig from "./tsconfig.json" with { type: "json" };
import { fileURLToPath } from 'url';

const pkgJson = lodash.cloneDeep(defaultPkgJson)

const cleanup = () => {
  console.log('Cleaning up.');
  // Reset changes made to package.json files.
  // cp.execSync(`git checkout -- packages/*/package.json`);
  // Uncomment when snapshot testing is enabled by default:
  // rm ./template/src/__snapshots__/App.test.js.snap
  if (existsSync(MISE_CONF_PATH)) {
    rmSync(MISE_CONF_PATH, { recursive: true })
  }

};

const handleExit = () => {
  cleanup();
  console.log('Exiting without error.');
  process.exit();
};

const handleError = (e: Error) => {
  console.error('ERROR! An error was encountered while executing');
  console.error(e);
  cleanup();
  console.log('Exiting with error.');
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Project name must be provided")
  exit(1)
}

// TODO: Add better validation to ensure that the value provided is a string and not characters that cannot be used for a directory name

const projectName = args[0];

console.log('args: ', args)

pkgJson.name = projectName;

// Create new directory in ~/projects/<project-name>

// https://stackoverflow.com/a/49875811/13175926
const projectDir = join(process.env.INIT_CWD as string, projectName);
console.log("projectDir: ", projectDir)

if (fs.existsSync(projectDir)) {
  console.error("Project with this name already exists in the current directory")
  exit(1)
}

mkdirSync(projectDir);

process.chdir(projectDir)

// Create mise.toml
cp.execSync("mise use node@22.17.1")

// Create initial package.json
fs.writeFileSync(join(projectDir, 'package.json'), Buffer.from(JSON.stringify(pkgJson)))

// Install dependencies
spinner.start('Installing dependencies')
cp.execSync("npm i")
spinner.stop()

// Create tsconfig.json
fs.writeFileSync(join(projectDir, 'tsconfig.json'), Buffer.from(JSON.stringify(defaultTSConfig)))

// Create eslint.config.js
const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

// Create eslint.config.js
const eslintConfigPath = join(dir, 'eslint.config.js')
const defaultESLintConfig = fs.readFileSync(eslintConfigPath)
fs.writeFileSync(join(projectDir, 'eslint.config.js'), Buffer.from(defaultESLintConfig))

// Create cspell.config.js
const cspellConfigPath = join(dir, 'cspell.config.js');
const defaultCSpellConfig = fs.readFileSync(cspellConfigPath);
fs.writeFileSync(join(projectDir, 'cspell.config.js'), Buffer.from(defaultCSpellConfig))

// Create cucumber.js
const cucumberConfigPath = join(dir, 'cucumber.js');
const defaultCucumberConfig = fs.readFileSync(cucumberConfigPath);
fs.writeFileSync(join(projectDir, 'cucumber.js'), Buffer.from(defaultCucumberConfig))

// Initialize folder structure
fs.mkdirSync('src')
fs.mkdirSync('test/feature', { recursive: true })
fs.mkdirSync('test/unit', { recursive: true })

// Initialize src files
fs.writeFileSync(join(projectDir, 'src/index.ts'), 'console.log("Hello world!")')

// Initialize git repository
cp.execSync('git init')

// Create .gitignore
fs.writeFileSync(join(projectDir, '.gitignore'), 'dist')

// Track files
cp.execSync('git add .')

// Initial commit
cp.execSync('git commit -m "Initial commit"')
