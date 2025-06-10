import {closeSuccessModal} from "../helpers/success-modal";
import {
  createSector,
  deleteSector,
  downloadSector,
  getSectors,
  updateSector,

} from "../axios/sectors";
import dataUpdate from '../modules/updateSector';
import {SectorValidation} from "../utils/sectorValidation";
import {resetSearch, searchInput, searchPage, sortType} from "../helpers/search";
import {downloadFile} from "../axios/downloadFile";

//======Поиск====///
const search = document.querySelector('#search')
const searchButton = document.querySelector('#search-button');
const pageValue = document.querySelector('#pageNumber');

searchInput(search, searchButton)
searchPage(pageValue)

//======Cброс query параметров поиска====///
try {
  const resetButton = document.querySelector('[data-reset="search"]');
  resetSearch(resetButton)
} catch (e) {}

if (window.location.pathname.includes('sector')) {
  //======Сортировка======///
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-sort="sort"]')) {
        const sortDate = e.target
        sortType(sortDate)
      }
    })
  } catch (e) {
  }

  //======Скачать сектора====///
  try {
    document.addEventListener('click', async function (e) {
      if (e.target.matches('[data-download="format"]')) {
        const formatDoc = e.target.textContent
        const data = await downloadSector(formatDoc)
        downloadFile(data.data.path, data.data.name)
      }
    })
  } catch (e) {
  }
}

const sectorForm = document.querySelector('#sector-form');
const sectorUpdateForm = document.querySelector('#sectorUpdateForm');
const modalCreate = document.querySelector('[data-create="sector"]');
const modalUpdate = document.querySelector('[data-update="sector"]');
const successEdit = document.querySelector('[data-success="edit-sector"]')
const successAdd = document.querySelector('[data-success="add-sector"]');
const successClose = document.querySelectorAll('[data-success="close"]')
const successDelete = document.querySelector('[data-success="delete-sector"]');

//======Валидация нового сектора====///
if (sectorForm) {
  SectorValidation(sectorForm, createSector, modalCreate);
}
//======Валидация редактирования сектора====///
if (sectorUpdateForm) {
  SectorValidation(sectorUpdateForm, updateSector, modalUpdate);
}

//======Закрытие "успешных" модальных окон====///
try {
  closeSuccessModal(successClose, successEdit)
  closeSuccessModal(successClose, successAdd);
  closeSuccessModal(successClose, successDelete);
} catch (e) {
}


//======модалка удаления сектора====///
(function () {
  const modalBackgroundDelete = document.querySelector('[data-modal-sector="delete"]');
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const cancelBtn = document.querySelector('[data-delete-sector="cancel"]');
  const confirmBtn = document.querySelector('[data-delete-sector="delete"]')
  const closeButton = document.querySelector('[ data-delete-sector="close"]');

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
    closeButton.addEventListener('click', (event) => {
      event.preventDefault()
      modalBackgroundDelete.style.display = "none";

    });
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modalBackgroundDelete.style.display = "none";

    });
    modalBackgroundDelete.addEventListener("click", function (event) {
      if (event.target === modalBackgroundDelete) {
        modalBackgroundDelete.style.display = "none";
      }
    });
    confirmBtn.addEventListener('click', async (event) => {
      event.preventDefault()
      deleteSector(id)
      await getSectors()
      modalBackgroundDelete.style.display = "none";

    });
  } catch (e) {
  }

})();