import axios from "axios";
import {API_BASE_URL} from "./auth";
import {openSuccessModal} from "../helpers/success-modal";

const url = `${API_BASE_URL}/rules/`;
const successEditRule = document.querySelector('[data-success="edit-rule"]')
const successAddRule = document.querySelector('[data-success="add-rule"]');
const successDeleteRule = document.querySelector('[data-success="delete-rule"]');
//===========Список всех правила =================
export const getRules = async () => {
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
//===========Список всех правила =================
export const getRuleDetail = async (id) => {
  return await axios.get(`${url}${id}/detail`, {
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

//===========Создание правила =================
export const createRule = (data) => {
  axios.post(`${url}create/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successAddRule)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Редактирование правила =================
export const updateRule = (data, id) => {
  axios.post(`${url}${id}/update/`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successEditRule)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Удаление правила =================
export const deleteRule = (id) => {
  axios.post(`${url}${id}/delete/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successDeleteRule)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Скачать правила =================
export const downloadRule = (format) => {
  axios.get(`${url}download/${format}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    const href = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }).catch(function (error) {

    console.log(error);
  })

}