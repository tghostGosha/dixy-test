import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";

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

  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  cancelBtn.addEventListener('click', ()=> {
    validate(form).refresh()
    validate(form).destroy()
  })
}