import {initializeMap} from "./map";

const openMapModal = (modalWindow, bodyElementHTML) => {
  modalWindow.style.display = "block";
  bodyElementHTML.classList.add('active-modal')
  initializeMap()
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
    item.addEventListener('click', () => {
      openMapModal(modalWindow, bodyElementHTML);
    })
  })

  modalClose.forEach((item) => {
    item.addEventListener("click", function () {
      closeMapModal(modalWindow, bodyElementHTML);
    });
  })

// закрытие модального окна на зону вне окна, т.е. на фон
  modalWindow.addEventListener("click", function (event) {
    if (event.target === modalWindow) {
      modalWindow.style.display = "none";
      bodyElementHTML.classList.remove('active-modal')
    }
  });
}


