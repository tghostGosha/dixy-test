import {selectChoice} from '../modules/select'
import resize from '../modules/rezizeRow';
import {modalOpen} from "../modules/modal";
import {tippyOpen} from "../modules/dropdown";

//======Вызов Select окон====///
 //=============//======Тестовые массивы- нужно передавать с бэка ====///
const testArrayRuleSelect = [
    {
        value: 'first_rule', label: '1 правило'
    },
    {
        value: 'second_rule', label: '2 правило'
    },
    {
        value: 'third_rule', label: '2 правило'
    },
    {
        value: 'forth_rule', label: '3 правило'
    }
]
const testArraySectorChoices = [
    {
        value: 'himki', label: 'Химки'
    },
    {
        value: 'center', label: 'Центр'
    },
    {
        value: 'mitishi', label: 'Мытищи'
    },
    {
        value: 'lubertsy', label: 'Люберцы'
    }
]

try {
    const areaSelect = document.querySelector('#rules');
    const sectorSelect = document.querySelector('#sector');
    selectChoice(areaSelect, testArrayRuleSelect)
    selectChoice(sectorSelect, testArraySectorChoices)
} catch(e){}


//======Вызов модальных окон====///
try {
    const modalMap = document.querySelectorAll('[data-modal="map-modal"]');
    const modalRule = document.querySelectorAll('[data-modal="rule-modal"]');
    const modalBackgroundMap = document.querySelector('[data-modal="map"]');
    const modalBackgroundRule = document.querySelector('[data-modal="rule"]');
    modalOpen(modalMap, modalBackgroundMap)
    modalOpen(modalRule, modalBackgroundRule)
} catch(e){}