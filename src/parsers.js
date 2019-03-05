import yaml from 'js-yaml';
import ini from 'ini';

const validExtensions = new Set(['.json', '.yml', '.ini']);
const parsers = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (extension) => {
  if (!validExtensions.has(extension)) return null;
  return parsers[extension];
};
