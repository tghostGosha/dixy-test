import axios from "axios";
import {openSuccessModal} from "../helpers/success-modal";
import {API_BASE_URL, BASIC_AUTH} from "./auth";

const url = `${API_BASE_URL}/sectors`;
const successEdit = document.querySelector('[data-success="edit-sector"]')
const successAdd = document.querySelector('[data-success="add-sector"]');
const successDelete =document.querySelector('[data-success="delete-sector"]');

//===========Список всех секторов =================
export const getSectors = async () => {
  return await axios.get(`${url}/`, {
    // headers: {
    //   'Authorization': 'Basic Auth' + BASIC_AUTH
    // },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }

  }).then((response) => {
    return response.data
  }).catch(function (error) {
  })

}
//===========Список всех секторов =================
export const getSectorsByArea = async (areaId) => {
  return await axios.get(`${url}/?area=${areaId}`, {
    // headers: {
    //   'Authorization': 'Basic Auth' + BASIC_AUTH
    // },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }

  }).then((response) => {
    return response.data
  }).catch(function (error) {
  })

}
//===========Сектор по id =================
export const getSectorDetail = async (id) => {
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

//===========Создание сектора =================
export const createSector = (data) => {
  axios.post(`${url}/create/`, data,{
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successAdd)
  }).catch(function (error) {
    console.log(error);
  })

}

//===========Редактирование сектора =================
export const updateSector = ( data, id ) => {
  axios.post(`${url}/${id}/update/`, data,{
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successEdit)
  }).catch(function (error) {
    console.log(error);
  })

}

//===========Удаление сектора =================
export const deleteSector = (id) => {
  axios.post(`${url}/${id}/delete/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: 'bitrix',
      password: '2zwjc1h6yakt9wuo'
    }
  }).then((response) => {
    openSuccessModal(successDelete)
  }).catch(function (error) {
    console.log(error);
  })

}

//===========Скачать сектора =================
export const downloadSector = async (format) => {
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
