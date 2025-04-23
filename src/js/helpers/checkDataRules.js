import {getSectors} from "../axios/sectors";
import {selectChoice} from "../modules/choiceSector";
import "choices.js/public/assets/styles/choices.css";
import Choices from "choices.js";


export const checkDataRules = async (sectorSelect, areaSelect, textarea, choice) => {
  let firstSelectEdited = false;
  let secondSelectEdited = false;

  if (textarea.value !== '') {
    return [textarea.disabled = false,choice.disable(), sectorSelect.disabled = true, areaSelect.disabled = true]

  }
  if (textarea.value.trim() === "" && areaSelect.value !== '') {
    areaSelect.disabled = false;
    sectorSelect.disabled = false;
    choice.enable()
    areaSelect.addEventListener('change', async function () {

      if (choice) {
        choice.destroy()
      }

      for (let i = sectorSelect.options.length - 1; i >= 0; i--) {
        if (i !== 0) { // Skip the first option
          sectorSelect.remove(i);
        }
      }
      let data = await getSectors(areaSelect.value)

      let result = data.data.map(({id, name}) =>
        ({value: id, label: name}));
        choice = selectChoice(sectorSelect,result )


    })

    sectorSelect.addEventListener('change', function () {
      secondSelectEdited = true;
      if (firstSelectEdited && secondSelectEdited) {
        textarea.disabled = false;
      }
    });
  }
  if(sectorSelect.value !== '' ) {
    areaSelect.disabled = true;
    sectorSelect.disabled = false;

    choice.enable()
  }
return choice
  // return [areaSelect.disabled = true,
  //   textarea.disabled = true, choice]

}