import { has, isArray, map } from 'lodash';
import normalize from 'json-api-normalizer';

import ColosoApi from '../../utils/ColosoApi';

export const COLOSO_API_CALL = 'COLOSO_API_CALL';
export const COLOSO_API_CALL_TYPES = {
  PRO_BUILDS: 'COLOSO_API_CALL/PRO_BUILDS',
  PRO_PLAYERS: 'COLOSO_API_CALL/PRO_PLAYERS',
  GAME: 'COLOSO_API_CALL/GAME',
  SUMMONER: 'COLOSO_API_CALL/SUMMONER',
  SUMMONER_LEAGUE_ENTRIES: 'COLOSO_API_CALL/LEAGUE_ENTRIES',
  SUMMONER_CHAMPIONS_MASTERIES: 'COLOSO_API_CALL/CHAMPIONS_MASTERIES',
  SUMMONER_RUNES: 'COLOSO_API_CALL/SUMMONER_RUNES',
  SUMMONER_MASTERIES: 'COLOSO_API_CALL/SUMMONER_MASTERIES',
  SUMMONER_GAMES_RECENT: 'COLOSO_API_CALL/SUMMONER_GAMES_RECENT',
  SUMMONER_GAME_CURRENT: 'COLOSO_API_CALL/SUMMONER_GAME_CURRENT',
};

const API_FUNCS = {
  [COLOSO_API_CALL_TYPES.PRO_BUILD]: ColosoApi.proBuilds.byId,
  [COLOSO_API_CALL_TYPES.PRO_BUILDS]: ColosoApi.proBuilds.get,
  [COLOSO_API_CALL_TYPES.PRO_PLAYERS]: ColosoApi.proPlayers.get,
  [COLOSO_API_CALL_TYPES.GAME]: ColosoApi.games.byId,
  [COLOSO_API_CALL_TYPES.SUMMONER]: ColosoApi.summoners.byId,
  [COLOSO_API_CALL_TYPES.SUMMONER_LEAGUE_ENTRIES]: ColosoApi.summoners.leagueEntries,
  [COLOSO_API_CALL_TYPES.SUMMONER_CHAMPIONS_MASTERIES]: ColosoApi.summoners.championsMasteries,
  [COLOSO_API_CALL_TYPES.SUMMONER_RUNES]: ColosoApi.summoners.runes,
  [COLOSO_API_CALL_TYPES.SUMMONER_MASTERIES]: ColosoApi.summoners.masteries,
  [COLOSO_API_CALL_TYPES.SUMMONER_GAMES_RECENT]: ColosoApi.summoners.gamesRecent,
  [COLOSO_API_CALL_TYPES.SUMMONER_GAME_CURRENT]: ColosoApi.summoners.gameCurrent,
};

function isValidMutation(payload) {
  return has(payload, COLOSO_API_CALL);
}

function handleMutation(store, { type, payload }) {
  if (isValidMutation(payload)) {
    const { callType, params } = payload[COLOSO_API_CALL];

    API_FUNCS[callType](params)
      .then((response) => {
        const entities = normalize(response);
        const commitPayload = {
          entities,
        };

        if (isArray(response.data)) {
          commitPayload.ids = map(response.data, data => data.id);
        } else {
          commitPayload.id = response.data.id;
        }

        if (has(response, 'meta')) {
          commitPayload.meta = response.meta;
        }

        store.commit(`${type}Success`, commitPayload);
      })
      .catch(({ message }) => {
        store.commit(`${type}Failure`, { message });
      });
  }
}

const colosoApiPlugin = (store) => {
  store.subscribe(handleMutation.bind(null, store));
};

export default colosoApiPlugin;
