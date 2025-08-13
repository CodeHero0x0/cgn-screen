const apis = import.meta.globEager('./apis/**/*.js');

const apiMap = {};

Object.keys(apis).forEach((key) => {
  const strs = key.split('/')
  const keyName = strs[strs.length - 1].replace('.js','')
  apiMap[keyName] = apis[key].default
});

export default apiMap
