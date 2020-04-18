const server = require('./server');
const http = require('http');

test("Pixabay API request", async function () {
  const pixabayResponse = await server.getPixabayImage('tokyo');
  expect(pixabayResponse.hits.length).toBeGreaterThan(0);
})


test("Geonames API request", async function () {
  const geonamesResponse = await server.getGeonamesData('tokyo');
  expect(geonamesResponse.totalResultsCount).toBeGreaterThan(0);
})


test("Weatherbit API request", async function () {
  const daysUntilTrip = 2;
  const weatherbitResponse = await server.getWeatherbitData(30, 30, daysUntilTrip);
  expect(weatherbitResponse.data.length).toBe(daysUntilTrip + 1);
})

// Close server so jest can finish
server.appServer.close();
