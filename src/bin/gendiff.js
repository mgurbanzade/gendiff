#!/usr/bin/env node
import program from 'commander';
import { v } from '../../package.json';
import genDiff from '..';

program
  .version(v, '-V, --version')
  .description('A utility that calculates the difference between two config files')
  .arguments('<firstConfigPath> <secondConfigPath>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfigPath, secondConfigPath) => {
    console.log(genDiff(firstConfigPath, secondConfigPath));
  })
  .parse(process.argv);
