<template>
  <div class="city-container">
    <div class="current-container border rounded py-4 px-3">
      <div class="row" style="align-items: center; height: 32pt">
        <div class="col">
          <div class="city-name h3">{{ current.name }}</div>
          <div class="muted">{{ currentDescription }}</div>
        </div>
        <img
          class="current-icon col-auto"
          :src="weatherIconUrl(current.weather[0].icon)"
          :alt="currentDescription"
        >
        <div class="current-temp h1 col-auto">
          {{ formatTemp(current.main.temp) }}
        </div>
      </div>
      <div class="row mt-5" style="align-items: end">
        <div class="col">
          <div class="h4">{{ formatDate((current.dt)*1000) }}</div>
          <div class="muted">{{ formatTime((current.dt)*1000) }}</div>
        </div>
        <div class="col-auto muted" style="text-align: right">
          <div>Wind: {{ current.wind.speed }} m/s</div>
          <div>Humidity: {{ current.main.humidity }} %</div>
          <div v-if="current.rain">Precipitation (3 h): {{ current.rain['rain.3h'] }} mm</div>
          <div v-else-if="current.snow">Precipitation (3 h): {{ current.snow['snow.3h'] }} mm</div>
          <div v-else>Precipitation (3 h): 0 mm</div>
        </div>
      </div>
    </div>
    <div class="forecast-container">

    </div>
  </div>
</template>

<script>
import { format as dateFnsFormat } from 'date-fns'

export default {
  name: "CityContainer",
  props: {
    current: Object,
    forecast: Array,
  },
  computed: {
    currentDescription: function() {
      try {
        const desc = this.current.weather[0].description
        return desc.slice(0, 1).toUpperCase() + desc.slice(1)
      } catch (e)  {
        return ''
      }
    }
  },
  methods: {
    formatTemp: function(temp) {
      return `${Math.round(temp)} °C`
    },
    formatDate: function(time) {
      return dateFnsFormat(new Date(time), 'LLL do')
    },
    formatTime: function(time) {
      return dateFnsFormat(new Date(time), 'HH:mm')
    },
    weatherIconUrl: function(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`
    }
  }
}
</script>

<style scoped>
  .current-container {
    background-color: #ffffff;
  }
  .current-icon {
    /*max-height: 100%;*/
  }
  .row {
    display: flex;
  }
  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
  .col-auto {
    flex: 0 0 auto;
    width: auto;
  }
</style>