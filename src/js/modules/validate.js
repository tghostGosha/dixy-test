import JustValidate from 'just-validate';

export const validate = (form)=> {

    return new JustValidate(form, {
        errorFieldCssClass: 'is-invalid',
        errorLabelStyle: {
            fontSize: '13px',
            color: '#F56C6C',
        },

        successFieldCssClass: 'is-valid',
        successLabelStyle: {
            fontSize: '13px',
            color: '#95d475',

        },

        focusInvalidField: true,
        lockForm: true,
    })
}
