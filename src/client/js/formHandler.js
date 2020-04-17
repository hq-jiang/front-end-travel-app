function setCalendarMinDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;
  const inputDateElem = document.getElementById('input-date');
  inputDateElem.setAttribute('min', today);
  inputDateElem.value = today;
}

function getDestination() {
  const destinationForm = document.getElementById('input-destination');
  const destination = destinationForm.value;
  const processedDestination = destination.replace(/ /g, '+');
  return processedDestination;
}

function getDaysUntilTrip() {
  const dateForm = document.getElementById('input-date');
  const tripDate = new Date(dateForm.value);
  const today = new Date();
  const tripDateClip = Date.UTC(tripDate.getFullYear(), tripDate.getMonth(), tripDate.getDate());
  const todayClip = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((tripDateClip - todayClip) / (1000 * 60 * 60 * 24));
}

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
          resultImageDiv.innerHTML = `<img src="${responseData.pixabay.pixabayImageUrl}" height="auto" width="100%">`;
        }

        // Update UI with weatherbit data
        if ('error' in responseData.weatherbit) {
          resultWeatherDiv.innerHTML = `<p> ${responseData.weatherbit.errorMsg} </p>`;
        } else {
          resultWeatherDiv.innerHTML = `
            <p> Temperature: ${responseData.weatherbit.temp} </p>
            <p> Conditions: ${responseData.weatherbit.weather.description} </p>
          `;
        }
      }
    })
    .catch((error) => {
      const resultImageDiv = document.getElementById('result-date');
      resultImageDiv.innerHTML = `<p> ${error} </p>`;
    });
}


function getDate() {
  // TODO;
}


export {
  setCalendarMinDate,
  submitInputData,
  getDate,
};
