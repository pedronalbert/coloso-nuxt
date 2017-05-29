import { assign } from 'lodash';
import normalize from 'json-api-normalizer';
import { denormalize, ColosoApi } from '../../utils';

export default {
  namespaced: true,

  state: {
    ids: [],
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
  },

  mutations: {
    fetch(state) {
      assign(state, {
        fetched: false,
        isFetching: true,
        fetchError: false,
      });
    },

    fetchSuccess(state, { ids }) {
      assign(state, {
        ids,
        isFetching: false,
        fetched: true,
      });
    },

    fetchFailure(state, { message: errorMessage }) {
      assign(state, {
        isFetching: false,
        fetchError: true,
        errorMessage,
      });
    },
  },

  getters: {
    list(state, getters, rootState) {
      return state.ids.map(id => denormalize(id, 'proPlayers', rootState.entities));
    },
  },

  actions: {
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        commit('fetch');

        ColosoApi.proPlayers.get()
          .then((response) => {
            const entities = normalize(response);

            commit('entities/merge', entities, { root: true });
            commit('fetchSuccess', { ids: response.data.map(proPlayer => proPlayer.id) });
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
