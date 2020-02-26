<template>
  <div id="app">
    <header class="border-bottom h2 py-3 text-center">
      <span>Säätutka</span>
    </header>
    <div id="content" class="py-3 px-2 mx-auto">
      <div class="px-2">
        <select
          v-model="selectedCityOption"
          class="city-select rounded d-block w-100 mx-auto py-3"
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
      </div>

      <div class="row w-100" style="flex-wrap: wrap">
        <div v-if="error" class="my-3">
          Säätietojen lataus epäonnistui.
        </div>
        <CityContainer
          v-for="[id, city] of weatherMap"
          v-else
          :key="`city-container-${id}`"
          :weather="city.weather"
          :forecasts="city.forecasts"
          class="col my-3 mx-auto px-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CityContainer from './components/CityContainer'
import WeatherService from '@/services/weather-service'
import config from '@/config'

export default {
  name: 'App',
  components: {
    CityContainer
  },
  data() {
    return {
      cityOptions: config.cities,
      weatherMap: new Map(),
      error: null,
      selectedCityOption: '*',
    }
  },
  watch: {
    selectedCityOption: function(option) {
      this.error = null
      this.fetchWeatherData(option)
    },
  },
  mounted() {
    this.fetchWeatherData(this.selectedCityOption)
  },
  methods: {
    fetchWeatherData(option) {
      const cities = option === '*' ? Array.from(this.cityOptions.keys()) : [ parseInt(option) ]
      Promise.all(cities.map(id => {
        return WeatherService.fetchCurrentWeatherById(id)
          .then(weather => {
            return WeatherService.fetchForecastById(id)
              .then(forecasts => {
                // ensure correct city name
                // (mainly for fixing "Jyvaskyla" from the api)
                weather.cityName = this.cityOptions.get(id)
                return [id, { weather, forecasts }]
              })
          })
      }))
        .then(values => {
          this.weatherMap = new Map(values)
        })
        .catch(err => {
          //console.error(err)
          this.error = err
        })
    },
  },
}
</script>

<style>
  #app > header {
    background-color: #ffffff;
  }
  .city-select {
    max-width: 768px;
  }
  .city-container {
    flex-basis: 100% !important;
  }
  /* basic demonstration for a possible tablet/desktop size layout */
  @media only screen and (min-width: 992px) {
    .city-container {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }
</style>
