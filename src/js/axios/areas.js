import axios from "axios";
import {API_BASE_URL} from "./auth";


const url = `${API_BASE_URL}/areas/`;


export const getAreas = async () => {
  return await axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    return response.data
  }).catch(function (error) {
    console.log(error);
  })

}