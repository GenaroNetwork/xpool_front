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

function extractloanmining(token, password, value) {
  return axios.post(`${Config.HOST}/mining/extractloanmining`, qs.stringify({
    token,
    password,
    value
  }))
}


function getextractloanmininglist(token, page, pageSize) {
  return axios.post(`${Config.HOST}/mining/getextractloanmininglist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}

function isBindingMiningAddress(loanMiningId,token) {
  return axios.post(`${Config.HOST}/mining/isbindingminingaddress`, qs.stringify({
    loanMiningId,
    token
  }))
}

function loanMiningReview(loanMiningId,reason,token,password,states,address) {
  return axios.post(`${Config.HOST}/mining/loanminingreview`, qs.stringify({
    loanMiningId,
    reason,
    token,
    password,
    states,
    address
  }))
}
export  {
  loanMining,
  getLoanMiningList,
  extractloanmining,
  getextractloanmininglist,
  isBindingMiningAddress,
  loanMiningReview,
}