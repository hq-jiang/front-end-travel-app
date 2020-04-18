var path = require('path');
const fetch = require("node-fetch");
const express = require('express');

// Read env variables
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });



if (process.env.PIXABAY_KEY == null || process.env.GEONAMES_USER == null) {
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
const appServer = app.listen(8000, function () {
    console.log('Example app listening on port http://localhost:8000!');
})

app.post('/submit', submitHandler);

async function submitHandler(req, res) {
  const destination = req.body.destination;
  const daysUntilTrip = req.body.daysUntilTrip;


  const pixabayPromise = getPixabayImage(destination)
  .then((imgResponse) => {
    if (imgResponse.hits.length > 0) {
      const randomId = getRandomId(imgResponse.hits.length);
      const pixabayImageUrl = imgResponse.hits[randomId].webformatURL;
      return { pixabayImageUrl };
    } else {
      return { error: true, errorMsg: 'Pixabay error: No results for query' };
    }
  })
  .catch((error) => {
    console.log(error);
    return { error: true, errorMsg: 'Pixabay error: Could not fetch data' };
  });


  const geonamesPromise = getGeonamesData(destination)
  .then((geonamesResponse) => {
    if (geonamesResponse.totalResultsCount == 0) {
      return {
        noResults: true,
        errorMsg: 'Geonames error: Place probably does not exist, no results for query'
      };
    } else {
      return {
        lat: geonamesResponse.geonames[0].lat,
        lng: geonamesResponse.geonames[0].lng,
        countryName: geonamesResponse.geonames[0].countryName,
      }
    }
  })
  .catch((error) => {
    console.log(error);
    return { error: true, errorMsg: 'Geonames error: Could not fetch data' };
  });

  const geonamesData = await geonamesPromise;

  const weatherbitPromise = getWeatherbitData(geonamesData.lat, geonamesData.lng, daysUntilTrip)
  .then((weatherbitResponse) => {
    if (daysUntilTrip < 16) {
      return {
        temp: weatherbitResponse.data[daysUntilTrip].temp,
        weather: weatherbitResponse.data[daysUntilTrip].weather,
      }
    } else {
      return {
        error: true,
        errorMsg: 'Sorry, our weather API can only make forecasts up to 16 days',
      };
    }

  })
  .catch((error) => {
    console.log(error);
    return { error: true, errorMsg: 'Weatherbit error: Could not fetch data' };
  });


  Promise.all([pixabayPromise, geonamesPromise, weatherbitPromise]).then(function(data) {
    console.log(data);
    res.send({
      pixabay: data[0],
      geonames: data[1],
      weatherbit: data[2],
    });
  });

}

async function getPixabayImage(query) {
  const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${query}`;
  const imgResponse = fetch(pixabayUrl)
  .then((response) => response.json())
  .then((data) => data);

  return imgResponse;
}

async function getGeonamesData(query) {
  const geonamesUrl = `http://api.geonames.org/searchJSON?q=${query}&maxRows=1&username=${process.env.GEONAMES_USER}`;
  const geonamesResponse = fetch(geonamesUrl)
  .then((response) => response.json())
  .then((data) => data);

  return geonamesResponse;
}

async function getWeatherbitData(lat, lng, daysUntilTrip) {
  const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily
    ?lat=${lat}&lon=${lng}&days=${daysUntilTrip + 1}&key=${process.env.WEATHERBIT_KEY}`;
  console.log(weatherbitUrl);
  const weatherbitResponse = fetch(weatherbitUrl)
  .then((response) => response.json())
  .then((data) => data);

  return weatherbitResponse;
}

function getRandomId(length) {
  return Math.floor(Math.random() * length);
}

exports.getPixabayImage = getPixabayImage;
exports.getGeonamesData = getGeonamesData;
exports.getWeatherbitData = getWeatherbitData;
// Export handle for unit test to be able to close the server
exports.appServer = appServer;
