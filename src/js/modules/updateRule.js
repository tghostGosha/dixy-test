import {getRuleDetail} from "../axios/rules";


(function () {
  const ruleUpdate = document.querySelector('[data-modal="update-rule"]')
  const closeButton = document.querySelectorAll('[data-close="close"]')
  const ruleUpdateForm = document.querySelector("#ruleUpdateForm")
  const cancelBtn = document.querySelectorAll('[data-сancel="cancel"]')
  const ruleName = document.querySelector('#title');
  const ruleArea = document.querySelector('#areaSelect');
  const sector = document.querySelector('#sectorSelect');
  const warehouseNumber = document.querySelector('#warehouseNumber');
  const costDelivery = document.querySelector('#costDelivery');
  const freeDelivery = document.querySelector('#freeDelivery');
  const minCost = document.querySelector('#minCost');
  const activeSwitch = document.querySelector('[data-switch="switch"]');
  let ruleId = document.querySelector('#id');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        ruleId.value = id
        e.preventDefault()
        getRuleDetail(id).then((response) => {
          ruleName.value = response.name
          ruleArea.value = response.area
          sector.value = response.sector
          warehouseNumber.value = response.store
          costDelivery.value = response.price
          freeDelivery.value = response.free_delivery_amount
          minCost.value = response.min_amount
          activeSwitch.checked = response.active
        })
        ruleUpdate.classList.add('active');

      }
    })
    cancelBtn.forEach(item=> {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        ruleUpdate.classList.remove('active');
        ruleUpdateForm.reset();
      });
    })
    closeButton.forEach(item=> {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        ruleUpdate.classList.remove('active');
        ruleUpdateForm.reset();
      });
    })


  } catch (e) {
  }
})();

