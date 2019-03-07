import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAST from './astBuilder';
import render from './astRenderer';


const defaultIndentSize = 0;
const getExtension = filePath => path.extname(filePath);

const readDataByPath = (pathToData) => {
  const ext = getExtension(pathToData);
  const parseData = getParser(ext);
  return parseData(fs.readFileSync(pathToData, 'utf-8'));
};

export default (firstConfigPath, secondConfigPath) => {
  const firstDataObj = readDataByPath(firstConfigPath);
  const secondDataObj = readDataByPath(secondConfigPath);
  return render(buildAST(firstDataObj, secondDataObj, defaultIndentSize));
};
