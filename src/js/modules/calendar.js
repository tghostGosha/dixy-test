import {Calendar} from "vanilla-calendar-pro";
import 'vanilla-calendar-pro/styles/index.css';
import {searchDate} from "../helpers/search";

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
    searchDate(self.context.inputElement.value)
  },

};

if (input) {
  const calendar = new Calendar('#calendar', options);
  calendar.init()
}




