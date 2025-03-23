import axios from "axios";
import {API_BASE_URL} from "../index";

const url = `${API_BASE_URL}/auth/`;
const authError = document.querySelector('[data-error="auth"]');


//===========Авторизация =================
export const sendLogin = (data) => {
  axios.post(`${url}login/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    window.location.href = '/main.html';
  }).catch(function (error) {
    authError.style.display = 'block'
    // console.log(error);
  })

}

//===========Сбросить Авторизацию =================
export const logOut = () => {
  axios.post(`${url}logout/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    window.location.href = '/';
  }).catch(function (error) {
    // console.log(error);
  })

}
