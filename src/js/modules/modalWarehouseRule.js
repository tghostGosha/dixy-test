import {getRuleDetail} from "../axios/rules";

export const modalWarehouseRule = (button, modalWindow) => {
  // привязываем необходимые элементы
  const modalClose = document.querySelectorAll(".modalClose");
  const bodyElementHTML = document.getElementsByTagName("body")[0];
  const ruleId = document.querySelector('#ruleId')
  const ruleName = document.querySelector('#title')
  const activeSwitch = document.querySelector('#activeSwitch')
  const ruleArea = document.querySelector('#ruleArea')
  const sector = document.querySelector('#sector')
  const warehouseNumber = document.querySelector('#warehouseNumber')
  const costDelivery = document.querySelector('#costDelivery')
  const freeDelivery = document.querySelector('#freeDelivery')
  const minCost = document.querySelector('#minCost')

  button.forEach((item) => {
    item.addEventListener('click', (e) => {
      getRuleDetail(e.target.dataset.id).then((resp) => {
        if (resp) {
          ruleId.value = response.id
          ruleName.value = response.name
          ruleArea.value = response.area
          sector.value = response.sector
          warehouseNumber.value = response.store
          costDelivery.value = response.price
          freeDelivery.value = response.free_delivery_amount
          minCost.value = response.min_amount
          activeSwitch.checked = response.active
        }
      })
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