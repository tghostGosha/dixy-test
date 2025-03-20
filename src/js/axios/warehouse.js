import axios from "axios";

export const API_BASE_URL = 'https://delivery-test.dixy.ru/api';

const url = `${API_BASE_URL}/stores/`;

//===========Список всех правила =================
export const getStores = async () => {
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
  return await axios.get(`${url}${id}detail`, {
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

//===========Скачать склады =================
export const downloadStore = (format) => {
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