import axios from "axios";
import {API_BASE_URL, basicAuth} from "./auth";


const url = `${API_BASE_URL}/areas/`;


export const getAreas = async () => {
  return await axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    return response.data
  }).catch(function (error) {
    console.log(error);
  })

}