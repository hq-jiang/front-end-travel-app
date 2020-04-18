# Travel App

This web app gives the user weather data and images for their desired travel destination.
Forecasts can be given up to 16 days.

This project demonstrates the usage of:
- HTML, CSS and Javascript
- Responsive web design
- Unit testing
- Webpack as build tool
- Calling several APIs asynchronously
- Usage of service workers


### Usage on Linux
You can run a local server by running the following commands. A webpage will be available at
https://localhost:8000

#### Setting up environment variables
Rename the template environmental file. The server expects an `.env` file at the root of the repo.
```
# Under linux
mv .env_template .env
```

Then fill in all keys and usernames required by the APIs (without quotes). Registration is required:
```
PIXABAY_KEY=XXXXXXXXXXXXXXXXXX
GEONAMES_USER=XXXXXXXXXXXXXXXX
WEATHERBIT_KEY=XXXXXXXXXXXXXXX
```

#### Unit tests
Run tests to check if your setup is correct and API calls are made 
```
npm run test
```

#### Build project
```
cd <project folder>
npm install
npm run start
```


## Acknowledgements

### APIs
https://geonames.org  
https://www.weatherbit.io/  
https://pixabay.com/

### Fonts
https://www.fontsquirrel.com/fonts/list/classification/pixel


### Background Image
Photo by Walid Ahmad from Pexels  
https://www.pexels.com/@walidphotoz
