#!/usr/bin/env node
'use strict';
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
const handleError = (e) => {
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
    console.error("Project name must be provided");
    exit(1);
}
console.log('args: ', args);
