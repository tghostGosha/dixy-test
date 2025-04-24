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

export const closeModal = (button, modal, form, select) => {

  button.addEventListener('click', (event) => {
    event.preventDefault()
    //==отключаем инстанс Селекта====
    try {
      if (select) {
        select.destroy()
      }
      form.reset();
      clearValidationErrors(form)
    } catch (e) {
      console.log(e)
    }

    modal.classList.remove('active');
  });
}