import {Calendar} from "vanilla-calendar-pro";
import 'vanilla-calendar-pro/styles/index.css';

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
  locale: 'ru',
  selectionDatesMode: 'multiple-ranged',
  onChangeToInput(self, event) {
    console.log(self.context)
    input.value = self.context.selectedDates.toString().replace(/,/, ' / ')
  },

};

if (input) {
  const calendar = new Calendar('#calendar', options);
  calendar.init()
}




