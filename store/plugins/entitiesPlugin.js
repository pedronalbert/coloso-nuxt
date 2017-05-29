import { has } from 'lodash';

export default function (store) {
  store.subscribe(({ payload }) => {
    if (has(payload, 'entities')) {
      store.commit('entities/merge', payload.entities);
    }
  });
}
