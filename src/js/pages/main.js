import dropdown from '../modules/dropdown';
import dataOpen from '../modules/modal-page';
import {selectChoice} from '../modules/select';
import {modalOpen} from "../modules/modal";


//======Вызов Select окон====///

//=============//======Тестовые массивы- нужно передавать с бэка ====///

const testArrayAreaSelect = [
    {
        value: 'moscow', label: 'Московская область'
    },
    {
        value: 'tverskaya', label: 'Тверская область'
    },
    {
        value: 'vladimir', label: 'Владимирская область'
    },
    {
        value: 'ivanovo', label: 'Ивановская область'
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
    const areaSelect = document.querySelector('#area');
    const sectorSelect = document.querySelector('#sector');
    selectChoice(areaSelect, testArrayAreaSelect)
    selectChoice(sectorSelect, testArraySectorChoices)
} catch(e){}

