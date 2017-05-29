import { assign } from 'lodash';
import normalize from 'json-api-normalizer';

import { denormalize, ColosoApi } from '../../../utils';

export default {
  namespaced: true,

  state: {
    id: null,
    fetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
  },

  mutations: {
    fetching(state) {
      assign(state, {
        fetched: false,
        fetching: true,
        fetchError: false,
      });
    },

    fetchSuccess(state, { id }) {
      assign(state, {
        id,
        fetching: false,
        fetched: true,
      });
    },

    fetchFailure(state, { message: errorMessage }) {
      assign(state, {
        fetching: false,
        fetchError: true,
        errorMessage,
      });
    },
  },

  getters: {
    data({ id }, getters, rootState) {
      return denormalize(id, 'runes', rootState.entities);
    },
  },

  actions: {
    fetchById({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('fetching');

        ColosoApi.summoners.runes({ id })
        .then((response) => {
          const entities = normalize(response);

          commit('fetchSuccess', { id: response.data.id, entities });
          resolve(response);
        })
        .catch((error) => {
          commit('fetchFailure', { message: error.message });
          reject(error);
        });
      });
    },
  },
};
