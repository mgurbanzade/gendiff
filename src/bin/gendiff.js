#!/usr/bin/env node
import program from 'commander';
import { v } from '../../package.json';
import genDiff from '..';

program
  .version(v, '-V, --version')
  .description('A utility that calculates the difference between two config files')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((before, after) => console.log(genDiff(before, after)))
  .parse(process.argv);
