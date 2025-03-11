import axios from "axios";

export const API_BASE_URL = 'http://delivery.dixy.local/api';

const url = `${API_BASE_URL}/auth/login/`;
const authError = document.querySelector('[data-error="auth"]')
export const sendLogin = (data) => {
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response)
  }).catch(function (error) {
    authError.style.display = 'block'
    console.log(error);
  })

}
