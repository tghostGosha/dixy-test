import {Calendar} from "vanilla-calendar-pro";
import 'vanilla-calendar-pro/styles/index.css';
import { paramsString} from "../helpers/search";

const input = document.querySelector('#calendar')


const options = {
  displayMonthsCount: 1,
  selectedTheme: 'light',
  dateMin: '2000-01-01',
  inputMode: true,
  positionToInput: ['bottom', 'center'],
  monthsToSwitch: 1,
  displayDatesOutside: true,
  disableDatesPast: false,
  enableEdgeDatesOnly: true,
  locale: 'ru-RU',
  selectionDatesMode: 'multiple-ranged',

  onChangeToInput(self, event) {
    let formatDate = []
    self.context.selectedDates.forEach(date => {
      formatDate.push(date.split('-').reverse().join('-'))
    })
    input.value = formatDate.toString().replace(/,/, ' / ');
    paramsString.set("date", self.context.inputElement.value);
    if (window.history.replaceState) {
      const url = window.location.protocol
        + "//" + window.location.host
        + window.location.pathname
        + "?"
        + paramsString.toString();

      window.history.replaceState({
        path: url
      }, "", url)
    }
  },


};

if (input) {
  const calendar = new Calendar('#calendar', options);
  calendar.init()
}




