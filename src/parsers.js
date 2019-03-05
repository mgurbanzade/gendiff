import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (extension) => {
  if (!parsers[extension]) {
    throw new Error(`Files with extensions of ${extension} are not supported.`);
  }
  return parsers[extension];
};
