import {getSectors} from "../axios/sectors";
import {selectChoice} from "../modules/choiceSector";
import "choices.js/public/assets/styles/choices.css";
import Choices from "choices.js";

const areaField = document.getElementById('areaField')

export const checkDataRules = (sectorSelect, areaSelect, textarea, choice) => {
  areaField.value = areaSelect.value
  if (textarea.value !== '') {
    textarea.disabled = false
    choice.disable()
    sectorSelect.disabled = true
    areaSelect.disabled = true
  } else if (areaSelect.value === '' && sectorSelect.value === '' && textarea.value === '') {
    areaSelect.disabled = false;
    sectorSelect.disabled = false;
    textarea.readonly = false;
  } else if (areaSelect.value !== '' && sectorSelect.value !== '') {
    textarea.readonly = true;
    areaSelect.disabled = false;
    sectorSelect.disabled = false;
  } else if (sectorSelect.value !== '') {
    areaSelect.disabled = true;
    sectorSelect.disabled = false;
    choice.enable()
  }

  if (choice) {
    choice.enable()
  }

  areaSelect.addEventListener('change', async function () {
    areaField.value = areaSelect.value

    if (areaSelect.value === '' && sectorSelect.value === '' && textarea.value === '') {
      areaSelect.disabled = false;
      sectorSelect.disabled = false;
      textarea.readonly = false;
    }
    if (areaSelect.value !== '') {
      textarea.readonly = true;
      textarea.classList.remove('is-invalid');
      if (textarea.nextElementSibling) {
        textarea.nextElementSibling.style.display = 'none'
      }
      sectorSelect.classList.remove('is-invalid');
      if (sectorSelect.nextElementSibling) {
        sectorSelect.nextElementSibling.style.display = 'none'
      }
    }
    if (choice) {
      choice.destroy()
      choice.init()
    }

    for (let i = sectorSelect.options.length - 1; i >= 0; i--) {
      if (i !== 0) { // Skip the first option
        sectorSelect.remove(i);
      }
    }
    let data
    if (areaSelect.value === '0' || areaSelect.value === '1' || areaSelect.value === '') {
      data = await getSectors()
    } else {
      data = await getSectors(areaSelect.value)
    }

    let defaultSector = [{value: '', label: 'Сектор доставки', selected: true}]
    let result = data.data.map(({id, name}) =>
      ({value: id, label: name}));
    const newArr = defaultSector.concat(result)
    choice.clearChoices(true, true)
    choice.setChoices(newArr)
    return choice
  })

  sectorSelect.addEventListener('change', function () {
    areaField.value = areaSelect.value

    if (sectorSelect.value !== '' && areaSelect.value !== '') {
      areaSelect.disabled = false;
      textarea.readonly = true;

    } else if (sectorSelect.value === '' || sectorSelect.label === 'Сектор доставки') {
      areaSelect.disabled = false;
    } else if (sectorSelect.value !== '' && areaSelect.value === '') {
      areaSelect.disabled = true;
      areaSelect.classList.remove('is-invalid');
      if (areaSelect.nextElementSibling) {
        areaSelect.nextElementSibling.style.display = 'none'
      }

    }
    if (sectorSelect.value !== '') {
      textarea.classList.remove('is-invalid');
      if (textarea.nextElementSibling) {
        textarea.nextElementSibling.style.display = 'none'
      }
      areaSelect.classList.remove('is-invalid');
      if (areaSelect.nextElementSibling) {
        areaSelect.nextElementSibling.style.display = 'none'
      }
    }
    return choice
  });

  textarea.addEventListener('input', () => {
    if (textarea.value !== '') {
      areaSelect.disabled = true;
      areaSelect.classList.remove('is-invalid');
      if (areaSelect.nextElementSibling) {
        areaSelect.nextElementSibling.style.display = 'none'
      }
      choice.destroy()
      if (sectorSelect.value === '' || sectorSelect.label === 'Сектор доставки') {
        sectorSelect.disabled = true;
        sectorSelect.classList.remove('is-invalid');
        if (sectorSelect.nextElementSibling) {
          sectorSelect.nextElementSibling.style.display = 'none'
        }
      }

    } else {
      choice.init()
      choice.enable()
      sectorSelect.disabled = false;
      areaSelect.disabled = false;
    }
  });

  return choice


}