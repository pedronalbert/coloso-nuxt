import { merge as lMerge } from 'lodash';

export default {
  namespaced: true,

  state: {
    proBuild: {},
    proBuilds: {},
    masteries: {},
    gamesRecent: {},
    leagueEntries: {},
    championsMasteries: {},
    proPlayers: {},
    proSummoners: {},
    runes: {},
    summoners: {},
  },

  mutations: {
    merge(state, entities) {
      lMerge(state, entities);
    },
  },
};
