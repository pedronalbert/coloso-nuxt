import moment from 'moment';
import { assign, clone, get, find } from 'lodash';
import normalize from 'json-api-normalizer';
import { denormalize, ColosoApi } from '../../utils';

const INITIAL_STATE = {
  id: null,
  summonerId: null,
  fetching: false,
  fetched: false,
  fetchedAt: null,
  fetchError: false,
  errorMessage: '',
};

export default {
  namespaced: true,

  state: clone(INITIAL_STATE),

  mutations: {
    fetching(state) {
      assign(state, {
        fetched: false,
        fetching: true,
        fetchError: false,
      });
    },

    fetchSuccess(state, { id, summonerId }) {
      assign(state, {
        id,
        summonerId,
        fetching: false,
        fetched: true,
        fetchedAt: moment().format(),
      });
    },

    fetchFailure(state, { message: errorMessage }) {
      assign(state, {
        fetching: false,
        fetchError: true,
        errorMessage,
      });
    },

    clearCache(state) {
      assign(state, clone(INITIAL_STATE));
    },
  },

  getters: {
    data({ id }, getters, rootState) {
      return denormalize(id, 'gamesCurrent', rootState.entities);
    },

    focusChampionId({ summonerId }, getters) {
      let championId;

      const participant = find(get(getters.data, ['participants']), { summonerId });

      if (participant) {
        championId = participant.championId;
      }

      return championId;
    },
  },

  actions: {
    fetchGame({ commit }, summonerId) {
      return new Promise((resolve, reject) => {
        commit('fetching');

        ColosoApi.summoners.gameCurrent({ summonerId })
          .then((response) => {
            const entities = normalize(response);

            commit('entities/merge', entities, { root: true });
            commit('fetchSuccess', { id: response.data.id, summonerId });
            resolve(response);
          })
          .catch((error) => {
            commit('fetchFailure', { message: error.message });
            reject(error);
          });
      });
    },

    clearCache({ commit }) {
      commit('clearCache');
    },
  },
};
