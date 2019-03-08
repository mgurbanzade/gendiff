import _ from 'lodash';

const presentValue = value => (value instanceof Object ? '[complex value]' : value);

const funcDispatcher = {
  added: (propChain, value) => `Property '${propChain}' was added with value: '${value}'`,
  removed: propChain => `Property '${propChain}' was removed`,
  updated: (propChain, value) => `Property '${propChain}' was updated. ${value}`,
};

const render = (rawAst) => {
  const iter = (ast, propChain) => _.keys(ast).reduce((acc, nodeName) => {
    const node = ast[nodeName];
    const stringify = funcDispatcher[node.status];
    const currentChain = propChain ? `${propChain}.${node.keyName}` : node.keyName;

    if (nodeName.includes('Added')) {
      const oldVal = presentValue(ast[`${node.keyName}Removed`].value);
      const newVal = presentValue(node.value);
      return [...acc, funcDispatcher.updated(currentChain, `From '${oldVal}' to '${newVal}'`)];
    }

    if (node.children) return [acc, iter(node.children, currentChain)];
    if (node.status === 'unchanged' || nodeName.includes('Removed')) return acc;
    return [...acc, stringify(currentChain, presentValue(node.value))];
  }, []);

  return `${_.flattenDeep(iter(rawAst, '')).join('\n')}\n`;
};

export default render;
