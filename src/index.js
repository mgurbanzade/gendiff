import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const stringify = (sign, key, val) => `  ${sign} ${key}: ${val}`;
const getExtension = filePath => path.extname(filePath);

const parse = (filePath) => {
  const ext = getExtension(filePath);
  const parser = getParser(ext);
  if (ext === '.ini') return parser(fs.readFileSync(filePath, 'utf-8'));
  return parser(fs.readFileSync(filePath));
};

export default (...args) => {
  const [file1, file2] = args.map(file => parse(file));
  const keys = _.union(_.keys(file1), _.keys(file2));
  const diff = keys.reduce((acc, key) => {
    let tempAcc = acc;
    if (file1[key] === file2[key]) return [...acc, stringify(' ', key, file1[key])];
    if (_.has(file2, key)) tempAcc = [...tempAcc, stringify('+', key, file2[key])];
    if (_.has(file1, key)) tempAcc = [...tempAcc, stringify('-', key, file1[key])];
    return tempAcc;
  }, []);

  return _.flattenDeep(['{', diff, '}\n']).join('\n');
};
