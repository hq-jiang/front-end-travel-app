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
  .then((imageUrl) => {
    console.log('Received image resource', imageUrl);
    console.log('Received image resource', imageUrl.imageUrl);
    const resultImageDiv = document.getElementById('result-image');
    resultImageDiv.innerHTML = `<img src="${imageUrl.imageUrl}" height="auto" width="100%">`;
  })
  .catch((error) => {
    console.log(error);
  });
}


function getDate() {
  // TODO;
}


export {
  submitInputData,
  getDate,
};
