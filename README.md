# weather-report-test

### Requirements
* [NodeJS](https://nodejs.org/)
* An API key for [OpenWeatherMap](https://openweathermap.org/)

### Setup
```
npm install
```
#### Configuration
The OpenWeatherMap API key should be set to the environment variable `VUE_APP_OPENWEATHERMAP_API_KEY`.

One way of doing so would be to create a new file called `.env.local` in the root of the project and defining it there. For an example, see the [`.env`](.env) file.

### Run a development server
```
npm run serve
```

### Compile for production
```
npm run build
```

### Notes
Some possible improvements that you would find in a more exhaustive "real-world" product have been omitted, e.g. build strategies that improve support for older browsers by providing JavaScript polyfills for `fetch` and so forth.
