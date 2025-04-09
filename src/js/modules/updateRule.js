import {getRuleDetail} from "../axios/rules";
import {closeModal} from "../helpers/closeModal";


(function () {
  const ruleUpdate = document.querySelector('[data-update="rule"]')
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
  let ruleId = document.querySelector('#ruleId');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        e.preventDefault()
        getRuleDetail(id).then((response) => {
          console.log(response.data, 'response.data.active')
          if (response) {
            ruleId.value = response.data.id
            ruleName.value = response.data.name
            ruleArea.value = response.data.area
            sector.value = response.data.sector
            warehouseNumber.value = response.data.store
            costDelivery.value = response.data.price
            freeDelivery.value = response.data.free_delivery_amount
            minCost.value = response.data.min_amount
            if (response.data.active === true || response.data.active === '1') {
              ruleActive.checked = true
            } else {
              ruleActive.checked = false
            }

          }
        })
        ruleUpdate.classList.add('active');

      }
    })
    closeModal(cancelBtn, ruleUpdate, ruleUpdateForm)
    closeModal(closeButton, ruleUpdate, ruleUpdateForm)

  } catch (e) {
    // console.log(e)
  }
})();

