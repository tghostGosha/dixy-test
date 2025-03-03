import resize from '../modules/rezizeRow';
import {modalOpen} from "../modules/modal";
import {tippyOpen} from "../modules/dropdown";
import {validate} from "../modules/validate";
import dataOpen from '../modules/modal-page';


//======Вызов модальных окон====///
try {
  const modalMap = document.querySelectorAll('[data-modal="map-modal"]');
  const modalRule = document.querySelectorAll('[data-modal="rule-modal"]');
  const modalBackgroundMap = document.querySelector('[data-modal="map"]');
  const modalBackgroundRule = document.querySelector('[data-modal="rule"]');
  modalOpen(modalMap, modalBackgroundMap)
  modalOpen(modalRule, modalBackgroundRule)
} catch (e) {

}

//======Валидация нового правила====///
const warehouseForm = document.querySelector('#warehouse-form');
const modal = document.querySelector('[data-modal="modal-page"]')
try {
  validate(warehouseForm)

    .addField('#poligon', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },

      {
        validator: (value) => {
          return value >= 0 && value < 100000
        },
        errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
      },

    ])
    .addField('#radius', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        validator: (value) => {
          return value >= 0 && value < 100000
        },
        errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
      },

    ])
    .addField('#ruleSelect', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
    ])
    .addField('#sectorSelect', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
    ])
    .onSuccess((ev) => {
      ev.preventDefault();
      warehouseForm.reset()
      modal.classList.remove('active');
    })
    .onFail((fields) => {

    });
} catch (e) {
}