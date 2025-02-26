(function () {
    const openButton = document.querySelectorAll('[data-open="open"]')
    const modal = document.querySelector('[data-modal="modal-page"]')
    const closeButton = document.querySelector('[data-close="close"]')
    const form = document.querySelector( ".page__form")
    const cancelBtn = document.querySelector('[data-сancel="cancel"]')

    try {
        document.addEventListener('click', function (e) {
            if (e.target.matches('[data-open="open"]')) {
                modal.classList.add('active');
            }
        })
        // openButton.addEventListener('click', (event)=> {
        //     modal.classList.add('active');
        // });
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault()
            modal.classList.remove('active');
            form.reset();
        });
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            form.reset();
        });
    } catch (e) {
    }


})();