import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const stringify = (sign, key, val) => `  ${sign} ${key}: ${val}`;
const getExtension = filePath => path.extname(filePath);

const parse = (filePath) => {
  const ext = getExtension(filePath);
  const parseFile = getParser(ext);
  return parseFile(fs.readFileSync(filePath, 'utf-8'));
};

export default (...args) => {
  const [filePath1, filePath2] = args.map(filePath => parse(filePath));
  const keys = _.union(_.keys(filePath1), _.keys(filePath2));
  const diff = keys.reduce((acc, key) => {
    if (filePath1[key] === filePath2[key]) {
      return [...acc, stringify(' ', key, filePath1[key])];
    }

    if (_.has(filePath2, key) && _.has(filePath1, key)) {
      return [
        ...acc,
        stringify('+', key, filePath2[key]),
        stringify('-', key, filePath1[key]),
      ];
    }

    if (_.has(filePath2, key) && !_.has(filePath1, key)) {
      return [...acc, stringify('+', key, filePath2[key])];
    }

    return [...acc, stringify('-', key, filePath1[key])];
  }, []);

  return _.flattenDeep(['{', diff, '}\n']).join('\n');
};
