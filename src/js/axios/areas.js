import axios from "axios";

export const API_BASE_URL = 'https://delivery-test.dixy.ru/api';

const url = `${API_BASE_URL}/areas/`;


export const getAreas = () => {
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    console.log(response)
  }).catch(function (error) {

    console.log(error);
  })

}