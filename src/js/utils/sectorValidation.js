import {validate} from "../modules/validate";
import {serializeForm} from "../helpers/serializeForm";
import {openSuccessModal} from "../helpers/success-modal";
import {onlyRusAndNumber} from "../helpers/onlyRusAndNumber";

//======Валидация сектора====///
const titleInput = document.querySelectorAll('[data-id="title"]')

titleInput.forEach(item => {
  item.addEventListener("input", function () {
    onlyRusAndNumber(item)
  })
})
export const SectorValidation = (form, request, modal) => {
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
      location.reload()

    })
    .onFail((fields) => {

    });
}