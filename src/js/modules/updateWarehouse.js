import {getStoreDetail} from "../axios/warehouse";
import {closeModal} from "../helpers/closeModal";
import {getRules} from "../axios/rules";
import {getSectors} from "../axios/sectors";


export const updateWarehouse = () => {
  const warehouseUpdate = document.querySelector('[data-modal="update-warehouse"]')
  const closeBtn = document.querySelector('[data-close="update-warehouse"]')
  const warehouseUpdateForm = document.querySelector("#warehouseUpdateForm");
  const cancelBtn = document.querySelector('[data-сancel="update-warehouse"]')
  // const warehouseID = document.querySelector('#id');
  const storeNumber = document.querySelector('#storeNumber');
  const ruleName = document.querySelector('#ruleSelect');
  const area = document.querySelector('#areaSelect');
  const sector = document.querySelector('#sectorSelect');
  const warehouseNumber = document.querySelector('#warehouseNumber');
  const delivery = document.querySelector('#delivery');
  const pickup = document.querySelector('#pickup');
  const radius = document.querySelector('#radius');
  const polygon = document.querySelector('#poligon');
  const schedule=document.querySelector('#schedule')
  let elementId = document.querySelector('#id');

  try {
    document.addEventListener('click',  function (e) {
      if (e.target.matches('[data-update="open-warehouse"]')) {
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        elementId.value = id
        e.preventDefault()
         getStoreDetail(id).then((response) => {
            if (response) {

              storeNumber.value =response.data.xml_id
              ruleName.value = response.data.rule
              area.value = response.data.region
              sector.value = response.data.sector
              warehouseNumber.value = response.data.store
              delivery.checked = response.data.delivery === true || response.data.delivery === '1';
              pickup.checked = response.data.pickup === true || response.data.pickup === '1';
              radius.value = response.data.radius
              if (response.data.polygon) {
                polygon.value = 'задан'
              } else  {
                polygon.value = ' не задан'
              }
              schedule.textContent = response.data.schedule
            }
          })


        warehouseUpdate.classList.add('active');
      }
    })
    closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm )
    closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm )

  } catch (e) {
    console.log(e)
  }
}

