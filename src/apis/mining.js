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

function loanMiningReview(loanMiningId,reason,token,password,states,address,key,pass) {
  return axios.post(`${Config.HOST}/mining/loanminingreview`, qs.stringify({
    loanMiningId,
    reason,
    token,
    password,
    states,
    address,
    key,
    pass,
  }))
}

function admingetloanmininglist(token, page=1, pageSize=10) {
  return axios.post(`${Config.HOST}/mining/admingetloanmininglist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}

function admingetextractloanmininglist(token, page, pageSize) {
  return axios.post(`${Config.HOST}/mining/admingetextractloanmininglist`, qs.stringify({
    token,
    page,
    pageSize
  }))
}


function extractLoanMiningReview(reviewId,reason,token,password,states) {
  return axios.post(`${Config.HOST}/mining/extractloanminingreview`, qs.stringify({
    reviewId,
    reason,
    token,
    password,
    states
  }))
}

function userLoanMiningBalance(token) {
  return axios.post(`${Config.HOST}/mining/user_loan_mining_balance`, qs.stringify({
    token
  }))
}

export  {
  loanMining,
  getLoanMiningList,
  extractloanmining,
  getextractloanmininglist,
  isBindingMiningAddress,
  loanMiningReview,
  admingetloanmininglist,
  admingetextractloanmininglist,
  extractLoanMiningReview,
  userLoanMiningBalance,
}