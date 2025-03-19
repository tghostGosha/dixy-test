import dropdown from '../modules/dropdown';
import dataOpen from '../modules/modal-page';
import dataUpdate from '../modules/updateRule';
import {modalOpen} from "../modules/modal";

import {validate} from "../modules/validate";
import {successModal} from "../modules/success-modal";
import {createRule, deleteRule, downloadRule, getRules} from "../axios/rules";


//======Валидация нового правила====///
const ruleForm = document.querySelector('#rule-form');
const modal = document.querySelector('[data-modal="modal-page"]');
const success = document.querySelector('[data-modal="success"]');

function serializeForm(formNode, request) {
  let data = new FormData(formNode)
  request(data)
  return data
}

if (window.location.pathname.includes('main')) {

  //===Список всех правил===////
  try {
    getRules()
  } catch (e){}


}

//======Валидация нового правила====///
try {
  validate(ruleForm)
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'А-я, 0-9. Мин - 2 символа'
      },
      {
        rule: 'maxLength',
        value: 100,
        errorMessage: 'А-я, 0-9. Макс - 100 символов'
      },
    ])
    .addField('#areaSelect', [
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
    .addField('#warehouseNumber', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        rule: 'number',
        errorMessage: '0-9, спецсимволы запрещены'
      },
      {
        validator: (value) => {
          return value >= 0 && value < 100000
        },
        errorMessage: '0-9, спецсимволы запрещены. Мин- 0, Макс -100 000'
      },


    ])
    .addField('#costDelivery', [
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
    .addField('#freeDelivery', [
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
    .addField('#minCost', [
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

    .onSuccess((ev) => {
      ev.preventDefault();
      //===Создание нового правила===////
      serializeForm(ruleForm, createRule)

      ruleForm.reset()
      modal.classList.remove('active');
      success.classList.add('active');
      setTimeout(() => {
        success.classList.remove('active');
      }, 3000)
    })
    .onFail((fields) => {

    });
} catch (e) {
}

//======Закрытие модалки успешной отправки формы====///
try {
  const modalClose = document.querySelector('[data-modal="success-close"]');
  successModal(modalClose, success)
} catch (e) {}


//======Скачать правила====///
try {
  document.addEventListener('click', function (e) {
    if (e.target.matches('[data-download="format"]')) {
      const formatDoc = e.target.textContent
      downloadRule(formatDoc)
    }
  })
} catch(e){}


//======модалка удаления правила====///
(function () {
  const deleteRuleButton = document.querySelector('[data-delete-rule="delete"]')
  const modalBackgroundDelete = document.querySelector('[data-modal-rule="delete"]');
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const closeButton = document.querySelector('[ data-delete-rule="cancel"]');
  let id
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-delete="delete"]')) {
        modalBackgroundDelete.style.display = "block";
        bodyElementHTML.classList.add('active-modal');
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        id = parent.getAttribute("id");
      }
    })

    closeButton.addEventListener('click', (event) => {
      event.preventDefault()
      modalBackgroundDelete.style.display = "none";

    });
    deleteRuleButton.addEventListener('click', (event) => {
      event.preventDefault()
      console.log(id)
      deleteRule(id)
      getRules()
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();
