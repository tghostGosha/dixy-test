
(function () {
    const openButton = document.querySelectorAll('[data-open="open"]')
    const modal= document.querySelector('[data-modal="modal-page"]')
    const closeButton = document.querySelector('[data-close="close"]')

    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-open="open"]')) {
            modal.classList.add('active');
        }
    })
    // openButton.addEventListener('click', (event)=> {
    //     modal.classList.add('active');
    // });

    closeButton.addEventListener('click', ()=> {
        modal.classList.remove('active');
    });

})();