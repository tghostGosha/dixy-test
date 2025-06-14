import axios from "axios";
import {openSuccessModal} from "../helpers/success-modal";
import {API_BASE_URL, BASIC_AUTH, basicAuth} from "./auth";

const url = `${API_BASE_URL}/sectors`;
const successEdit = document.querySelector('[data-success="edit-sector"]')
const successAdd = document.querySelector('[data-success="add-sector"]');
const successDelete =document.querySelector('[data-success="delete-sector"]');

//===========Список всех секторов =================
export const getSectors = async (areaId) => {
  return await axios.get(`${url}/`, {
    // headers: {
    //   'Authorization': 'Basic Auth' + BASIC_AUTH
    // },
    auth: {
      username: basicAuth.name,
      password: basicAuth.password
    },
    params: {area: areaId}
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
      username: basicAuth.name,
      password: basicAuth.password
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
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successAdd)
    setTimeout(() => { window.location.reload()}, 2000)
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
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successEdit)
    setTimeout(() => { window.location.reload()}, 2000)
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
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    openSuccessModal(successDelete)
    setTimeout(() => { window.location.reload()}, 2000)
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
      username: basicAuth.name,
      password: basicAuth.password
    }
  }).then((response) => {
    return response.data
  }).catch(function (error) {
    // console.log(error);
  })
}
