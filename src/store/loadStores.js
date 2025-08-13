const stores = import.meta.globEager('./modules/**/*.js');

const storeMap = {};

Object.keys(stores).forEach((key) => {
  const strs = key.split('/')
  const keyName = strs[strs.length - 1].replace('.js','')
  storeMap[keyName] = stores[key].default
});

export default storeMap
