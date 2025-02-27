
//======Вызов модального окна выход====///
(function () {
  const modalBackgroundExit = document.querySelector('[data-modal="exit"]');
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const closeButton = document.querySelector('[data-exit="close"]');
  const cancelBtn = document.querySelector('[data-exit="cancel"]');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-open="exit"]')) {
        modalBackgroundExit.style.display = "block";
        bodyElementHTML.classList.add('active-modal')
      }
    })
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      modalBackgroundExit.style.display = "none";

    });
    closeButton.addEventListener('click', () => {
      modalBackgroundExit.style.display = "none";

    });
  } catch (e){}

})();

