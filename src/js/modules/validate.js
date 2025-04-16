import JustValidate from 'just-validate';

export const validate = (form) => {

  return new JustValidate(form, {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      fontSize: '13px',
      color: '#F56C6C',
    },
    errorContainer: null,
    successFieldCssClass: 'is-valid',
    successLabelStyle: {
      fontSize: '13px',
      color: '#95d475',

    },
    // validateBeforeSubmitting: true,
    focusInvalidField: true,
    lockForm: true,
  })
}
