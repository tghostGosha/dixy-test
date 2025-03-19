import {savePolygon, toggleEditPolygon} from "./map";

(function () {
  const modal = document.querySelector('[data-modal="modal-page"]')
  const ruleUpdate = document.querySelector('[data-modal="modal-page-update"]')
  const closeButton = document.querySelector('[data-close="close"]')
  const form = document.querySelector(".page__form")
  const cancelBtn = document.querySelector('[data-сancel="cancel"]')
  const editButton = document.getElementById('edit_polygon');
  const saveButton = document.querySelector('[data-save="save-polygon"]');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-open="open"]')) {
        modal.classList.add('active');
      }
    })
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modal.classList.remove('active');
      form.reset();
    });
    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
      form.reset();
    });
    editButton.addEventListener('click', toggleEditPolygon)
    saveButton.addEventListener('click', savePolygon)
  } catch (e) {
  }
})();