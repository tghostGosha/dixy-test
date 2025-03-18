import {API_BASE_URL} from "./login";
import axios from "axios";

const url = `${API_BASE_URL}/api/rules/`;

export const getRules = () => {
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // console.log(response)
  }).catch(function (error) {
    // console.log(error);
  })

}

export const getRule = (id) => {
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {

  }).catch(function (error) {

  })

}
export const deleteRule = (id) => {
  axios.post(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {

  }).catch(function (error) {

  })

}
document.addEventListener("DOMContentLoaded", () => {


});