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
                value: 3,
            },
            {
                rule: 'maxLength',
                value: 20,
            },
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Обязательное поле'
            },
            {
                rule: 'password',
            },
        ])

        .onSuccess((ev) => {
            ev.preventDefault();
        })
        .onFail((fields) => {
            authError.style.display = 'block'
        });
} catch (e) {}
