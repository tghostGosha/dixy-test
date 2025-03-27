import resize from '../modules/rezizeRow';
import {modalOpenMap} from "../modules/modal";
// import {tippyOpen} from "../modules/dropdown";
import dataOpen from '../modules/modal-page';
import {downloadStore, getPeople, getStores, updateStore} from "../axios/warehouse";
import {warehouseValidation} from "../utils/warehouseValidation";
import {updateWarehouse} from '../modules/updateWarehouse';
import {modalWarehouseRule} from "../modules/modalWarehouseRule";
import {closeSuccessModal} from "../helpers/success-modal";
import {searchInput} from "../helpers/search";

if (window.location.pathname.includes('warehouse')) {
  updateWarehouse()
  //===Список всех правил===////
  try {
    const storesData = await getStores()
  } catch (e) {
  }

//======Скачать правила====///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        downloadStore(formatDoc)
      }
    })
  } catch (e) {
  }

  //======Поиск====///
  const search = document.querySelector('#search')
  const searchButton = document.querySelector('#search-button');
  searchInput(search, searchButton,  )
}


//======Вызов модальных окон====///
const modalMap = document.querySelectorAll('[data-modal="map-modal"]');
const modalRule = document.querySelectorAll('[data-modal="rule-modal"]');
const modalBackgroundMap = document.querySelector('[data-modal="map"]');
const modalBackgroundRule = document.querySelector('[data-modal="rule"]');
const successAdd = document.querySelector('[data-success="add-polygon"]');
const successClose =document.querySelector('[data-success="close"]')


try {
  modalOpenMap(modalMap, modalBackgroundMap)
  modalWarehouseRule(modalRule, modalBackgroundRule)
} catch (e) {}

//======Закрытие "успешных" модальных окон====///
try {
  closeSuccessModal(successClose,successAdd);
} catch (e) {}

const warehouseForm = document.querySelector('#warehouseUpdateForm');

//====== Валидация Редактирование склада====///
if (warehouseForm) {
  warehouseValidation(warehouseForm, updateStore)
}
