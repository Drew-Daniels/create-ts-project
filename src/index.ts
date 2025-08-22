#!/usr/bin/env node

'use strict';

// inspiration: https://github.com/facebook/create-react-app/blob/main/tasks/cra.js

import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import { exit } from 'process';

const cleanup = () => {
  console.log('Cleaning up.');
  // Reset changes made to package.json files.
  cp.execSync(`git checkout -- packages/*/package.json`);
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

console.log('args: ', args)

// Verify project name passed as an argument

// Create new directory in ~/projects/<project-name>

// Create mise.toml

// Create initial package.json

// Install developer dependencies

// Install runtime dependencies

// Create tsconfig.json

// Create eslint.config.js

// Create cspell.config.js

// Create cucumber.js

// Initialize folder structure

// Initialize git repository
