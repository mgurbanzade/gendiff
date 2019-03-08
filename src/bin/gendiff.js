#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.0.5')
  .description('A utility that calculates the difference between two config files')
  .arguments('<firstConfigPath> <secondConfigPath>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfigPath, secondConfigPath) => {
    console.log(genDiff(firstConfigPath, secondConfigPath, program.format));
  })
  .parse(process.argv);
