import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";

const modal = document.querySelector('[data-modal="update-warehouse"]');

//======Валидация склада====///
export const warehouseValidation = (form, request) => {
  validate(form)
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

    .onSuccess((ev) => {
      ev.preventDefault();
      serializeForm(form, request)
      form.reset()
      modal.classList.remove('active');
      location.reload()

    })
    .onFail((fields) => {

    });
}
