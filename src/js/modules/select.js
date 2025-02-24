import Choices from "choices.js";

export const selectChoice = (item, selectArray) => {
    if (item) {
        new Choices(item, {
            searchEnabled: false,
            position: 'bottom',
            placeholder: true,
            allowHTML: true,
            choices: selectArray
        })
    }

}
