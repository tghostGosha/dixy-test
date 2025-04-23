import axios from "axios";
export const API_BASE_URL = '/api';
const url = `${API_BASE_URL}/auth/`;
const authError = document.querySelector('[data-error="auth"]');
export const basicAuth = {
  name: 'bitrix' ,
  password: '2zwjc1h6yakt9wuo'
}
//===========Авторизация =================
export const sendLogin = (data) => {
  axios.post(`${url}login/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    window.location.href = '/';
  }).catch(function (error) {
    authError.style.display = 'block'
  })

}

//===========Сбросить Авторизацию =================
export const logOut = () => {
  axios.post(`${url}logout/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    window.location.href = '/auth/';
  }).catch(function (error) {
    // console.log(error);
  })

}
