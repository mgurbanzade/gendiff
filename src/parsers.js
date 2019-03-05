import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const validFormats = new Set(['.json', '.yml', '.ini']);
const parsers = {
  '.yml': src => yaml.safeLoad(fs.readFileSync(src)),
  '.json': src => JSON.parse(fs.readFileSync(src)),
  '.ini': src => ini.parse(fs.readFileSync(src, 'utf-8')),
};

export default (src) => {
  const isValidFile = validFormats.has(path.extname(src));
  if (!isValidFile) return null;
  return parsers[path.extname(src)](src);
};
