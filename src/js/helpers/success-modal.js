export const closeSuccessModal = (button, modal) => {
  button.forEach( e => {
    e.addEventListener("click", function (e) {
      if (modal) {
        modal.classList.remove('active')
      }
    });
  })
}

export const openSuccessModal = (success)=> {
  success.classList.add('active');
  setTimeout(() => {
    success.classList.remove('active');
  }, 3000)
}

