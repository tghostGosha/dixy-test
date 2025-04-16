import {getSectorsByArea} from "../axios/sectors";

export const checkDataRules = (sectorSelect, areaSelect, textarea) => {
  let firstSelectEdited = false;
  let secondSelectEdited = false;

  if (textarea.value !== '') {
    return [textarea.disabled = false, sectorSelect.disabled = true, areaSelect.disabled = true]

  }else if (textarea.value.trim() === "") {
    areaSelect.addEventListener('change', async function () {
      firstSelectEdited = true;
      areaSelect.disabled = false;
      textarea.disabled = true;
      for (let i = sectorSelect.options.length - 1; i >= 0; i--) {
        if (i !== 0) { // Skip the first option
          sectorSelect.remove(i);
        }
      }

      const sectors = await getSectorsByArea(areaSelect.value)

      sectors.data.forEach(function (v) {
        let option = document.createElement("option");
        option.value = v.id;
        option.innerHTML = v.name;
        sectorSelect.appendChild(option);

      })

      sectorSelect.disabled = false;
    });

    sectorSelect.addEventListener('change', function () {
      secondSelectEdited = true;
      if (firstSelectEdited && secondSelectEdited) {
        textarea.disabled = false;
      }
    });
  }
  return [ areaSelect.disabled = false,
    textarea.disabled = true]

}