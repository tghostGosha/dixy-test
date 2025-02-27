import {selectChoice} from '../modules/select'
import resize from '../modules/rezizeRow';
import {modalOpen} from "../modules/modal";
import {tippyOpen} from "../modules/dropdown";
import {validate} from "../modules/validate";
import dataOpen from '../modules/modal-page';
//======Вызов Select окон====///
//=============//======Тестовые массивы- нужно передавать с бэка ====///
const testArrayRuleSelect = [
  {
    value: 'first_rule', label: '1 правило', selected: true
  },
  {
    value: 'second_rule', label: '2 правило', selected: false
  },
  {
    value: 'third_rule', label: '2 правило', selected: false
  },
  {
    value: 'forth_rule', label: '3 правило', selected: false
  }
]
const testArraySectorChoices = [
  {
    value: 'himki', label: 'Химки', selected: true
  },
  {
    value: 'center', label: 'Центр', selected: false
  },
  {
    value: 'mitishi', label: 'Мытищи', selected: false
  },
  {
    value: 'lubertsy', label: 'Люберцы', selected: false
  }
]


const ruleSelect = document.querySelector('#rulesSelect');
const sectorSelect = document.querySelector('#sectorSelect');
selectChoice(ruleSelect, testArrayRuleSelect)
selectChoice(sectorSelect, testArraySectorChoices)


//======Вызов модальных окон====///
try {
  const modalMap = document.querySelectorAll('[data-modal="map-modal"]');
  const modalRule = document.querySelectorAll('[data-modal="rule-modal"]');
  const modalBackgroundMap = document.querySelector('[data-modal="map"]');
  const modalBackgroundRule = document.querySelector('[data-modal="rule"]');
  modalOpen(modalMap, modalBackgroundMap)
  modalOpen(modalRule, modalBackgroundRule)
} catch (e) {

}

//======Валидация нового правила====///
const warehouseForm = document.querySelector('#warehouse-form');
const modal = document.querySelector('[data-modal="modal-page"]')
try {
  validate(warehouseForm)

    .addField('#poligon', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        validator: (value) => {
          return value > 0 && value < 100000
        },
        errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
      },

    ])
    .addField('#radius', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        validator: (value) => {
          return value > 0 && value < 100000
        },
        errorMessage: '0-9, спецсимволы запрещены.Мин- 0, Макс -100 000'
      },

    ])

    .onSuccess((ev) => {
      ev.preventDefault();
      warehouseForm.reset()
      modal.classList.remove('active');
    })
    .onFail((fields) => {

    });
} catch (e) {
}