var path = require('path');
const express = require('express');

// Read env variables
// const dotenv = require('dotenv');
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
//
// if (process.env.API_ID == null || process.env.API_KEY == null) {
//   console.log("Env variables not setup correctly, exit program");
//   process.exit(1);
// }
// var textapi = new aylien({
//   application_id: process.env.API_ID,
//   application_key: process.env.API_KEY
// });


const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../../dist')));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname,'../../dist/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port http://localhost:8000!');
})
