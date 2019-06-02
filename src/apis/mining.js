import axios from 'axios';
import Config from '../config';
import qs from 'qs';

function loanMinning(token, password, value) {
  return axios.post(`${Config.HOST}/mining/loanmining`, qs.stringify({
    token,
    password,
    value
  }))
}

export default {
  loanMinning
}