import { merge as lodashMerge } from 'lodash';

export default {
  namespaced: true,

  data: {
    proBuilds: {},
    proPlayers: {},
    proSummoners: {},
    runes: {},
  },

  mutations: {
    merge(state, entities) {
      lodashMerge(state, entities);
    },
  },
};
