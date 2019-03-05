import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const validFormats = new Set(['.json', '.yml']);
const parsers = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

export default (src) => {
  const isValidFile = validFormats.has(path.extname(src));
  if (!isValidFile) return null;
  const parser = parsers[path.extname(src)];
  return parser(fs.readFileSync(src).toString());
};
