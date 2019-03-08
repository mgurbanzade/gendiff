import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAST from './astBuilder';
import getRenderer from './renderers';

const getExtension = filePath => path.extname(filePath);

const readDataByPath = (pathToData) => {
  const ext = getExtension(pathToData);
  const parseData = getParser(ext);
  return parseData(fs.readFileSync(pathToData, 'utf-8'));
};

export default (firstConfigPath, secondConfigPath, format) => {
  const firstDataObj = readDataByPath(firstConfigPath);
  const secondDataObj = readDataByPath(secondConfigPath);
  const render = getRenderer(format);
  return render(buildAST(firstDataObj, secondDataObj));
};
