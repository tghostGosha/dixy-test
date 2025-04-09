
import dropdown from './modules/dropdown.js';
import main from './pages/main'
import warehouse from './pages/warehouse'
import sector from './pages/sector'
import history from './pages/history'
import header from './pages/header'
import calendar from './modules/calendar'
import {validate} from './modules/validate'
import {sendLogin} from "./axios/auth";
import {getAreas} from "./axios/areas";
import {serializeForm} from "./helpers/serializeForm";
import {getSectors} from "./axios/sectors";
import {getRules} from "./axios/rules";
import {onlyRusAndNumber} from "./helpers/onlyRusAndNumber";



const authForm = document.querySelector('#auth-form')

try {
  validate(authForm)
    .addField('#login', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
      {
        rule: 'minLength',
        value: 12,
        errorMessage: 'Мин 12 символов, A-z, @, точка'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Макс - 30 символов, A-z, @, точка'
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле'
      },
    ])

    .onSuccess((ev) => {
      ev.preventDefault();
      serializeForm(authForm, sendLogin)

    })
  // .onFail((fields) => {
  //   authError.style.display = 'block'
  //   console.log(dataForm)
  // });
} catch (e) {
}


//========запрещать после 0 вводить другие числа======
const zero = document.querySelectorAll(".onlyZero");
try {
  zero.forEach((item) => {
    item.addEventListener("keyup", function () {
      if (this.value.startsWith('0')) {
        this.value = 0
      }
    })
  });
} catch (e) {
}

//========разрешать только цифры, пробел и запятую===========
const warehouseArray = document.querySelectorAll('[data-id="warehouseNumberArray"]')

try {
  warehouseArray.forEach((item)=> {
    item.addEventListener('input', function () {
      let res = /[^0-9 ,\b]+$/g.exec(item.value);
      item.value = item.value.replace(res, '');
    })
  })
} catch (e) {
}
if (window.location.pathname === '/' || window.location.pathname.includes('store') || window.location.pathname.includes('sector')) {
  //========заполняем Select Области===========
  const dataAreas = await getAreas()

  const areasSelect = document.querySelectorAll('[data-id="areaSelect"]');
  if (dataAreas) {
    areasSelect.forEach(select => {
      dataAreas.data.forEach(function(v){
        let option = document.createElement("option");
        option.value = v.id;
        option.innerHTML = v.name;
        select.appendChild(option);
      });
    })
  }
//========заполняем Select правил===========
  const dataRules = await getRules()

  const rulesSelect = document.querySelectorAll('[data-id="rule-select"]');
  if (dataRules) {
    rulesSelect.forEach(select => {
      dataRules.data.forEach(function(v){
        let option = document.createElement("option");
        option.value = v.id;
        option.innerHTML = v.name;
        select.appendChild(option);
      });
    })
  }


//========заполняем Select Секторов===========
  const dataSectors = await getSectors()
  const sectorsSelect = document.querySelectorAll('[data-id="sectorSelect"]');
  if (dataSectors) {
    sectorsSelect.forEach(select => {
      dataSectors.data.forEach(function (v) {
        let option = document.createElement("option");
        option.value = v.id;
        option.innerHTML = v.name;
        select.appendChild(option);
      });
    })
  }
}

//========разрешать только русские буквы, пробел, точку и тире===========
const onlyRus = document.querySelectorAll(".onlyRus");
try {
  onlyRus.forEach((item) => {
    item.addEventListener("input", function () {
      let res = /[^аА-яЯёЁ .-]/g.exec(item.value);
      item.value = item.value.replace(res, '');
    })
  })
} catch (e) {
}
//========разрешать только русские буквы, цифры, пробел, точку и тире===========
const searchInput = document.querySelectorAll('#search');
const searchForm = document.querySelector('[data-search="search"]');
try {
  searchInput.forEach((item) => {
    item.addEventListener("input", function () {
      onlyRusAndNumber(item)
    })
  })
  validate(searchForm)
    .addField('#search', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Максимальное кол-во символов - 100'
      },
    ])

    .onSuccess((ev) => {
      ev.preventDefault();
    })

} catch (e) {
}