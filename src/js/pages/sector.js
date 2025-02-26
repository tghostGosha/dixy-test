import {selectChoice} from '../modules/select';
import {validate} from "../modules/validate";
import {successModal} from "../modules/success-modal";

//======Вызов Select окон====///
//=============//======Тестовые массивы- нужно передавать с бэка ====///
const testArrayAreaSelect = [
  {
    value: 'moscow', label: 'Московская область', selected: true
  },
  {
    value: 'tverskaya', label: 'Тверская область', selected: false
  },
  {
    value: 'vladimir', label: 'Владимирская область', selected: false
  },
  {
    value: 'ivanovo', label: 'Ивановская область', selected: false
  }
]

const areaSelect = document.querySelector('#areaSelect');
selectChoice(areaSelect, testArrayAreaSelect, 'Выберите область')


//======Валидация нового правила====///
const sectorForm = document.querySelector('#sector-form');
const modal = document.querySelector('[data-modal="modal-page"]');
const success = document.querySelector('[data-modal="success"]')
try {
  validate(sectorForm)
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'А-я, 0-9. Мин - 2 символа, Макс - 100 символов'
      },
      {
        rule: 'maxLength',
        value: 100,
        errorMessage: 'А-я, 0-9. Мин - 2 символа, Макс - 100 символов'
      },
    ])

    .onSuccess((ev) => {
      ev.preventDefault();
      sectorForm.reset()
      modal.classList.remove('active');
      success.classList.add('active');
      setTimeout(() => {
        success.classList.remove('active');
      }, 3000)
    })
    .onFail((fields) => {

    });
} catch (e) {

}

//======Закрытие модалки успешной отправки формы====///
try {
  const modalClose = document.querySelector('[data-modal="success-close"]');
  successModal(modalClose,success )
} catch (e) {

}
