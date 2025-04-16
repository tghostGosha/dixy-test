import {closeSuccessModal} from "../helpers/success-modal";
import {createRule, deleteRule, downloadRule, getRules, updateRule} from "../axios/rules";
import {RuleUpdateValidation, RuleValidation} from "../utils/ruleValidation";
import {searchInput, searchPage, sortType, resetSearch} from "../helpers/search";
import rule from "../modules/updateRule";
import {downloadFile} from "../axios/downloadFile";



//======Поиск====///
const search = document.querySelector('#search');
const searchButton = document.querySelector('#search-button');
const pageValue = document.querySelector('#pageNumber');


searchInput(search, searchButton)
searchPage(pageValue)
//======Cброс query параметров поиска====///
try {
  const resetButton = document.querySelector('[data-reset="search"]');
  resetSearch(resetButton)
} catch (e) {
}
//======Отправка запроса на изменение активности правила///
const switchData = document.querySelectorAll('[data-update="switch"]')

switchData.forEach((item) => {
  item.addEventListener('click', (e) => {
    let id = e.target.parentNode.parentNode.parentNode.getAttribute("id")
    updateRule({active: item.checked}, id.toString())
  })
})


//======Валидация нового правила====///
const ruleForm = document.querySelector('#rule-form');
const ruleUpdateForm = document.querySelector('#ruleUpdateForm');
const ruleCreate = document.querySelector('[data-create="rule"]');
const ruleUpdate = document.querySelector('[data-update="rule"]');
if (window.location.pathname === '/') {
  //======Сортировка======///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-sort="sort"]')) {
        const sortDate = e.target

        sortType(sortDate)
      }
    })
  } catch (e) {
  }
  //======Скачать правила====///
  try {
    document.addEventListener('click', async function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        const data = await downloadRule(formatDoc)
        downloadFile(data.data.path, data.data.name)
      }
    })
  } catch (e) {
  }

}


//======Валидация нового правила====///
if (ruleForm) {
  RuleValidation(ruleForm, createRule, ruleCreate)
}

//====== Валидация Редактирование правила====///
if (ruleUpdateForm) {
  RuleUpdateValidation(ruleUpdateForm, updateRule, ruleUpdate)
}

//======Закрытие модалки успешной отправки формы====///
const successEditRule = document.querySelector('[data-success="edit-rule"]')
const successAddRule = document.querySelector('[data-success="add-rule"]');
const successDeleteRule = document.querySelector('[data-success="delete-rule"]');
const successClose = document.querySelectorAll('[data-success="close"]')

try {
  closeSuccessModal(successClose, successEditRule)
  closeSuccessModal(successClose, successAddRule);
  closeSuccessModal(successClose, successDeleteRule);
} catch (e) {
}


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
    deleteRuleButton.addEventListener('click', async (event) => {
      event.preventDefault()
      deleteRule(id)
      await getRules()
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();
