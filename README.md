# Weather

A weather app with 4 day forecast using React.js, HTML, CSS

Weather Update App
Overview
Welcome to the Weather Update App! This application allows you to check the current weather and a 4-day forecast for a specific city or your current location. It's a simple and user-friendly tool to stay informed about the weather conditions.
￼
Features

- Search by City: Enter the name of a city to get the current weather and forecast.
- Location Detection: Click the "My Location" button to automatically fetch weather data based on your current location.
- Temperature Units: Toggle between Celsius and Fahrenheit units for temperature display.
- Background Images: The app dynamically changes the background image based on the weather condition, creating a visually appealing experience.
  Getting Started
  To run the Weather Update App locally:
-     	Clone this repository.
-     	Install the required dependencies using npm install.
-     	Create a .env file in the project root and add your OpenWeatherMap API key as follows:makefileCopy codeREACT_APP_apiKey=YOUR_API_KEY_HERE
-     	Start the app with npm start.
  Background Images
  The app displays background images based on weather conditions. You can customize the images by modifying the getBackgroundImage function in the App.js file. For example, you can add more cases to display different images for various weather conditions.
  Attribution
- Weather data is provided by OpenWeatherMap.
- Background images are sourced from Unsplash.
  Contributing
  Contributions are welcome! Feel free to open an issue or submit a pull request.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
