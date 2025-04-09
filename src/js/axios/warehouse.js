import axios from "axios";
import {API_BASE_URL} from "./auth";
import {openSuccessModal} from "../helpers/success-modal";

const url = `${API_BASE_URL}/stores`;

const successAddSector = document.querySelector('[data-success="add-polygon"]');

//===========Список всех складов =================
export const getStores = async () => {
  return await axios.get(`${url}/`, {
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
//===========Список всех складов =================
export const getStoreDetail = async (id) => {
  return await axios.get(`${url}/${id}/detail/`, {
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


//===========Редактирование склада =================
export const updateStore = (data, id ) => {
  axios.post(`${url}/${id}/update/`, data,{
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successAddSector)
  }).catch(function (error) {

    console.log(error);
  })

}

//===========Список всех складов =================
export const getStoresMap = async () => {
  return await axios.get(`${url}/map/`, {
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
//===========Скачать склады =================
export const downloadStore = async (format) => {
  return await axios.get(`${url}/download/${format}/`,{
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
    // console.log(error);
  })

}