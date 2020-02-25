export default class WeatherService {

  static buildURL(endpoint = '', searchParams = {}) {
    const url = new URL(endpoint, process.env.VUE_APP_OPENWEATHERMAP_BASE_URL)
    for (let i in searchParams) {
      url.searchParams.append(i, searchParams[i])
    }
    return url
  }

  static fetchCurrentWeatherById(id) {
    return fetch(this.buildURL(process.env.VUE_APP_OPENWEATHERMAP_ENDPOINT_CURRENT, {
      id: id,
      appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
      units: 'metric',
    }))
      .then(res => res.json())
  }
}

WeatherService.KUOPIO_ID = 650225
WeatherService.TAMPERE_ID = 634964
WeatherService.HELSINKI_ID = 658225
WeatherService.JYVASKYLA_ID = 655195