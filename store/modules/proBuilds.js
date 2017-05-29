import { assign, clone, defaults, get } from 'lodash';
import normalize from 'json-api-normalizer';
import { denormalize, ColosoApi } from '../../utils';

const INITIAL_STATE = {
  ids: [],
  fetching: false,
  fetched: false,
  fetchError: false,
  errorMessage: '',
  pagination: {
    currentPage: 0,
    totalPages: 1,
  },
  filters: {
    championId: null,
    proPlayerId: null,
  },
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

    fetchSuccess(state, { ids, meta }) {
      let newIds;

      if (meta.currentPage === 1) {
        newIds = ids;
      } else {
        newIds = state.ids.concat(ids);
      }

      assign(state, {
        ids: newIds,
        fetching: false,
        fetched: true,
        pagination: meta,
      });
    },

    fetchFailure(state, { message: errorMessage }) {
      assign(state, {
        fetching: false,
        fetchError: true,
        errorMessage,
      });
    },

    resetList(state) {
      assign(state, {
        ids: [],
        fetched: false,
        pagination: {
          currentPage: 0,
          totalPages: 1,
        },
      });
    },

    setFilters(state, filters) {
      assign(state, {
        filters: assign(state.filters, filters),
      });
    },
  },

  getters: {
    list(state, getters, rootState) {
      return state.ids.map(id => denormalize(id, 'proBuilds', rootState.entities));
    },

    lastBuildsList(state, getters) {
      return getters.list.slice(0, 6);
    },

    hasMorePages(state) {
      return state.pagination.currentPage < state.pagination.totalPages;
    },
  },

  actions: {
    fetchBuilds({ state, commit }, config) {
      commit('fetching');

      const pageNumber = get(config, 'pageNumber') || state.pagination.currentPage + 1;

      const params = defaults(config, {
        ...state.filters,
        page: {
          number: pageNumber,
        },
      });

      return new Promise((resolve) => {
        ColosoApi.proBuilds.get(params)
          .then((response) => {
            const entities = normalize(response);

            commit('fetchSuccess', { ids: response.data.map(proBuild => proBuild.id), meta: response.meta, entities });

            resolve();
          })
          .catch((error) => {
            commit('fetchFailure', { message: error.message });
            resolve();
          });
      });
    },

    setFilters({ commit, dispatch }, filters) {
      commit('setFilters', filters);
      dispatch('resetList');
    },

    resetList({ commit }) {
      commit('resetList');
    },
  },
};
