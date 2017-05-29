import axios from 'axios';
import { omitBy, isNull, create } from 'lodash';
import Qs from 'qs';
import getLocale from './getLocale';

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
      'Accept-Language': getLocale(),
      Accept: 'application/vnd.coloso.net; version=2',
    },
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
});

axiosClient.interceptors.request.use(config => create(config, {
  params: omitBy(config.params, isNull),
}));

export default axiosClient;
