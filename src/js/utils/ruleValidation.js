import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";
import {onlyRusAndNumber} from "../helpers/onlyRusAndNumber";

const modal = document.querySelector('[data-modal="modal-page"]');
const titleInput = document.querySelectorAll('[data-id="title"]')

titleInput.forEach(item => {
  item.addEventListener("input", function () {
    onlyRusAndNumber(item)
  })
})
//======Валидация нового правила====///
export const RuleValidation = (form, request,modal) => {
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
    .addField('[data-id="areaSelect"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
    ])
    .addField('[data-id="sectorSelect"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
    ])
    .addField('[data-id="warehouseNumberArray"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
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
      // {
      //   validator: (value) => {
      //     return value >= 0 && value < 100000
      //   },
      //   errorMessage: '0-9, спецсимволы запрещены. Мин- 0, Макс -100 000'
      // },


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

    });
}