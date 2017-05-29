import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import colosoApiPlugin from './plugins/colosoApiPlugin';
import entitiesPlugin from './plugins/entitiesPlugin';

Vue.use(Vuex);

export default () => new Vuex.Store({ modules, plugins: [colosoApiPlugin, entitiesPlugin] });
