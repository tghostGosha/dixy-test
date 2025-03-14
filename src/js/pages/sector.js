import {validate} from "../modules/validate";
import {successModal} from "../modules/success-modal";

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
  successModal(modalClose, success)
} catch (e) {

}
//======модалка удаления сектора====///
(function () {
  const modalBackgroundDelete = document.querySelector('[data-modal-sector="delete"]');
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const closeButton = document.querySelector('[data-delete-sector="close"]');
  const cancelBtn = document.querySelector('[data-delete-sector="cancel"]');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-delete-sector="delete"]')) {
        modalBackgroundDelete.style.display = "block";
        bodyElementHTML.classList.add('active-modal');

      }
    })
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modalBackgroundDelete.style.display = "none";

    });
    closeButton.addEventListener('click', () => {
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();