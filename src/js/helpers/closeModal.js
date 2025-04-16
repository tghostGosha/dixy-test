
function clearValidationErrors(form) {
  const errorElements = form.querySelectorAll('.just-validate-error-label');
  errorElements.forEach(element => {
    element.remove();
  });
  const errorClass = form.querySelectorAll('.is-invalid');
  errorClass.forEach(element => {

    element.classList.remove('is-invalid');
  });
}

export const closeModal = (button, modal, form) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    form.reset();
    clearValidationErrors(form)
    modal.classList.remove('active');
  });
}