<template>
  <div id="app">
    <header class="border-bottom h2 py-3">
      <span>Säätutka</span>
    </header>
    <div id="content" class="p-3">
      <select
        v-model="selectedCityOption"
        class="rounded d-block w-100 py-3"
      >
        <option value="*">
          Kaikki kaupungit
        </option>
        <option
          v-for="[id, city] of cityOptions"
          :key="`city-option-${id}`"
          :value="id"
        >
          {{ city }}
        </option>
      </select>

      <div v-if="error" class="my-3">
        Säätietojen lataus epäonnistui.
      </div>
      <CityContainer
        v-for="[id, city] of weatherMap"
        v-else
        :key="`city-container-${id}`"
        :weather="city.weather"
        :forecasts="city.forecasts"
        class="my-3"
      />
    </div>
  </div>
</template>

<script>
import CityContainer from './components/CityContainer'
import WeatherService from '@/weather-service'

export default {
  name: 'App',
  components: {
    CityContainer
  },
  data() {
    return {
      cityOptions: new Map([
        [WeatherService.HELSINKI_ID, "Helsinki"],
        [WeatherService.JYVASKYLA_ID, "Jyväskylä"],
        [WeatherService.KUOPIO_ID, "Kuopio"],
        [WeatherService.TAMPERE_ID, "Tampere"],
      ]),
      weatherMap: new Map(),
      error: null,
      selectedCityOption: '*',
    }
  },
  watch: {
    selectedCityOption: function(value) {
      this.error = null
      this.fetchWeatherData()
    },
  },
  methods: {
    fetchWeatherData() {
      const cities = this.selectedCityOption === '*' ? Array.from(this.cityOptions.keys()) : [parseInt(value)]
      Promise.all(cities.map(id => {
        return WeatherService.fetchCurrentWeatherById(id)
          .then(weather => {
            return WeatherService.fetchForecastById(id)
              .then(forecasts => {
                // ensure correct city name
                // (mainly for fixing "Jyvaskyla")
                weather.cityName = this.cityOptions.get(id)
                return [id, { weather, forecasts }]
              })
          })
      }))
        .then(values => {
          this.weatherMap = new Map(values)
        })
        .catch(err => {
          console.error(err)
          this.error = err
        })
    },
  },
  mounted() {
    // fetch initial update
    this.fetchWeatherData()
  }
}
</script>

<style>
  #app > header {
    background-color: #ffffff;
    text-align: center;
  }
  #app > header > h1 {
    margin: 0;
    padding: 0.5em;
  }
  #content {
    max-width: 900px;
    margin: auto;
  }
</style>
