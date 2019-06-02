import axios from 'axios';
import Config from '../config';
import qs from 'qs';

function loanMining(token, value, password) {
  return axios.post(`${Config.HOST}/mining/loanmining`, qs.stringify({
    token,
    value,
    password
  }))
}

function getLoanMiningList(token, page=1, pageSize=10) {
  return axios.post(`${Config.HOST}/mining/getloanmininglist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}

export  {
  loanMining,
  getLoanMiningList
}