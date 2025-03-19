import axios from "axios";

export const API_BASE_URL = 'https://delivery-test.dixy.ru/api';

const url = `${API_BASE_URL}/sectors/`;


//===========Список всех секторов =================
export const getSectors = () => {
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
//===========Сектор по id =================
export const getSectorDetail = (id) => {
  axios.get(`${url}${id}detail`, {
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

//===========Создание сектора =================
export const createSector = (data) => {
  axios.post(`${url}create/`, data,{
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

//===========Редактирование сектора =================
export const updateSector = (id, data ) => {
  axios.post(`${url} ${id}update/`, data,{
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

//===========Удаление сектора =================
export const deleteSector = (id) => {
  axios.post(`${url}${id}delete/`, {
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

//===========Скачать сектора =================
export const downloadSector = (format) => {
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