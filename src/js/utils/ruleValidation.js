import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";
import {onlyRusAndNumber} from "../helpers/onlyRusAndNumber";
import {selectChoice} from "../modules/choiceSector";
import {onlyRusLetter} from "../helpers/onlyRusLetter";
import {getSectors} from "../axios/sectors";
import {closeModal} from "../helpers/closeModal";

const ruleCreate = document.querySelector('[data-create="rule"]');
const titleInput = document.querySelectorAll('[data-id="title"]')

titleInput.forEach(item => {
  item.addEventListener("input", function () {
    onlyRusAndNumber(item)
  })
})
// Get the selectors and input elements
const areaSelect = document.querySelector('#areaSelect');
const sectorSelect = document.querySelector('#sectorSelect');
const store = document.querySelector('#warehouseNumberArray');
let choicesSector

// //========заполняем Select Секторов===========
const dataSectors = await getSectors()
const sectorsSelect = document.querySelector('#sectorSelect');
if (dataSectors) {
  let result = dataSectors.data.map(({id, name}) =>
    ({value: id, label: name}));
  choicesSector = selectChoice(sectorsSelect, result )
  const input =document.querySelectorAll(".choices__input")
  input.forEach( e =>{
    onlyRusLetter(e)
  })
}
//======Валидация нового правила====///
export const RuleValidation = (form, request, modal) => {


  validate(form)
    .addField('[data-id="title"]', [
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
      // {
      //   rule: 'customRegexp',
      //   // value: /[^аА-яЯёЁ0-9 .-]/g,
      //   value: /[аА-яЯёЁ]/gi,
      //   errorMessage: 'Только русские буквы'
      // },
    ])
    .addField('#areaSelect', [
      {
        validator: () => {
          return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
        },
        errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
      }
    ])
    .addField('#sectorSelect', [
      {
        validator: (value) => {
          return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
        },
        errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
      }
    ])
    .addField('#warehouseNumberArray', [
      {
        validator: () => {
          return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
        },
        errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: '0-9, разрешены запятая и пробел, Мин- 0'
      },
      {
        rule: 'maxLength',
        value: 100000,
        errorMessage: '0-9, разрешены запятая и пробел, Макс -100 000'
      },

    ])
    .addField('[data-id="costDelivery"]', [
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
    // .addField('[data-id="freeDelivery"]', [
    //   {
    //     rule: 'required',
    //     errorMessage: 'Обязательное поле'
    //   },
    //   {
    //     validator: (value) => {
    //       return value >= 0 && value < 100000
    //     },
    //     errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
    //   },
    //
    // ])
    .addField('[data-id="minCost"]', [
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
    // .addField('[data-id="minCostSelf"]', [
    //   {
    //     rule: 'required',
    //     errorMessage: 'Обязательное поле'
    //   },
    //   {
    //     validator: (value) => {
    //       return value >= 0 && value < 100000
    //     },
    //     errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
    //   },
    //
    // ])

    .onSuccess((ev) => {
      ev.preventDefault();
      //===Создание нового правила===////
      serializeForm(form, request)
      form.reset()
      modal.classList.remove('active');

    })
    .onFail((fields) => {
      validate(form).refresh()
    });
  selectChanges(areaSelect, sectorSelect, store, choicesSector)
  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  const closeButton = document.querySelector('[data-close="close"]')
  cancelBtn.addEventListener('click', ()=> {
    validate(form).refresh()
    validate(form).destroy()
    areaSelect.disabled=false
    sectorSelect.disabled= false
    store.disabled=false
  })
  closeButton.addEventListener('click', ()=> {
    areaSelect.disabled=false
    sectorSelect.disabled= false
    store.disabled=false
  })
  closeModal(cancelBtn, ruleCreate, form, choicesSector)
  closeModal(closeButton, ruleCreate, form, choicesSector)
}


const selectChanges = (selector1, selector2, input, choicesSector ) => {
  selector1.addEventListener('change', async () => {
    if (selector1.value !== '') {
      choicesSector.destroy()
      selector2.value = ''
      selector2.disabled = true;
      selector2.classList.remove('is-invalid');
      if (selector2.nextElementSibling) {
        selector2.nextElementSibling.style.display='none'
      }

      input.disabled = true;
      input.classList.remove('is-invalid');
      if (input.nextElementSibling) {
        input.nextElementSibling.style.display='none'
      }

    } else {
      selector2.disabled = false;
      input.disabled = false;
    }
  });
  selector2.addEventListener('change', () => {
    if (selector2.value !== '') {
      selector1.disabled = true;
      selector1.classList.remove('is-invalid');
      if (selector1.nextElementSibling) {
        selector1.nextElementSibling.style.display='none'
      }
      input.disabled = true;
      input.classList.remove('is-invalid');
      if (input.nextElementSibling) {
        input.nextElementSibling.style.display='none'
      }
    } else {
      selector1.disabled = false;
      input.disabled = false;
    }
  });
  input.addEventListener('input', () => {
    if (input.value !== '') {
      selector2.disabled = true;
      selector2.classList.remove('is-invalid');
      if (selector2.nextElementSibling) {
        selector2.nextElementSibling.style.display='none'
      }
      choicesSector.destroy()
      selector1.disabled = true;
      selector1.classList.remove('is-invalid');
      if (selector1.nextElementSibling) {
        selector1.nextElementSibling.style.display='none'
      }
    } else {
      choicesSector.init()
      choicesSector.enable()
      sectorSelect.disabled = false;
      areaSelect.disabled = false;
    }
  });
}

