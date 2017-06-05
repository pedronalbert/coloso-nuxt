import { has } from 'lodash';

import ColosoClient from './ColosoClient';

function handleErrors(reject, error) {
  if (has(error, ['response', 'data', 'message'])) {
    reject({
      code: error.response.status,
      message: error.response.data.message,
    });
  } else {
    reject({
      code: null,
      message: i18n.t('errors.noConnectServer'),
    });
  }
}

function getProBuilds(params = {}) {
  return new Promise((resolve, reject) => {
    const url = 'pro-builds';

    return ColosoClient.get(url, {
      params,
    })
      .then((presponse) => {
        resolve(presponse.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getProPlayers() {
  return new Promise((resolve, reject) => {
    const url = 'pro-players';

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getProBuild({ id }) {
  return new Promise((resolve, reject) => {
    const url = `pro-builds/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getSummonerByName({ summonerName, region }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/by-name/${summonerName}`;

    return ColosoClient.get(url, { params: { region } })
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getSummonerById({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getLeagueEntries({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}/league/entry`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getChampionsMasteries({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}/champions-mastery`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getGamesRecent({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}/games/recent`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getMasteries({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}/masteries`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getRunes({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}/runes`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getGameCurrent({ summonerId }, params = {}) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/games/current`;

    return ColosoClient.get(url, {
      params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getStatsSummary(sumUrid, season) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/stats/summary`;

    return ColosoClient.get(url, {
      params: {
        season,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getAndroidStatus() {
  return new Promise((resolve, reject) => {
    const url = 'status/android-app';

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

function getGameById(id) {
  return new Promise((resolve, reject) => {
    const url = `games/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(e => handleErrors(reject, e));
  });
}

export default {
  proBuilds: {
    get: getProBuilds,
    byId: getProBuild,
  },
  proPlayers: {
    get: getProPlayers,
  },
  games: {
    byId: getGameById,
  },
  summoners: {
    byId: getSummonerById,
    byName: getSummonerByName,
    leagueEntries: getLeagueEntries,
    championsMasteries: getChampionsMasteries,
    runes: getRunes,
    masteries: getMasteries,
    gamesRecent: getGamesRecent,
    gameCurrent: getGameCurrent,
  },
  getStatsSummary,
  getAndroidStatus,
};
