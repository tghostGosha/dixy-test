import dropdown from './modules/dropdown.js';
import main from './pages/main'
import warehouse from './pages/warehouse'
import sector from './pages/sector'
import header from './pages/header'
import {validate} from './modules/validate'
// dropdown();

const authForm = document.querySelector('#auth-form')
const authError = document.querySelector('[data-error="auth"]')
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
    })
    .onFail((fields) => {
      authError.style.display = 'block'
    });
} catch (e) {
}
//========запрещать после 0 вводить другие числа======
const zero = document.querySelectorAll(".onlyZero");
zero.forEach((item) => {
  item.addEventListener("keyup", function () {
    if (this.value.startsWith('0')) {
      this.value = 0
    }
  })
});
//========разрешать только русские буквы, пробел, точку и тире===========
const onlyRus = document.querySelectorAll(".onlyRus");
onlyRus.forEach((item) => {
  item.addEventListener("keyup", function () {
    let res = /[^аА-яЯёЁ .-]/g.exec(item.value);
    item.value = item.value.replace(res, '');
  })
})