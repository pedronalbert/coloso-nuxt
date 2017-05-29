import { assign } from 'lodash';
import { ColosoApi } from '../..//utils';

export default {
  namespaced: true,

  state: {
    id: null,
    fetching: false,
    fetchError: false,
    errorMessage: '',
    summonerName: '',
    region: 'NA',
  },

  mutations: {
    fetching(state) {
      assign(state, {
        fetching: true,
        fetchError: false,
      });
    },

    fetchSuccess(state) {
      assign(state, {
        fetching: false,
      });
    },

    fetchError(state, { message }) {
      assign(state, {
        fetching: false,
        fetchError: true,
        errorMessage: message,
      });
    },

    setParams(state, params) {
      assign(state, params);
    },
  },

  actions: {
    searchSummoner({ commit }, { summonerName, region }) {
      commit('fetching');

      return new Promise((resolve, reject) => {
        ColosoApi.summoners.byName({ summonerName, region })
          .then((response) => {
            commit('fetchSuccess');
            resolve({ summonerId: response.data.id });
          })
          .catch((err) => {
            commit('fetchError', { message: err.message });
            reject(err);
          });
      });
    },

    searchGame({ commit }, { summonerName, region }) {
      let summonerId;

      commit('fetching');

      return new Promise((resolve, reject) => {
        ColosoApi.summoners.byName({ summonerName, region })
          .then((response) => {
            summonerId = response.data.id;

            return ColosoApi.summoners.gameCurrent({ summonerId });
          })
          .then(() => {
            commit('fetchSuccess');
            resolve({ summonerId });
          })
          .catch((err) => {
            commit('fetchError', { message: err.message });
            reject(err);
          });
      });
    },

    setParams({ commit }, params) {
      commit('setParams', params);
    },
  },
};
