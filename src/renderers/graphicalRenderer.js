import _ from 'lodash';

const indent = times => ' '.repeat(times);
const isObj = input => input instanceof Object;

const stringifyObj = (obj, indentSize) => {
  if (!isObj(obj)) return obj;
  const newObj = _.keys(obj).reduce((acc, key) => [...acc, `${indent(indentSize + 8)}${key}: ${obj[key]}`], []);
  return _.flattenDeep(['{', newObj, `${indent(indentSize + 4)}}`]).join('\n');
};

const funcDispatcher = {
  unchanged: (node, indentSize) => `${indent(indentSize + 4)}${node.keyName}: ${stringifyObj(node.newValue, indentSize)}`,
  internallyChanged: (node, indentSize, f) => `${indent(indentSize + 4)}${node.keyName}: ${f()}`,
  added: (node, indentSize) => `${indent(indentSize + 2)}+ ${node.keyName}: ${stringifyObj(node.newValue, indentSize)}`,
  removed: (node, indentSize) => `${indent(indentSize + 2)}- ${node.keyName}: ${stringifyObj(node.oldValue, indentSize)}`,
};

const render = (rawAst) => {
  const defaultIndentSize = 0;

  const iter = (ast, indentSize) => {
    const newAST = _.keys(ast).reduce((acc, nodeName) => {
      const node = ast[nodeName];
      const stringify = funcDispatcher[node.type];

      if (node.type === 'internallyChanged') {
        const nodeChildren = iter(node.children, indentSize + 4);
        return [...acc, stringify(node, indentSize, () => ['{', nodeChildren, `${indent(indentSize + 4)}}`].join('\n'))];
      }

      if (node.type === 'updated') {
        return [...acc,
          funcDispatcher.added(node, indentSize), funcDispatcher.removed(node, indentSize),
        ];
      }

      return [...acc, stringify(node, indentSize, () => node.value)];
    }, []);

    return _.flattenDeep(newAST).join('\n');
  };


  return `{\n${iter(rawAst, defaultIndentSize)}\n}\n`;
};

export default render;
