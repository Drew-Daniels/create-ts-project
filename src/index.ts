#!/usr/bin/env node

'use strict';

// inspiration: https://github.com/facebook/create-react-app/blob/main/tasks/cra.js

import fs, { mkdir, mkdirSync } from 'fs';
import path, { dirname, join } from 'path';
import cp from 'child_process';
import { exit } from 'process';

const defPkgJson = fs.readFileSync(join(process.cwd(), 'default-package.json'))
// import defaultPkgJson from "./default-package.json" with { type: "json"};

const cleanup = () => {
  console.log('Cleaning up.');
  // Reset changes made to package.json files.
  // cp.execSync(`git checkout -- packages/*/package.json`);
  // Uncomment when snapshot testing is enabled by default:
  // rm ./template/src/__snapshots__/App.test.js.snap
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

// Create new directory in ~/projects/<project-name>

// https://stackoverflow.com/a/49875811/13175926
const projectDir = join(process.env.INIT_CWD as string, projectName);
console.log("projectDir: ", projectDir)

if (fs.existsSync(projectDir)) {
  console.error("Project with this name already exists in the current directory")
  exit(1)
}

mkdirSync(projectDir);

// Create mise.toml
cp.execSync("mise use node@22.17.1")

// Create initial package.json
fs.writeFileSync(join(projectDir, 'package.json'), Buffer.from(defPkgJson))

// Install developer dependencies

// Install runtime dependencies

// Create tsconfig.json

// Create eslint.config.js

// Create cspell.config.js

// Create cucumber.js

// Initialize folder structure

// Initialize git repository
