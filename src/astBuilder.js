import _ from 'lodash';

const buildNode = (indentSize, status, keyName, value = null, children = null) => ({
  indentSize,
  status,
  keyName,
  value,
  children,
});

const buildTree = (dataObj1, dataObj2, indentSize) => {
  const dataObjKeys = _.union(_.keys(dataObj1), _.keys(dataObj2));

  return dataObjKeys.reduce((acc, key) => {
    const dataObjVal1 = dataObj1[key];
    const dataObjVal2 = dataObj2[key];

    if (dataObjVal1 instanceof Object && dataObjVal2 instanceof Object) {
      return {
        ...acc,
        [key]: buildNode(indentSize, 'internallyChanged', key, null, buildTree(dataObjVal1, dataObjVal2, indentSize + 4)),
      };
    }

    if (dataObjVal1 === dataObjVal2) {
      return {
        ...acc,
        [key]: buildNode(indentSize, 'unchanged', key, dataObjVal1),
      };
    }

    if (_.has(dataObj1, key) && _.has(dataObj2, key)) {
      return {
        ...acc,
        [`${key}Added`]: buildNode(indentSize, 'added', key, dataObjVal2),
        [`${key}Removed`]: buildNode(indentSize, 'removed', key, dataObjVal1),
      };
    }

    if (_.has(dataObj2, key) && !_.has(dataObj1, key)) {
      return {
        ...acc,
        [key]: buildNode(indentSize, 'added', key, dataObjVal2),
      };
    }

    return {
      ...acc,
      [key]: buildNode(indentSize, 'removed', key, dataObjVal1),
    };
  }, {});
};

export default buildTree;
