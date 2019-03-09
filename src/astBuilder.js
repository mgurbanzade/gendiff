import _ from 'lodash';

const buildNode = (type, keyName, oldValue = null, newValue = null, children = []) => ({
  type,
  keyName,
  oldValue,
  newValue,
  children,
});

const buildTree = (dataObj1, dataObj2) => {
  const dataObjKeys = _.union(_.keys(dataObj1), _.keys(dataObj2));

  return dataObjKeys.reduce((acc, key) => {
    const dataObjVal1 = dataObj1[key];
    const dataObjVal2 = dataObj2[key];

    if (dataObjVal1 instanceof Object && dataObjVal2 instanceof Object) {
      const nodeChildren = buildTree(dataObjVal1, dataObjVal2);
      return [...acc, buildNode('internallyChanged', key, null, null, nodeChildren)];
    }

    if (dataObjVal1 === dataObjVal2) {
      return [...acc, buildNode('unchanged', key, dataObjVal1, dataObjVal2)];
    }

    if (_.has(dataObj1, key) && _.has(dataObj2, key)) {
      return [...acc, buildNode('updated', key, dataObjVal1, dataObjVal2)];
    }


    if (_.has(dataObj2, key) && !_.has(dataObj1, key)) {
      return [...acc, buildNode('added', key, null, dataObjVal2)];
    }

    return [...acc, buildNode('removed', key, dataObjVal1, null)];
  }, []);
};

export default buildTree;
