import {savePolygon, toggleEditPolygon} from "./map";
import {closeModal} from "../helpers/closeModal";

(function () {
  const modal = document.querySelector('[data-modal="modal-page"]')
  const closeButton = document.querySelector('[data-close="close"]')
  const form = document.querySelector(".page__form")
  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  const editButton = document.querySelector('[data-edit="polygon"]');
  const saveButton = document.querySelector('[data-save="save-polygon"]');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-open="open"]')) {
        modal.classList.add('active');
      }
    })
    closeModal(cancelBtn, modal, form)
    closeModal(closeButton, modal, form)

    editButton.addEventListener('click', toggleEditPolygon)
    saveButton.addEventListener('click', savePolygon)


  } catch (e) {
    // console.log(e)
  }
})();