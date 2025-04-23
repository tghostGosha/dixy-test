// import "choices.js/public/assets/styles/choices.css";
import Choices from "choices.js";


export const selectChoice = (item, selectArray) => {
  if (item) {
    return new Choices(item, {
      searchEnabled: true,
      position: 'bottom',
      duplicateItemsAllowed: false,
      placeholder: true,
      allowHTML: true,
      choices: selectArray,

    })
  }

}