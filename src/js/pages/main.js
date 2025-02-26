import dropdown from '../modules/dropdown';
import dataOpen from '../modules/modal-page';
import {selectChoice} from '../modules/select';
import {modalOpen} from "../modules/modal";
import {validate} from "../modules/validate";
import {successModal} from "../modules/success-modal";


//======Вызов Select окон====///
//=============//======Тестовые массивы- нужно передавать с бэка ====///
const testArrayAreaSelect = [
    {
        value: 'moscow', label: 'Московская область', selected: true
    },
    {
        value: 'tverskaya', label: 'Тверская область', selected: false
    },
    {
        value: 'vladimir', label: 'Владимирская область', selected: false
    },
    {
        value: 'ivanovo', label: 'Ивановская область', selected: false
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

const areaSelect = document.querySelector('#areaSelect');
const sectorSelect = document.querySelector('#sectorSelect');
selectChoice(areaSelect, testArrayAreaSelect, 'Выберите область')
selectChoice(sectorSelect, testArraySectorChoices, 'Выберите сектор доставки')


//======Валидация нового правила====///
const ruleForm = document.querySelector('#rule-form');
const modal= document.querySelector('[data-modal="modal-page"]')
const success = document.querySelector('[data-modal="success"]')
try {
    validate(ruleForm)
        .addField('#title', [
            {
                rule: 'required',
                errorMessage: 'Обязательное поле'
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'А-я, 0-9. Мин - 2 символа, Макс - 100 символов'
            },
            {
                rule: 'maxLength',
                value: 100,
                errorMessage: 'А-я, 0-9. Мин - 2 символа, Макс - 100 символов'
            },
        ])
        // .addField('#areaSelect', [
        //     {
        //         rule: 'required',
        //         errorMessage: 'Обязательное поле'
        //     },
        //     {
        //         validator: (value) => {
        //            console.log(value, 'value')
        //             return value && value.length > 0;
        //         },
        //         errorMessage: 'This field is required',
        //     }
        // ])
        // .addField('#sectorSelect', [
        //
        //     {
        //         rule: 'required',
        //         errorMessage: 'Обязательное поле'
        //     },
        //     {
        //         validator: (value) => {
        //             console.log(value, 'value')
        //             return value && value.length > 0;
        //         },
        //         errorMessage: 'This field is required',
        //     }
        //
        // ])
        .addField('#warehouseNumber', [
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
        .addField('#costDelivery', [
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
        .addField('#freeDelivery', [
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
        .addField('#minCost', [
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
            ruleForm.reset()
            modal.classList.remove('active');
            success.classList.add('active');
            setTimeout(() => {
                success.classList.remove('active');
            }, 3000)
        })
        .onFail((fields) => {

        });
} catch (e) {}

//======Закрытие модалки успешной отправки формы====///
try {
    const modalClose = document.querySelector('[data-modal="success-close"]');
    successModal(modalClose,success )
} catch (e) {

}
