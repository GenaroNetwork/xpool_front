import axios from 'axios';
import Config from '../config';

function getCode(email) {
  return axios.post(`${Config.HOST}/user/getverificationcode`, { email })
}

function register(email, password, code) {
  return axios.post(`${Config.HOST}/user/createuser`, {
    email,
    password,
    code
  })
}

function login(email, password) {
  return axios.post(`${Config.HOST}/user/login`, {
    email,
    password
  })
}

function getUserInfo(token) {
  return axios.post(`${Config.HOST}/user/getuserbytoken`, {
    token
  })
}

function forgetPassword(email, password, code) {
  return axios.post(`${Config.HOST}/user/forgetpassword`, {
    email,
    password,
    code
  })
}

function resetPassword(token, oldPassword, newPassword) {
  return axios.post(`${Config.HOST}/user/resetpassword`, {
    token,
    password: oldPassword,
    newPassword
  })
}

export {
  getCode,
  register,
  login,
  getUserInfo,
  forgetPassword,
  resetPassword
}