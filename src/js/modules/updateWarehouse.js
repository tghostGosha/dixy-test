import {getStoreDetail} from "../axios/warehouse";
import {closeModal} from "../helpers/closeModal";


export const updateWarehouse = () => {
  const warehouseUpdate = document.querySelector('[data-modal="update-warehouse"]')
  const closeBtn = document.querySelector('[data-close="update-warehouse"]')
  const warehouseUpdateForm = document.querySelector("#warehouseUpdateForm");
  const cancelBtn = document.querySelector('[data-сancel="update-warehouse"]')
  const warehouseID = document.querySelector('#id');
  const ruleName = document.querySelector('#ruleSelect');
  const area = document.querySelector('#areaSelect');
  const sector = document.querySelector('#sectorSelect');
  const warehouseNumber = document.querySelector('#warehouseNumber');
  const delivery = document.querySelector('#delivery');
  const pickup = document.querySelector('#pickup');
  const radius = document.querySelector('#radius');
  const poligon = document.querySelector('#poligon');
  let elementId = document.querySelector('#id');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open-warehouse"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        elementId.value = id
        e.preventDefault()
        getStoreDetail(id).then((response) => {
          if (response) {
            warehouseID.value =response.id
            ruleName.value = response.rule_name
            area.value = response.region
            sector.value = response.sector
            warehouseNumber.value = response.store
            delivery.checked = response.delivery
            pickup.checked = response.pickup
            radius.value = response.radius
            poligon.value = response.poligon
          }
        })
        warehouseUpdate.classList.add('active');
      }
    })
    closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm )
    closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm )

  } catch (e) {
  }
}

