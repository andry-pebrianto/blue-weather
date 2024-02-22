<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${
        route.query.lat
      }&lon=${route.query.lng}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }&units=imperial`
    );

    // calculate current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // calculate hourly weather offset
    weatherData.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);
</script>

<template>
  <div></div>
</template>
