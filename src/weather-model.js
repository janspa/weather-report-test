import {format as dateFnsFormat} from "date-fns"

export default class WeatherModel {
  constructor(data) {
    if (!Array.isArray(data.weather) || data.weather.length === 0 || !data.main) {
      // naive data sanity check
      console.log(data)
      throw new Error("Incorrect weather data")
    }
    this._data = data
  }

  get cityName() {
    return this._data.name
  }
  set cityName(name) {
    this._data.name = name
  }
  get description() {
    const desc = this._data.weather[0].description
    return desc.slice(0, 1).toUpperCase() + desc.slice(1)
  }
  get temperature() {
    return `${Math.round(this._data.main.temp)} °C`
  }
  get date() {
    return dateFnsFormat(new Date(this._data.dt*1000), 'LLL do')
  }
  get time() {
    return dateFnsFormat(new Date(this._data.dt*1000), 'HH:mm')
  }
  get iconUrl() {
    return `http://openweathermap.org/img/wn/${this._data.weather[0].icon}@2x.png`
  }
  get windSpeed() {
    return `${Math.round(this._data.wind.speed)} m/s`
  }
  get humidity() {
    return `${Math.round(this._data.main.humidity)} %`
  }
  get precipitation() {
    if (this._data.rain) return `${Math.round(this._data.rain['3h'])} mm`
    if (this._data.snow) return `${Math.round(this._data.snow['3h'])} mm`
    return `0 mm`
  }
}