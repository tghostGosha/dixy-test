import {getRuleDetail, getRules} from "../axios/rules";

export const modalWarehouseRule = (button, modalWindow) => {
  // привязываем необходимые элементы
  const modalClose = document.querySelector('[data-close="modal-rule"]');
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
  const minCostSelf = document.querySelector('#minCostSelfRule')

  button.forEach((item) => {
    item.addEventListener('click', (e) => {
      getRuleDetail(e.target.parentNode.dataset.id).then((response) => {
        if (response) {
          ruleId.value = response.data.id
          ruleName.value = response.data.name
          ruleArea.value = response.data.area
          sector.value = response.data.sector
          warehouseNumber.value = response.data.store
          costDelivery.value = response.data.price
          freeDelivery.value = response.data.free_delivery_amount
          minCost.value = response.data.min_amount
          minCostSelf.value = response.data.min_amount_for_self_delivery
          activeSwitch.checked = response.data.active === true || response.data.active === '1';
        }
      })
      modalWindow.style.display = "block";
      bodyElementHTML.classList.add('active-modal')
    })
  })


  // нажатие на крестик закрытия модального окна

    modalClose.addEventListener("click", function () {
      modalWindow.style.display = "none";
      bodyElementHTML.classList.remove('active-modal')
    });

  // закрытие модального окна на зону вне окна, т.е. на фон
  modalWindow.addEventListener("click", function (event) {
    if (event.target === modalWindow) {
      modalWindow.style.display = "none";
      bodyElementHTML.classList.remove('active-modal')
    }
  });

}