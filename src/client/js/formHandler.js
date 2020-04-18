import { getDestination, getDaysUntilTrip } from './utils';

// Props to:
// https://stackoverflow.com/questions/42118296/
// dynamically-import-images-from-a-directory-using-webpack
function importAll(r) {
  const images = {};
  r.keys().map((item) => { images[item.replace('./', '').replace('.png', '')] = r(item); return images; });
  return images;
}
const images = importAll(require.context('../images/weatherbit-icons', false, /\.(png)$/));


async function submitInputData() {
  const destination = getDestination();
  const daysUntilTrip = getDaysUntilTrip();

  const resultDateDiv = document.getElementById('result-date');
  resultDateDiv.textContent = `Days until trip: ${daysUntilTrip}`;

  const data = { destination, daysUntilTrip };

  fetch('/submit', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Get all result elements
      const resultImageDiv = document.getElementById('result-image');
      const resultWeatherDiv = document.getElementById('result-weather');

      if ('noResults' in responseData.geonames) {
        resultDateDiv.innerHTML = `<p> ${responseData.geonames.errorMsg} </p>`;
        resultImageDiv.innerHTML = '';
        resultWeatherDiv.innerHTML = '';
      } else {
        // Udpate UI with pixabay data
        if ('error' in responseData.pixabay) {
          resultImageDiv.innerHTML = `<p> ${responseData.pixabay.errorMsg} </p>`;
        } else {
          resultImageDiv.innerHTML = `
            <img src="${responseData.pixabay.pixabayImageUrl}" height="auto" width="100%">
            <figcaption>Images by pixabay</figcaption>`;
        }

        // Update UI with weatherbit data
        if ('error' in responseData.weatherbit) {
          resultWeatherDiv.innerHTML = `<p> ${responseData.weatherbit.errorMsg} </p>`;
        } else {
          resultWeatherDiv.innerHTML = `
            <p> Temperature: ${responseData.weatherbit.temp} </p>
            <p> Conditions: ${responseData.weatherbit.weather.description} </p>
            <p style="text-align: center">
              <img src=${images[responseData.weatherbit.weather.icon].default}>
            </p>
          `;
        }
      }
    })
    .catch((error) => {
      const resultImageDiv = document.getElementById('result-date');
      resultImageDiv.innerHTML = `<p> ${error} </p>`;
    });
}

export {
  submitInputData as default,
};
