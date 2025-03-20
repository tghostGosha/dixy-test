import dropdown from '../modules/dropdown';
import dataOpen from '../modules/modal-page';
import dataUpdate from '../modules/updateRule';
import {modalOpen} from "../modules/modal";

import {validate} from "../modules/validate";
import {successModal} from "../modules/success-modal";
import {createRule, deleteRule, downloadRule, getRules, updateRule} from "../axios/rules";
import {RuleValidation} from "../utils/ruleValidation";


//======Валидация нового правила====///
const ruleForm = document.querySelector('#rule-form');
const ruleUpdateForm = document.querySelector('#ruleUpdateForm');
const success = document.querySelector('[data-modal="success"]');


if (window.location.pathname.includes('main')) {

  //===Список всех правил===////
  try {
    getRules()
  } catch (e){}

//======Скачать правила====///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        downloadRule(formatDoc)
      }
    })
  } catch(e){}
}

//======Валидация нового правила====///
if (ruleForm) {
  RuleValidation(ruleForm, createRule)
}
//======Редактирование правила====///
if (ruleUpdateForm) {
  RuleValidation(ruleUpdateForm, updateRule)
}

//======Закрытие модалки успешной отправки формы====///
try {
  const modalClose = document.querySelector('[data-modal="success-close"]');
  successModal(modalClose, success)
} catch (e) {}





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
      deleteRule(id)
      getRules()
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();
