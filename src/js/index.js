// import dropdown from './modules/dropdown.js';
// import main from './pages/main'
// import warehouse from './pages/warehouse'
// import sector from './pages/sector'
// import header from './pages/header'
// import calendar from './modules/calendar'
import {validate} from './modules/validate'
import {sendLogin} from "./axios/login";

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
      serializeForm(authForm)
    })
    // .onFail((fields) => {
    //   authError.style.display = 'block'
    //   console.log(dataForm)
    // });
} catch (e) {
}



function serializeForm(formNode) {
  let data = new FormData(formNode)
  sendLogin(data)
  return data
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


//========разрешать только русские буквы, пробел, точку и тире===========
const onlyRus = document.querySelectorAll(".onlyRus");
try {
  onlyRus.forEach((item) => {
    item.addEventListener("keydown", function () {
      let res = /[^аА-яЯёЁ .-]/g.exec(item.value);
      item.value = item.value.replace(res, '');
    })
  })
} catch (e) {
}
//========разрешать только русские буквы, цифры, пробел, точку и тире===========
const searchInput = document.querySelectorAll('#search')
const searchForm = document.querySelector('#search-form')
try {
  searchInput.forEach((item) => {
    item.addEventListener("keydown", function () {
      let res = /[^аА-яЯёЁ0-9 .-]/g.exec(item.value);
      item.value = item.value.replace(res, '');
    })
  })
  validate(searchForm)
    .addField('#search', [
      {
        rule: 'maxLength',
        value: 3,
        errorMessage: 'Максимальное кол-во символов - 100'
      },
    ])

    .onSuccess((ev) => {
      ev.preventDefault();
    })

} catch (e) {
}