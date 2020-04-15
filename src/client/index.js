import './styles/style.scss';
import { submitInputData } from './js/formHandler';

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitInputData);
