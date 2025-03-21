export const closeModal = (button, modal, form) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    modal.classList.remove('active');
    form.reset();
  });
}