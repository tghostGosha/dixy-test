import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";
import {onlyRusAndNumber} from "../helpers/onlyRusAndNumber";
import {getSectorsByArea} from "../axios/sectors";

const modal = document.querySelector('[data-modal="modal-page"]');
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
const areaSelectUpdate = document.getElementById('updateAreaSelect');
const sectorSelectUpdate = document.getElementById('updateSectorSelect');
const storeUpdate = document.getElementById('updateWarehouseNumber');

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
    .addField('[data-id="freeDelivery"]', [
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
  selectChanges(areaSelect, sectorSelect, store)
  // selectChanges(areaSelectUpdate, sectorSelectUpdate,storeUpdate)
  // const closeButton = document.querySelector('[data-close="close"]')
  //
  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  cancelBtn.addEventListener('click', ()=> {
    console.log('click')
    validate(form).refresh()
    validate(form).destroy()
  })
}
export const RuleUpdateValidation = (form, request, modal) => {

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
    // .addField('#areaSelect', [
    //   {
    //     validator: () => {
    //       return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
    //     },
    //     errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
    //   }
    // ])
    // .addField('#sectorSelect', [
    //   {
    //     validator: (value) => {
    //       return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
    //     },
    //     errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
    //   }
    // ])
    // .addField('#warehouseNumberArray', [
    //   {
    //     validator: () => {
    //       return areaSelect.value !== '' || sectorSelect.value !== '' || store.value !== '';
    //     },
    //     errorMessage: 'Необходимо заполнить Область, либо Сектор, либо Склад'
    //   },
    //   {
    //     rule: 'minLength',
    //     value: 0,
    //     errorMessage: '0-9, разрешены запятая и пробел, Мин- 0'
    //   },
    //   {
    //     rule: 'maxLength',
    //     value: 100000,
    //     errorMessage: '0-9, разрешены запятая и пробел, Макс -100 000'
    //   },
    //
    // ])
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
    .addField('[data-id="freeDelivery"]', [
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
  selectChanges(areaSelect, sectorSelect, store)

  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  cancelBtn.addEventListener('click', ()=> {
    validate(form).refresh()
    validate(form).destroy()
  })
}
const selectChanges = (selector1, selector2, input ) => {
  // Add event listener to the first selector
  selector1.addEventListener('change', () => {
    // If a value is selected in the first selector
    if (selector1.value !== '') {
      // Disable the second selector and input
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
      // Enable the second selector and input
      selector2.disabled = false;
      input.disabled = false;
    }
  });
// Add event listener to the first selector
  selector2.addEventListener('change', () => {
    // If a value is selected in the first selector
    if (selector2.value !== '') {
      // Disable the second selector and input
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
      // Enable the second selector and input
      selector1.disabled = false;
      input.disabled = false;
    }
  });

// Add event listener to the input
  input.addEventListener('input', () => {
    // If there is a value in the input and the second selector is disabled
    if (input.value !== '') {
      // Enable the second selector
      selector2.disabled = true;
      selector2.classList.remove('is-invalid');
      if (selector2.nextElementSibling) {
        selector2.nextElementSibling.style.display='none'
      }
      selector1.disabled = true;
      selector1.classList.remove('is-invalid');
      if (selector1.nextElementSibling) {
        selector1.nextElementSibling.style.display='none'
      }
    }
  });
}

