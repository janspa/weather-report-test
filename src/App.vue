<template>
  <div id="app">
    <header class="border-bottom h2 py-3">
      <span>Säätutka</span>
    </header>
    <div id="content" class="p-3">
      <select class="rounded d-block w-100 py-3">
        <option value="*">
          Kaikki kaupungit
        </option>
        <option
          v-for="[id, city] of cityOptions"
          :key="`city-${id}`"
          :value="id"
        >
          {{ city }}
        </option>
      </select>

      <CityContainer
        v-if="tampere.name"
        :current="tampere"
        :forecast="[]"
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
      tampere: {}
    }
  },
  mounted() {
    WeatherService.fetchCurrentWeatherById(WeatherService.TAMPERE_ID)
      .then(json => {
        this.tampere = json
        console.log(json)
      })
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
