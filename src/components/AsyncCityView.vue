<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { useRoute } from "vue-router";
import moment from "moment";

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

    return weatherData.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
};

const weatherData = await getWeatherData();

function fahrenheitToCelsius(fahrenheit: number) {
  var celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

function separateString(text: string | string[]) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase() && i !== 0) {
      result += " " + text[i];
    } else {
      result += text[i];
    }
  }
  return result;
}
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-5xl mb-8 text-center font-bold">
        {{ separateString(route.params.city) }}
      </h1>
      <p class="text-sm mb-12">
        {{ moment().format("LLLL") }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(fahrenheitToCelsius(weatherData.current.temp)) }} &deg;C
      </p>
      <div class="text-center">
        <p>
          Feels like
          {{ Math.round(fahrenheitToCelsius(weatherData.current.feels_like)) }}
          &deg;C <span class="text-3xl">|</span>{{ " " }}
          <span class="capitalize">{{
            weatherData.current.weather[0].description
          }}</span>
        </p>
        <div class="flex justify-center">
          <img
            :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
            alt="Cloud Image Status"
            class="w-[150px] h-auto"
          />
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-xl w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="text-xl mb-6 font-bold">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-auto">
          <div
            class="flex flex-col gap-4 items-center"
            v-for="(hourData, index) in weatherData.hourly"
            :key="index"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleDateString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt="Cloud Image Status"
            />
            <p class="text-xl">
              {{ Math.round(fahrenheitToCelsius(hourData.temp)) }} &deg;C
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-xl w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-xl font-bold">7 Day Forecast</h2>
        <div
          v-for="(day, index) in weatherData.daily"
          :key="index"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px]"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt="Cloud Image Status"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(fahrenheitToCelsius(day.temp.max)) }} &deg;C</p>
            <p>L: {{ Math.round(fahrenheitToCelsius(day.temp.min)) }} &deg;C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
