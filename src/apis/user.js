import axios from 'axios';
import Config from '../config';
import qs from 'qs';

function getCode(email) {
  return axios.post(`${Config.HOST}/user/getverificationcode`, qs.stringify({email}))
}

function register(email, password, code, address) {
  return axios.post(`${Config.HOST}/user/createuser`, qs.stringify({
    email,
    password,
    code,
    address
  }))
}

function login(email, password) {
  return axios.post(`${Config.HOST}/user/login`, qs.stringify({
    email,
    password
  }))
}

function getUserInfo(token) {
  return axios.post(`${Config.HOST}/user/getuserbytoken`, qs.stringify({
    token
  }))
}

function forgetPassword(email, password, code) {
  return axios.post(`${Config.HOST}/user/forgetpassword`, qs.stringify({
    email,
    password,
    code
  }))
}

function resetPassword(token, oldPassword, newPassword) {
  return axios.post(`${Config.HOST}/user/resetpassword`, qs.stringify({
    token,
    password: oldPassword,
    newPassword
  }))
}

function logout(token) {
  return axios.post(`${Config.HOST}/user/logout`, qs.stringify({
    token
  }))
}

export {
  getCode,
  register,
  login,
  getUserInfo,
  forgetPassword,
  resetPassword,
  logout
}