import {initializeMap, unInitializeMap} from "./map";

const openMapModal = (modalWindow, bodyElementHTML, id) => {
  modalWindow.style.display = "block";
  bodyElementHTML.classList.add('active-modal')
  initializeMap(id)
};

const closeMapModal = (modalWindow, bodyElementHTML) => {
  modalWindow.style.display = "none";
  bodyElementHTML.classList.remove('active-modal')
};

export const modalOpenMap = (button, modalWindow) => {
  // привязываем необходимые элементы
  const modalClose = document.querySelectorAll(".modalClose");
  const bodyElementHTML = document.getElementsByTagName("body")[0];

  button.forEach((item) => {
    item.addEventListener('click', (event) => {
      let idStore = event.target.parentNode.dataset.id

      openMapModal(modalWindow, bodyElementHTML, idStore);
    })
  })

  modalClose.forEach((item) => {
    item.addEventListener("click", function () {
      unInitializeMap()
      closeMapModal(modalWindow, bodyElementHTML);
    });
  })

// закрытие модального окна на зону вне окна, т.е. на фон
  modalWindow.addEventListener("click", function (event) {
    if (event.target === modalWindow) {
      unInitializeMap()

      modalWindow.style.display = "none";
      bodyElementHTML.classList.remove('active-modal')
    }
  });
}


