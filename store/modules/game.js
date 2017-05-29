import { assign } from 'lodash';
import denormalize from '../../utils/denormalize';

import { COLOSO_API_CALL, COLOSO_API_CALL_TYPES } from '../plugins/colosoApiPlugin';

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
    fetch(state) {
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
      return denormalize(id, 'games', rootState.entities);
    },
  },

  actions: {
    fetchById({ commit }, id) {
      commit('fetch', {
        [COLOSO_API_CALL]: {
          callType: COLOSO_API_CALL_TYPES.GAME,
          params: { id },
        },
      });
    },
  },
};
