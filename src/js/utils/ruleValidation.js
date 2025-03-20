import {validate} from "../modules/validate";
import {serializeForm} from "./serializeForm";



const modal = document.querySelector('[data-modal="modal-page"]');

//======Валидация нового правила====///
export const RuleValidation = (form, request) => {
  validate(form)
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
      serializeForm(form, request)
      form.reset()
      modal.classList.remove('active');

    })
    .onFail((fields) => {

    });
}