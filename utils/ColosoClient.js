import axios from 'axios';
import { omitBy, isNull, create } from 'lodash';
import Qs from 'qs';

let ENDPOINT = 'http://api.coloso.net';

if (process.env.NODE_ENV === 'development') {
  ENDPOINT = 'http://localhost:3000';
}

const TIMEOUT = 25000;

const axiosClient = axios.create({
  baseURL: ENDPOINT,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    common: {
      'Accept-Language': 'en',
      Accept: 'application/vnd.coloso.net; version=2',
    },
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
});

axiosClient.interceptors.request.use((config) => {
  const parsedConfig = create(config, {
    params: omitBy(config.params, isNull),
  });

  return parsedConfig;
});

export default axiosClient;
