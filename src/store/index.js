import Vue from "vue";
import Vuex from "vuex";
import loadStores from "./loadStores";
import home from "./modules/base/home";
Vue.use(Vuex);

const store = {
  state: {
    version: "1.0.0",
    ...home.state
  },
  getters:{...home.getters},
  mutations:{...home.mutations},
  modules: loadStores
};

export default new Vuex.Store(store)
