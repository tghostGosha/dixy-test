import axios from "axios";
import {API_BASE_URL, basicAuth} from "./auth";
import {openSuccessModal} from "../helpers/success-modal";
import {errorModal} from "../modules/errorModal";

const url = `${API_BASE_URL}/rules`;
const successEditRule = document.querySelector('[data-success="edit-rule"]')
const successAddRule = document.querySelector('[data-success="add-rule"]');
const successDeleteRule = document.querySelector('[data-success="delete-rule"]');

//===========Список всех правила =================
export const getRules = async () => {
  return await axios.get(`${url}/`, {
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
//===========Список всех правила =================
export const getRuleDetail = async (id) => {
  return await axios.get(`${url}/${id}/detail/`, {
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

//===========Создание правила =================
export const createRule = (data) => {
  axios.post(`${url}/create/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successAddRule)
  }).catch(function (error) {
    errorModal(error.response.data.errors[0].message)

  })

}

//===========Редактирование правила =================
export const updateRule = (data, id) => {
  axios.post(`${url}/${id}/update/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successEditRule)
  }).catch(function (error) {

    errorModal(error.response.data.errors[0].message)
  })

}

//===========Удаление правила =================
export const deleteRule = (id) => {
  axios.post(`${url}/${id}/delete/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successDeleteRule)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Скачать правила =================
export const downloadRule = async (format) => {
  return await axios.get(`${url}/download/${format}/`,{
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
    // console.log(error);
  })

}