import './styles/style.scss';
import submitInputData from './js/formHandler';
import { setCalendarMinDate } from './js/utils';

// Set minimum date for calendar
setCalendarMinDate();

// Listen to submit action
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitInputData);

const formElement = document.getElementById('form');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
});

formElement.addEventListener('keyup', (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submitButton.click();
  }
});
