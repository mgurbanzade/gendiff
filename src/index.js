import fs from 'fs';
import _ from 'lodash';

const stringify = (sign, key, val) => `  ${sign} ${key}: ${val}`;
export default (firstConfig, secondConfig) => {
  const
    [file1, file2] = [firstConfig, secondConfig]
      .map(file => JSON.parse(fs.readFileSync(file).toString()));
  const keys = _.uniq(Object.keys(file1).concat(Object.keys(file2)));
  const diff = keys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      acc.push(stringify(' ', key, file1[key]));
      return acc;
    }
    if (_.has(file2, key)) acc.push(stringify('+', key, file2[key]));
    if (_.has(file1, key)) acc.push(stringify('-', key, file1[key]));

    return acc;
  }, []);

  return _.flattenDeep(['{', diff, '}\n']).join('\n');
};
