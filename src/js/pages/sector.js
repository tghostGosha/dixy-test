import {successModal} from "../modules/success-modal";
import {createSector, deleteSector, downloadSector, getSectors, updateSector} from "../axios/sectors";
import dataUpdate from '../modules/updateSector';
import {SectorValidation} from "../utils/sectorValidation";


if (window.location.pathname.includes('sector')) {
  //===Список всех секторов===////

    getSectors()

  //======Скачать сектора====///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        downloadSector(formatDoc)
      }
    })
  } catch(e){}
}


const sectorForm = document.querySelector('#sector-form');
const success = document.querySelector('[data-modal="success"]')
const sectorUpdateForm = document.querySelector('#sectorUpdateForm');
const modalCreate = document.querySelector('[data-create="sector"]');
const modalUpdate = document.querySelector('[data-update="sector"]');

//======Валидация нового сектора====///
if (sectorForm) {
  SectorValidation(sectorForm, createSector, modalCreate)
}
//======Валидация редактирования сектора====///
if (sectorUpdateForm) {
  SectorValidation(sectorUpdateForm, updateSector, modalUpdate)
}


try {
  const modalClose = document.querySelector('[data-modal="success-close"]');
  successModal(modalClose, success)
} catch (e) {

}



//======модалка удаления сектора====///
(function () {
  const modalBackgroundDelete = document.querySelector('[data-modal-sector="delete"]');
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const cancelBtn = document.querySelector('[data-delete-sector="cancel"]');
  const confirmBtn = document.querySelector('[data-delete-sector="delete"]')
  let id
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-delete="delete-sector"]')) {
        modalBackgroundDelete.style.display = "block";
        bodyElementHTML.classList.add('active-modal');
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        id = parent.getAttribute("id");
      }
    })
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modalBackgroundDelete.style.display = "none";

    });
    confirmBtn.addEventListener('click', (event) => {
      event.preventDefault()
      deleteSector(id)
      getSectors()
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();