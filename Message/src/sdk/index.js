import Fetch from '../service/fetch';
import API from '../service/api';
import * as Formatter from '../service/formatter';

export function getApiA(param) {
  return Fetch(API.testApiA, param, Formatter.getApiAFormatter);
}
