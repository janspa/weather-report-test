<template>
  <div class="city-container">
    <div class="weather-container border rounded py-4 px-4">
      <div class="weather-top-row row">
        <div class="col">
          <div class="city-name h3">
            {{ weather.cityName }}
          </div>
          <div class="muted">
            {{ weather.description }}
          </div>
        </div>
        <img
          class="weather-icon col-auto"
          :src="weather.iconUrl"
          :alt="weather.description"
        >
        <div class="weather-temp h1 col-auto">
          {{ weather.temperature }}
        </div>
      </div>
      <div class="weather-bottom-row row mt-5">
        <div class="col">
          <div class="h4">
            {{ weather.date }}
          </div>
          <div class="muted">
            {{ weather.time }}
          </div>
        </div>
        <div class="col-auto muted text-right">
          <div>Wind: {{ weather.windSpeed }}</div>
          <div>Humidity: {{ weather.humidity }}</div>
          <div>Precipitation (3 h): {{ weather.precipitation }}</div>
        </div>
      </div>
    </div>
    <div class="forecast-container my-3 row">
      <ForecastCard
        v-for="(item, index) of forecasts"
        :key="`forecast-${weather.id}-${index}`"
        :forecast="item"
        :class="['col', (index > 0 ? 'ml-2' : '')].join(' ')"
      />
    </div>
  </div>
</template>

<script>
import ForecastCard from '@/components/ForecastCard'

export default {
  name: "CityContainer",
  components: { ForecastCard },
  props: {
    weather: Object,
    forecasts: Array,
  },
}
</script>

<style scoped>
  .weather-container {
    background-color: #ffffff;
  }
  .weather-top-row {
    align-items: center;
    /* the icons have lots of empty space, so set a defined row height rather than rely on the icons for the margins */
    height: 40pt;
  }
  .weather-icon {
    /* would use this if the icons were more tightly cropped */
    /* max-height: 100%; */
    flex-shrink: 1;
  }
  .weather-bottom-row {
    align-items: end;
  }
</style>