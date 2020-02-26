import WeatherModel from '@/models/weather-model'
import config from '@/config'

function buildURL(endpoint = '', searchParams = {}) {
  const url = new URL(endpoint, config.api.baseUrl)
  for (let i in searchParams) {
    url.searchParams.append(i, searchParams[i])
  }
  return url
}

function cacheResponse(key, data, timestamp) {
  if ("sessionStorage" in window) {
    data.timestamp = timestamp
    sessionStorage.setItem(key, JSON.stringify(data))
  }
}

function getCachedResponse(key) {
  try {
    const data = JSON.parse(sessionStorage.getItem(key))
    return (data.timestamp + config.cacheTTLInMs > Date.now()) ? data : null
  } catch(e) {
    return null
  }
}

export default class WeatherService {
  static fetchCurrentWeatherById(id) {
    return new Promise((resolve) => {
      const cached = getCachedResponse(`current-${id}`)
      const params = Object.assign({}, config.api.defaultParams, { id })
      return cached ?
        resolve(cached) :
        fetch(buildURL(config.api.endpointCurrent, params))
          .then(res => res.json())
          .then(json => {
            cacheResponse(`current-${id}`, json, json.dt*1000)
            return resolve(json)
          })
    })
      .then(data => new WeatherModel(data))
  }

  static fetchForecastById(id) {
    return new Promise((resolve) => {
      const cached = getCachedResponse(`forecast-${id}`)
      const params = Object.assign({}, config.api.defaultParams, { id })
      return cached ?
        resolve(cached.list) :
        fetch(buildURL(config.api.endpointForecast, params))
          .then(res => res.json())
          .then(json => {
            json.list = json.list.slice(0, config.forecastsPerCity)
            cacheResponse(`forecast-${id}`, json, Date.now())
            return resolve(json.list)
          })
    })
      .then(list => list.map(data => new WeatherModel(data)))
  }
}