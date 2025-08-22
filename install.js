#!/usr/bin/env node

'use strict';

// inspiration: https://github.com/facebook/create-react-app/blob/main/tasks/cra.js

const fs = require('fs');
const path = require('path');
const cp = require('child_process');


const handleExit = () => {
    cleanup();
    console.log('Exiting without error.');
    process.exit();
};

const handleError = e => {
    console.error('ERROR! An error was encountered while executing');
    console.error(e);
    cleanup();
    console.log('Exiting with error.');
    process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

console.log('Hi!')

// Verify project name passed as an argument

// Create new directory in ~/projects/<project-name>

// Create .mise.toml

// Create initial package.json

// Install developer dependencies

// Install runtime dependencies

// Create tsconfig.json

// Create eslint.config.js

// Create cspell.config.js

// Create cucumber.js

// Initialize folder structure
const gitStatus = cp.execSync(`git status --porcelain`).toString();

fs.mkDir()

mkdir src
mki

// Initialize git repository
