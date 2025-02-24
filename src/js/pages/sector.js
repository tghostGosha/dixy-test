import {selectChoice} from '../modules/select';


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

try {
    const areaSelect = document.querySelector('#rules');
    selectChoice(areaSelect, testArrayAreaSelect)
} catch(e){}