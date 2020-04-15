var path = require('path');
const fetch = require("node-fetch");
const express = require('express');

// Read env variables
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });



if (process.env.PIXABAY_KEY == null) {
  console.log('Env variables not setup correctly, exit program');
  process.exit(1);
} else {
  console.log('Pixabay API key:', process.env.PIXABAY_KEY)
}


const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../../dist')));

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port http://localhost:8000!');
})

app.post('/submit', submitHandler);

async function submitHandler(req, res) {
  const destination = req.body.destination;
  getPixabayImage(destination)
  .then((imgResponse) => {
    const imageUrl = imgResponse.hits[0].webformatURL;
    console.log(imageUrl);
    res.send({ imageUrl });
  });
}

async function getPixabayImage(query) {
  const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${query}`;
  const imgResponse = fetch(pixabayUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    return data;
  })

  return imgResponse;
}
