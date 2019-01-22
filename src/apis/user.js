import axios from 'axios';
import { HOST } from '../config';

function getCode(email) {
  return axios.post(`${HOST}/user/getverificationcode`, { email })
}

function register(email, password, code) {
  return axios.post(`${HOST}/user/createuser`, {
    email,
    password,
    code
  })
}

function login(email, password) {
  return axios.post(`${HOST}/user/login`, {
    email,
    password
  })
}

function getUserInfo(token) {
  return axios.post(`${HOST}/user/getuserbytoken`, {
    token
  })
}

function forgetPassword(email, password, code) {
  return axios.post(`${HOST}/user/forgetpassword`, {
    email,
    password,
    code
  })
}

function resetPassword(token, oldPassword, newPassword) {
  return axios.post(`${HOST}/user/resetpassword`, {
    token,
    password: oldPassword,
    newPassword
  })
}

export default {
  getCode,
  register,
  login,
  getUserInfo,
  forgetPassword,
  resetPassword
}