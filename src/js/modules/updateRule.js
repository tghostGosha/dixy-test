import {getRuleDetail} from "../axios/rules";


(function () {
  const ruleUpdate = document.querySelector('[data-modal="modal-page-update"]')
  const closeButton = document.querySelectorAll('[data-close="close"]')
  const form = document.querySelector(".page__form")
  const cancelBtn = document.querySelectorAll('[data-сancel="cancel"]')


  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        // console.log(parent)
        // console.log(id)
        e.preventDefault()
        getRuleDetail(id)
        ruleUpdate.classList.add('active');

      }
    })
    cancelBtn.forEach(item=> {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        ruleUpdate.classList.remove('active');
        form.reset();
      });
    })
    closeButton.forEach(item=> {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        ruleUpdate.classList.remove('active');
        form.reset();
      });
    })


  } catch (e) {
  }
})();

