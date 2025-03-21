import resize from '../modules/rezizeRow';
import {modalOpenMap} from "../modules/modal";
// import {tippyOpen} from "../modules/dropdown";
import dataOpen from '../modules/modal-page';
import {downloadStore, getStores, updateStore} from "../axios/warehouse";
import {warehouseValidation} from "../utils/warehouseValidation";
import {updateWarehouse} from '../modules/updateWarehouse';
import {modalWarehouseRule} from "../modules/modalWarehouseRule";

if (window.location.pathname.includes('warehouse')) {
  updateWarehouse()
  //===Список всех правил===////
  try {
    getStores()
  } catch (e){}

//======Скачать правила====///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        downloadStore(formatDoc)
      }
    })
  } catch(e){}
}

//======Вызов модальных окон====///
const modalMap = document.querySelectorAll('[data-modal="map-modal"]');
const modalRule = document.querySelectorAll('[data-modal="rule-modal"]');
const modalBackgroundMap = document.querySelector('[data-modal="map"]');
const modalBackgroundRule = document.querySelector('[data-modal="rule"]');
try {

  modalOpenMap(modalMap, modalBackgroundMap)
  modalWarehouseRule(modalRule, modalBackgroundRule)
} catch (e) {

}

const warehouseForm = document.querySelector('#warehouseUpdateForm');

//====== Валидация Редактирование склада====///
if (warehouseForm) {
  warehouseValidation(warehouseForm, updateStore)
}
