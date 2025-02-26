export const modalOpen = (button, modalWindow) => {
    // привязываем необходимые элементы
    const modalClose = document.querySelectorAll(".modalClose");
    const bodyElementHTML = document.getElementsByTagName("body")[0];

    button.forEach((item)=> {
        item.addEventListener('click', ()=> {
            console.log('click')
            modalWindow.style.display = "block";
            bodyElementHTML.classList.add('active-modal')
        })
    })

// нажатие на крестик закрытия модального окна
    modalClose.forEach((item) => {
        item.addEventListener("click", function () {
            modalWindow.style.display = "none";
            bodyElementHTML.classList.remove('active-modal')
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
