import axios from "axios";

export const API_BASE_URL = 'https://delivery-test.dixy.ru/api';
const success = document.querySelector('[data-modal="success"]');
const url = `${API_BASE_URL}/rules/`;

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
  axios.post(`${url}create/`, data,{
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    success.classList.add('active');
    setTimeout(() => {
      success.classList.remove('active');
    }, 3000)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Редактирование правила =================
export const updateRule = (data, id ) => {
  axios.post(`${url}${id}/update/`, data,{
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

//===========Удаление правила =================
export const deleteRule = (id) => {
  axios.post(`${url}${id}delete/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {

  }).catch(function (error) {

    console.log(error);
  })

}

//===========Скачать правила =================
export const downloadRule = (format) => {
  axios.get(`${url}download/${format}`,{
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