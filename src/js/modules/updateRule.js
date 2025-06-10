import {getRuleDetail} from "../axios/rules";
import {closeModal} from "../helpers/closeModal";
import {checkDataRules} from "../helpers/checkDataRules";
import {onlyRusLetter} from "../helpers/onlyRusLetter";
import {selectChoice} from "./choiceSector";
import {getSectors} from "../axios/sectors";


export const updateRuleDetail = () => {

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
  const minCostSelf = document.querySelector('#updateMinCostSelf');
  const minCost = document.querySelector('#updateMinCost');
  let ruleId = document.querySelector('#ruleId');

  try {
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-update="open"]')) {

        const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let id = parent.getAttribute("id");

        getRuleDetail(id).then(async (response) => {
          //======Очищаем все options у селекта сектора
          for (let i = sector.options.length - 1; i >= 0; i--) {
            if (i !== 0) { // Skip the first option
              sector.remove(i);
            }
          }
          if (response) {
            ruleId.value = response.data.id
            ruleName.value = response.data.name

            if (!response.data.area || response.data.area === '0') {
              ruleArea.value = ''
            } else {
              ruleArea.value = response.data.area
            }
            if (!response.data.sector) {
              sector.value = ''

            } else {
              sector.value = response.data.sector
            }
            if (!response.data.store) {
              warehouseNumber.value = ''
            }

            warehouseNumber.value = response.data.store
            costDelivery.value = response.data.price
            freeDelivery.value = response.data.free_delivery_amount
            minCost.value = response.data.min_amount
            minCostSelf.value = response.data.min_amount_for_self_delivery
            ruleActive.checked = response.data.active === true || response.data.active === '1';


            //========заполняем Select Секторов===========
            let dataSectors
            if (response.data.area === '0' || response.data.area === '1' || response.data.area === '') {
              dataSectors = await getSectors()
            } else {
              dataSectors = await getSectors(response.data.area)
            }

            if (dataSectors) {
              let select
              if (select) {
                select.destroy()
              }
              let result = dataSectors.data.map(({id, name}) =>
                ({value: id, label: name}));

              const toggle = (arr, id) => arr.map(n => n.value === id ? {...n, selected: !n.selected} : n);
              const newArr = toggle(result, response.data.sector)

              select = selectChoice(sector, newArr)
              select.init()
              checkDataRules(sector, ruleArea, warehouseNumber, select)
              //====Разрешаем только русские буквы и пробелы
              const input = document.querySelectorAll(".choices__input")
              input.forEach(e => {
                onlyRusLetter(e)
              })

              closeModal(cancelBtn, ruleUpdate, ruleUpdateForm, select)
              closeModal(closeButton, ruleUpdate, ruleUpdateForm, select)
            }


          }
        })

        ruleUpdate.classList.add('active');

      }

    })


  } catch (e) {

  }
}

