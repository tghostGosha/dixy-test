import {validate} from "../modules/validate";
import {serializeForm} from "./serializeForm";


const modal = document.querySelector('[data-modal="modal-page"]');


//======Валидация сектора====///
export const SectorValidation = (form, request) => {
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
    .onSuccess((ev) => {
      ev.preventDefault();
      serializeForm(form, request)
      form.reset()
      modal.classList.remove('active');

    })
    .onFail((fields) => {

    });
}