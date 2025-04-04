import {getSectorDetail} from "../axios/sectors";
import {closeModal} from "../helpers/closeModal";


(function () {
  const sectorUpdate = document.querySelector('[data-update="sector"]');
  const closeButton = document.querySelector('[data-close="update-sector"]');
  const sectorUpdateForm = document.querySelector("#sectorUpdateForm");
  const cancelBtn = document.querySelector('[data-сancel="update-sector"]');
  const sectorName = document.querySelector('[data-update="sector-title"]');
  const sectorArea = document.querySelector('[data-update="sector-area"]');
  let sectorId = document.querySelector('#id');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open-sector"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        const id = parent.getAttribute("id");
        sectorId.value = id
        e.preventDefault()
        getSectorDetail(id).then((response) => {
            if (response) {
              sectorName.value = response.data.name
              sectorArea.value = response.data.area
            }
          }
        )
        sectorUpdate.classList.add('active');
      }
    })
    closeModal(cancelBtn,sectorUpdate,sectorUpdateForm )
    closeModal(closeButton,sectorUpdate,sectorUpdateForm )

  } catch (e) {
  }
})();


