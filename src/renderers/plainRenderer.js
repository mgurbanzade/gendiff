/* eslint-disable no-use-before-define */
import _ from 'lodash';

const presentValue = value => (value instanceof Object ? '[complex value]' : value);

const funcDispatcher = {
  added: propsObj => `Property '${propsObj.chain}' was added with value: '${presentValue(propsObj.node.newValue)}'`,
  removed: propsObj => `Property '${propsObj.chain}' was removed`,
  internallyChanged: propsObj => iter(propsObj.node.children, propsObj.chain),
  updated: propsObj => `Property '${propsObj.chain}' was updated. From '${presentValue(propsObj.node.oldValue)}' to '${presentValue(propsObj.node.newValue)}'`,
};

const iter = (ast, propChain = '') => _.keys(ast)
  .filter(nodeName => ast[nodeName].type !== 'unchanged')
  .map((nodeName) => {
    const node = ast[nodeName];
    const stringify = funcDispatcher[node.type];
    const currentChain = propChain ? `${propChain}.${node.keyName}` : node.keyName;
    return stringify({ node, chain: currentChain });
  });

const render = ast => `${_.flattenDeep(iter(ast)).join('\n')}\n`;

export default render;
