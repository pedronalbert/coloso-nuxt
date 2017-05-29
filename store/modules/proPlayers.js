import { assign } from 'lodash';
import denormalize from '../../utils/denormalize';

import { COLOSO_API_CALL, COLOSO_API_CALL_TYPES } from '../plugins/colosoApiPlugin';

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
      commit('fetch', {
        [COLOSO_API_CALL]: {
          callType: COLOSO_API_CALL_TYPES.PRO_PLAYERS,
        },
      });
    },
  },
};
