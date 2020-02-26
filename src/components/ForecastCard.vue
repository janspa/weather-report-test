<template>
  <div class="card text-center row">
    <div class="card-body col-auto border-top border-left border-right rounded">
      <div class="muted px-2 pt-3">
        {{ forecast.time }}
      </div>
      <div>
        <img :src="forecast.iconUrl" class="mw-100">
      </div>
      <div class="h4 pb-3">
        {{ forecast.temperature }}
      </div>
    </div>
    <div class="card-footer col border rounded muted small px-2 py-3">
      <div>{{ forecast.windSpeed }}</div>
      <div>{{ forecast.humidity }}</div>
      <div>{{ forecast.precipitation }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForecastCard",
  props: {
    forecast: Object
  }
}
</script>

<style scoped>
.card {
  flex-direction: column;
}
.card-body {
  background-color: #ffffff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card-footer {
  background-color: #e5f6fd;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>