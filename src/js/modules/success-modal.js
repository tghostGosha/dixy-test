export const successModal = (button, modal) => {
  button.addEventListener("click", function () {
    if (modal) {
      modal.classList.remove('active')
    }
  });
}

