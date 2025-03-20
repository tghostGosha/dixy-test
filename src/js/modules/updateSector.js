import {getSectorDetail} from "../axios/sectors";


(function () {
  const sectorUpdate = document.querySelector('[data-modal="update-sector"]');
  const closeButton = document.querySelectorAll('[data-close="close"]');
  const sectorUpdateForm = document.querySelector("#sectorUpdateForm");
  const cancelBtn = document.querySelectorAll('[data-сancel="cancel"]');
  const sectorName = document.querySelector('#title');
  const sectorArea = document.querySelector('#areaSelect');
  let sectorId = document.querySelector('#id');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open-sector"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        const id = parent.getAttribute("id");
        sectorId.value = id
        e.preventDefault()
        getSectorDetail(id).then((response) => {
            sectorName.value = response.name
            sectorArea.value = response.area

          }
        )

        sectorUpdate.classList.add('active');
        console.log(sectorId.value)
      }
    })
    cancelBtn.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        sectorUpdate.classList.remove('active');
        sectorUpdateForm.reset();
      });
    })
    closeButton.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        sectorUpdate.classList.remove('active');
        sectorUpdateForm.reset();
      });
    })


  } catch (e) {
  }
})();

