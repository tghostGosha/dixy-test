import {getStoreDetail} from "../axios/warehouse";
import {closeModal} from "../helpers/closeModal";
import {getRules} from "../axios/rules";
import {getSectors} from "../axios/sectors";
import {selectChoice} from "./choiceSector";
import {onlyRusLetter} from "../helpers/onlyRusLetter";
import {addSectorsSelect} from "../helpers/addSectorsSelect";


export const updateWarehouse = () => {
  const warehouseUpdate = document.querySelector('[data-modal="update-warehouse"]')
  const closeBtn = document.querySelector('[data-close="update-warehouse"]')
  const warehouseUpdateForm = document.querySelector("#warehouseUpdateForm");
  const cancelBtn = document.querySelector('[data-сancel="update-warehouse"]')
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
  let select = null

  try {
    document.addEventListener('click',  function (e) {
      if (e.target.matches('[data-update="open-warehouse"]')) {

        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        elementId.value = id

        // e.preventDefault()
         getStoreDetail(id).then(async (response) => {
            if (response) {
              storeNumber.value =response.data.xml_id
              ruleName.value = response.data.rule
              area.value = response.data.region
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
              //========заполняем Select Секторов===========
              const dataSectors = await getSectors(response.data.area)

              if (dataSectors) {
                let result = dataSectors.data.map(({id, name}) =>
                  ({value: id, label: name}));

                const toggle = (arr, id) => arr.map(n => n.value === id ? { ...n, selected: !n.selected } : n);
                const newArr = toggle(result, response.data.sector)
                sector.value = response.data.sector
                select = selectChoice(sector, newArr)
                select.init()
                //====Разрешаем только русские буквы и пробелы
                const input =document.querySelectorAll(".choices__input")
                input.forEach( e =>{
                  onlyRusLetter(e)
                })

              }
              // await addSectorsSelect(response, sector, select)
              // closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm, select )
              // closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm , select )
            }
          })
        warehouseUpdate.classList.add('active');
      }
    })

    closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm, select )
    closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm , select )

  } catch (e) {
    console.log(e)
  }
}

