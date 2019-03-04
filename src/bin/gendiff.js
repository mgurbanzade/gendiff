#!/usr/bin/env node
import program from 'commander';
import { v } from '../../package.json';

program
  .version(v, '-V, --version')
  .description('A utility that calculates the difference between two config files')
  .arguments('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
