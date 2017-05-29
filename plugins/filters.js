import Vue from 'vue';

import { sentenceCase, numeral } from '../filters';

Vue.filter('sentenceCase', sentenceCase);
Vue.filter('numeral', numeral);
