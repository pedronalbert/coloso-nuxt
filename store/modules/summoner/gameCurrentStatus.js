import { assign } from 'lodash';

import { ColosoApi } from '../../../utils';

export default {
  namespaced: true,

  state: {
    playing: false,
    checking: false,
    checked: false,
  },

  mutations: {
    checking(state) {
      assign(state, {
        playing: false,
        checking: true,
        checked: false,
      });
    },

    checkSuccess(state) {
      assign(state, {
        playing: true,
        cheking: false,
        checked: true,
      });
    },

    checkFailure(state) {
      assign(state, {
        playing: false,
        checking: false,
        checked: true,
      });
    },
  },

  actions: {
    check({ commit }, summonerId) {
      return new Promise((resolve, reject) => {
        commit('checking');

        ColosoApi.summoners.gameCurrent({ summonerId }, {
          participants: false,
        })
          .then(() => {
            commit('checkSuccess');
            resolve();
          })
          .catch(() => {
            commit('checkFailure');
            reject();
          });
      });
    },
  },
};
