import './styles/style.scss';
import { submitInputData, setCalendarMinDate } from './js/formHandler';

// Set minimum date for calendar
setCalendarMinDate();

// Listen to submit action
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitInputData);
