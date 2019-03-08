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
    const stringify = funcDispatcher[node.type];
    const currentChain = propChain ? `${propChain}.${node.keyName}` : node.keyName;

    if (node.type === 'updated') {
      const oldVal = presentValue(node.oldValue);
      const newVal = presentValue(node.newValue);
      return [...acc, funcDispatcher.updated(currentChain, `From '${oldVal}' to '${newVal}'`)];
    }

    if (node.children) return [acc, iter(node.children, currentChain)];
    if (node.type === 'unchanged' || nodeName.includes('Removed')) return acc;
    return [...acc, stringify(currentChain, presentValue(node.newValue))];
  }, []);

  return `${_.flattenDeep(iter(rawAst, '')).join('\n')}\n`;
};

export default render;
