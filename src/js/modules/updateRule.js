import {getRuleDetail} from "../axios/rules";
import {closeModal} from "../helpers/closeModal";


(function () {
  const ruleUpdate = document.querySelector('[data-modal="update-rule"]')
  const closeButton = document.querySelector('[data-close="update-rule"]')
  const ruleUpdateForm = document.querySelector("#ruleUpdateForm")
  const cancelBtn = document.querySelector('[data-сancel="update-rule"]')
  const ruleName = document.querySelector('#updateTitle');
  const ruleActive = document.querySelector('#updateActive');
  const ruleArea = document.querySelector('#updateAreaSelect');
  const sector = document.querySelector('#updateSectorSelect');
  const warehouseNumber = document.querySelector('#updateWarehouseNumber');
  const costDelivery = document.querySelector('#updateCostDelivery');
  const freeDelivery = document.querySelector('#updateFreeDelivery');
  const minCost = document.querySelector('#updateMinCost');
  let ruleId = document.querySelector('#id');
  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        ruleId.value = id
        e.preventDefault()
        getRuleDetail(id).then((response) => {
          if (response) {
            ruleName.value = response.name
            ruleArea.value = response.area
            sector.value = response.sector
            warehouseNumber.value = response.store
            costDelivery.value = response.price
            freeDelivery.value = response.free_delivery_amount
            minCost.value = response.min_amount
            ruleActive.checked = response.active
          }
        })
        ruleUpdate.classList.add('active');

      }
    })
    closeModal(cancelBtn, ruleUpdate, ruleUpdateForm)
    closeModal(closeButton, ruleUpdate, ruleUpdateForm)

  } catch (e) {
  }
})();

