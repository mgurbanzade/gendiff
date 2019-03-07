import _ from 'lodash';

const indent = times => ' '.repeat(times);

const stringifyObj = (obj, indentSize) => {
  const newObj = _.keys(obj).reduce((acc, key) => [...acc, `${indent(indentSize + 8)}${key}: ${obj[key]}`], []);
  return _.flattenDeep(['{', newObj, `${indent(indentSize + 4)}}`]).join('\n');
};

const funcDispatcher = {
  unchanged: (node, f) => `${indent(node.indentSize + 4)}${node.keyName}: ${f()}`,
  internallyChanged: (node, f) => `${indent(node.indentSize + 4)}${node.keyName}: ${f()}`,
  added: (node, f) => `${indent(node.indentSize + 2)}+ ${node.keyName}: ${f()}`,
  removed: (node, f) => `${indent(node.indentSize + 2)}- ${node.keyName}: ${f()}`,
};

const render = (rawAst) => {
  const iter = (ast) => {
    const newAST = _.keys(ast).reduce((acc, nodeName) => {
      const node = ast[nodeName];
      const stringify = funcDispatcher[node.status];

      if (node.value instanceof Object) {
        return [...acc, stringify(node, () => stringifyObj(node.value, node.indentSize))];
      }

      if (node.children && !node.value) {
        return [
          ...acc,
          stringify(node, () => ['{', iter(node.children), `${indent(node.indentSize + 4)}}`].join('\n')),
        ];
      }

      return [...acc, stringify(node, () => node.value)];
    }, []);

    return _.flattenDeep(newAST).join('\n');
  };


  return `{\n${iter(rawAst)}\n}\n`;
};

export default render;
