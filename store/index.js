import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import entitiesPlugin from './plugins/entitiesPlugin';

Vue.use(Vuex);

export default () => new Vuex.Store({ modules, plugins: [entitiesPlugin] });
