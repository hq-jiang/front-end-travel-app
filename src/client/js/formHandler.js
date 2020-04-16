function getDestination() {
  const destinationForm = document.getElementById('input-destination');
  const destination = destinationForm.value;
  const processedDestination = destination.replace(/ /g, '+');
  return processedDestination;
}


async function submitInputData() {
  const destination = getDestination();

  const data = { destination };

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
    if (responseData.valid) {
      console.log("Check if status in response data", responseData);
      const resultImageDiv = document.getElementById('result-image');
      if (responseData.pixabayError === null) {
        console.log('Received image resource', responseData.pixabayImageUrl);
        resultImageDiv.innerHTML = `<img src="${responseData.pixabayImageUrl}" height="auto" width="100%">`;
      } else {
        throw Error(`${responseData.pixabayError}`);
      }
    } else {
      throw Error(`${responseData.error}`);
    }
  })
  .catch((error) => {
    const resultImageDiv = document.getElementById('result-image');
    resultImageDiv.innerHTML = `<p> ${error} </p>`;
  });
}


function getDate() {
  // TODO;
}


export {
  submitInputData,
  getDate,
};
