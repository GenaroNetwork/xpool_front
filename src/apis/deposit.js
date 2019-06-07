import axios from 'axios';
import Config from '../config';
import qs from 'qs';

function getDepositList(token, page=1, pageSize=10) {
  return axios.post(`${Config.HOST}/deposit/getdepositlist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}

function addDesposit(token, hash, password) {
  return axios.post(`${Config.HOST}/deposit/adddeposit`, qs.stringify({
    token,
    hash,
    password
  }))
}

function extractDeposit(token, password, value) {
  return axios.post(`${Config.HOST}/deposit/extractdeposit`, qs.stringify({
    token,
    password,
    value
  }))
}

function getextractDepositlist(token, page, pageSize) {
  return axios.post(`${Config.HOST}/deposit/getextractdepositlist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}

function getDepositBalance(token) {
  return axios.post(`${Config.HOST}/deposit/deposit_balance`, qs.stringify({
    token
  }))
}

function adminGetDepositList(token, page=1, pageSize=10) {
  return axios.post(`${Config.HOST}/deposit/admingetdepositlist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}
function adminGetExtractDepositList(token, page, pageSize) {
  return axios.post(`${Config.HOST}/deposit/admingetextractdepositlist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}


export {
  getDepositList,
  addDesposit,
  extractDeposit,
  getextractDepositlist,
  getDepositBalance,
  adminGetDepositList,
  adminGetExtractDepositList,
}