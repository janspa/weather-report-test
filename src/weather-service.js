import WeatherModel from '@/weather-model'

const CACHE_TTL = 10*60*1000 // OWM recommends a 10-minute cache
const FORECAST_ITEMS = 5     // limit of the forecast items

function buildURL(endpoint = '', searchParams = {}) {
  const url = new URL(endpoint, process.env.VUE_APP_OPENWEATHERMAP_BASE_URL)
  for (let i in searchParams) {
    url.searchParams.append(i, searchParams[i])
  }
  return url
}

function cacheResponse(key, data, timestamp) {
  try {
    data.timestamp = timestamp
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch(e) {
    return
  }
}

function getCachedResponse(key) {
  try {
    const data = JSON.parse(sessionStorage.getItem(key))
    return (data.timestamp + CACHE_TTL > Date.now()) ? data : null
  } catch(e) {
    return null
  }
}

export default class WeatherService {
  static fetchCurrentWeatherById(id) {
    return new Promise((resolve, reject) => {
      const cached = getCachedResponse(`current-${id}`)
      return cached ? resolve(cached) : fetch(buildURL(process.env.VUE_APP_OPENWEATHERMAP_ENDPOINT_CURRENT, {
        id: id,
        appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
        units: 'metric',
      }))
        .then(res => res.json())
        .then(json => {
          cacheResponse(`current-${id}`, json, json.dt*1000)
          return resolve(json)
        })
    })
      .then(data => new WeatherModel(data))
  }

  static fetchForecastById(id) {
    return new Promise((resolve, reject) => {
      const cached = getCachedResponse(`forecast-${id}`)
      return cached ? resolve(cached.list) : fetch(buildURL(process.env.VUE_APP_OPENWEATHERMAP_ENDPOINT_FORECAST, {
        id: id,
        appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
        units: 'metric',
      }))
        .then(res => res.json())
        .then(json => {
          json.list = json.list.slice(0, FORECAST_ITEMS)
          cacheResponse(`forecast-${id}`, json, Date.now())
          return resolve(json.list)
        })
    })
      .then(list => list.map(data => new WeatherModel(data)))
  }
}

WeatherService.KUOPIO_ID = 650225
WeatherService.TAMPERE_ID = 634964
WeatherService.HELSINKI_ID = 658225
WeatherService.JYVASKYLA_ID = 655195