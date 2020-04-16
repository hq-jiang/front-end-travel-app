var path = require('path');
const fetch = require("node-fetch");
const express = require('express');

// Read env variables
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });



if (process.env.PIXABAY_KEY == null) {
  console.log('Env variables not setup correctly, exit program');
  process.exit(1);
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
    if (imgResponse.hits.length > 0) {
      const randomId = getRandomId(imgResponse.hits.length);
      const pixabayImageUrl = imgResponse.hits[randomId].webformatURL;
      res.send({ pixabayImageUrl });
    } else {
      res.send({ error: true, errorMsg: 'Pixabay error: No hits for query' });
    }
  })
  .catch((error) => {
    console.log(error);
    return res.status(500).send({ error: true, errorMsg: 'Server error: Could not fetch data' });
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
  });

  return imgResponse;
}

function getRandomId(length) {
  return Math.floor(Math.random() * length);
}
