/* eslint-disable no-use-before-define */
import _ from 'lodash';

const indent = times => ' '.repeat(times);

const stringifyObj = (obj, depth) => {
  if (!_.isObject(obj)) return obj;
  const newObj = _.keys(obj).reduce((acc, key) => [...acc, `${indent(depth + 8)}${key}: ${obj[key]}`], []);
  return _.flattenDeep(['{', newObj, `${indent(depth + 4)}}`]).join('\n');
};

const funcDispatcher = {
  unchanged: (node, depth) => `${indent(depth + 4)}${node.keyName}: ${stringifyObj(node.newValue, depth)}`,
  added: (node, depth) => `${indent(depth + 2)}+ ${node.keyName}: ${stringifyObj(node.newValue, depth)}`,
  removed: (node, depth) => `${indent(depth + 2)}- ${node.keyName}: ${stringifyObj(node.oldValue, depth)}`,
  updated: (node, depth) => [
    funcDispatcher.added(node, depth), funcDispatcher.removed(node, depth),
  ],
  internallyChanged: (node, depth) => {
    const nodeChildren = iter(node.children, depth + 4);
    const nodeValue = ['{', nodeChildren, `${indent(depth + 4)}}`].join('\n');
    return `${indent(depth + 4)}${node.keyName}: ${nodeValue}`;
  },
};

const iter = (ast, depth = 0) => {
  const newAST = _.keys(ast).map((nodeName) => {
    const node = ast[nodeName];
    const stringify = funcDispatcher[node.type];
    return stringify(node, depth);
  });

  return _.flattenDeep(newAST).join('\n');
};

const render = ast => `{\n${iter(ast)}\n}\n`;

export default render;
