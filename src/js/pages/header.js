import {modalOpen} from "../modules/modal";

//======Вызов модальных окон====///
try {
  const modalExit = document.querySelectorAll('[data-open="exit"]');
  const modalBackgroundExit = document.querySelector('[data-modal="exit"]');

  modalOpen(modalExit, modalBackgroundExit)

} catch (e) {

}
