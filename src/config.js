export default {
  api: {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    endpointCurrent: "weather",
    endpointForecast: "forecast",
    defaultParams: {
      appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
      units: 'metric',
    },
  },
  cities: new Map([
    [658225, "Helsinki"],
    [655195, "Jyväskylä"],
    [650225, "Kuopio"],
    [634964, "Tampere"],
  ]),
  forecastsPerCity: 5,
  cacheTTLInMs: 10*60*1000,  // OWM recommends a 10-minute cache
}