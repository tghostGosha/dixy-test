import {getStoreDetail} from "../axios/warehouse";
import {closeModal} from "../helpers/closeModal";
import {getRules} from "../axios/rules";
import {getSectors} from "../axios/sectors";
import {selectChoice} from "./choiceSector";
import {onlyRusLetter} from "../helpers/onlyRusLetter";
import Choices from "choices.js";
import {getAreas} from "../axios/areas";



export const updateWarehouse = () => {
  const warehouseUpdate = document.querySelector('[data-modal="update-warehouse"]')
  const closeBtn = document.querySelector('[data-close="update-warehouse"]')
  const warehouseUpdateForm = document.querySelector("#warehouseUpdateForm");
  const cancelBtn = document.querySelector('[data-сancel="update-warehouse"]')
  const storeNumber = document.querySelector('#storeNumber');
  const ruleName = document.querySelector('#ruleSelect');
  const area = document.querySelector('#areaSelect');
  const sector = document.querySelector('#sectorStoreSelect');
  const warehouseNumber = document.querySelector('#warehouseNumber');
  const delivery = document.querySelector('#delivery');
  const pickup = document.querySelector('#pickup');
  const radius = document.querySelector('#radius');
  const polygon = document.querySelector('#poligon');
  const schedule=document.querySelector('#schedule')
  let elementId = document.querySelector('#id');
  let choice

  try {
    document.addEventListener('click',  function (e) {
      if (e.target.matches('[data-update="open-warehouse"]')) {
        // choice = null
        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");
        elementId.value = id

        e.preventDefault()
         getStoreDetail(id).then(async (response) => {
           //======Очищаем все options у селекта сектора
           for (let i = sector.options.length - 1; i >= 0; i--) {
             if (i !== 0) { // Skip the first option
               sector.remove(i);
             }
           }

            if (response) {
              const areaData = await getAreas()
              let areaByID = areaData.data.find(function(item) { return item.id === response.data.area; });
              storeNumber.value =response.data.xml_id
              ruleName.value = response.data.rule
              area.value = areaByID.name
              warehouseNumber.value = response.data.store
              delivery.checked = response.data.delivery === true || response.data.delivery === '1';
              pickup.checked = response.data.pickup === true || response.data.pickup === '1';
              radius.value = response.data.radius
              if (!response.data.sector) {
                sector.value = ''

              } else {
                sector.value = response.data.sector
              }

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

                const choice = selectChoice(sector, newArr)

                //====Разрешаем только русские буквы и пробелы
                const input =document.querySelectorAll(".choices__input")
                input.forEach( e =>{
                  onlyRusLetter(e)
                })
                closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm, choice )
                closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm , choice )
              }

              // closeModal(cancelBtn,warehouseUpdate,warehouseUpdateForm, select )
              // closeModal(closeBtn,warehouseUpdate,warehouseUpdateForm , select )
            }
          })
        warehouseUpdate.classList.add('active');
      }
    })



  } catch (e) {
    console.log(e)
  }
}

