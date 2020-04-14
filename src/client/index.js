import './styles/style.scss';

// alert('Hello World');
const imgResource = 'https://pixabay.com/get/55e0d340485aa814f1dc84609629317e153fd7e6564c704c7d2972d4944ecc5e_640.jpg';

const resultImageDiv = document.getElementById('result-image');
resultImageDiv.innerHTML = `<img src="${imgResource}" height="auto" width="100%">`;
