const modules = import.meta.globEager('./modules/**/*.js');

const routeModuleList: any[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export default routeModuleList
