import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const stringify = (sign, key, val) => `  ${sign} ${key}: ${val}`;
const getExtension = filePath => path.extname(filePath);

const readDataByPath = (pathToData) => {
  const ext = getExtension(pathToData);
  const parseData = getParser(ext);
  return parseData(fs.readFileSync(pathToData, 'utf-8'));
};

export default (firstConfigPath, secondConfigPath) => {
  const firstDataObj = readDataByPath(firstConfigPath);
  const secondDataObj = readDataByPath(secondConfigPath);
  const dataObjKeys = _.union(_.keys(firstDataObj), _.keys(secondDataObj));

  const diff = dataObjKeys.reduce((acc, key) => {
    if (firstDataObj[key] === secondDataObj[key]) {
      return [...acc, stringify(' ', key, firstDataObj[key])];
    }

    if (_.has(secondDataObj, key) && _.has(firstDataObj, key)) {
      return [
        ...acc,
        stringify('+', key, secondDataObj[key]),
        stringify('-', key, firstDataObj[key]),
      ];
    }

    if (_.has(secondDataObj, key) && !_.has(firstDataObj, key)) {
      return [...acc, stringify('+', key, secondDataObj[key])];
    }

    return [...acc, stringify('-', key, firstDataObj[key])];
  }, []);

  return _.flattenDeep(['{', diff, '}\n']).join('\n');
};
