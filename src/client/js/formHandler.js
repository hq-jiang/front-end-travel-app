function getDestination() {
  const destinationForm = document.getElementById('input-destination');
  const destination = destinationForm.value;
  const processedDestination = destination.replace(/ /g, '+');
  return processedDestination;
}

function getDaysUntilTrip() {
  const dateForm = document.getElementById('input-date');
  const tripDate = Date.parse(dateForm.value);
  const today = new Date();
  console.log('trip day', tripDate);
  console.log('today', today);
  return Math.floor((tripDate - today) / (1000 * 60 * 60 * 24));
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
    console.log(responseData);
    if ('error' in responseData) {
      throw Error(`${responseData.errorMsg}`);
    } else {
      console.log("Check if status in response data", responseData);
      const resultImageDiv = document.getElementById('result-image');
      console.log('Received image resource', responseData.pixabayImageUrl);
      resultImageDiv.innerHTML = `<img src="${responseData.pixabayImageUrl}" height="auto" width="100%">`;
    }
  })
  .catch((error) => {
    const resultImageDiv = document.getElementById('result-image');
    resultImageDiv.innerHTML = `<p> ${error.message} </p>`;
  });
}


function getDate() {
  // TODO;
}


export {
  submitInputData,
  getDate,
};
