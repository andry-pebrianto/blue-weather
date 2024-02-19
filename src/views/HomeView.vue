<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios, { AxiosError } from "axios";

const router = useRouter();

const mapboxApiKey =
  "pk.eyJ1IjoibmlsYWJpcnUiLCJhIjoiY2xzc3JuMWhtMXB0ZTJxbXB5cXd4aDl0aCJ9.LTmkXHL7mu769Tqevu1S3Q";
const searchQuery = ref<string>("");
const queryTimeout = ref<null | number>(null);
const mapboxSearchResults = ref<any>(null);
const searchError = ref<boolean>(false);
const searchErrorMessage = ref<string>("");

const getSearchResults = () => {
  clearTimeout(queryTimeout.value || undefined);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch (error) {
        searchError.value = true;

        if (error instanceof AxiosError) {
          searchErrorMessage.value = error.message;
        }
      }

      return;
    }

    mapboxSearchResults.value = null;
  }, 300);
};

const previewCity = (searchResult: any) => {
  const [city, state] = searchResult.place_name.split(",");

  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ", ""),
      city: city.replaceAll(" ", ""),
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: 1, // 1 = true, 0 = false
    },
  });
};
</script>

<template>
  <main
    class="container text-white sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
  >
    <div class="pt-4 mb-8 relative mx-4">
      <div class="flex items-center gap-3">
        <v-icon animation="float" name="md-locationcity" scale="2.5" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a city or state"
          class="py-2 px-1 w-full bg-transparent outline-none border-b focus:border-[#596FB7] duration-200"
          @input="getSearchResults"
        />
        <ul
          v-if="mapboxSearchResults"
          class="absolute bg-[#718be3] text-white w-full shadow-md py-2 px-1 top-[66px] mt-3 rounded-sm"
        >
          <li
            v-if="mapboxSearchResults ? mapboxSearchResults.length : false"
            v-for="(searchResult, index) in mapboxSearchResults"
            :key="index"
            class="py-2 px-5 mb-1 cursor-pointer hover:bg-[#566fc0]"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
          <li v-else-if="mapboxSearchResults !== null" class="py-2 px-5 mb-1">
            No results match your query, try a different term.
          </li>
        </ul>
      </div>
      <p v-if="searchError" class="mt-3 text-center text-red-400">
        {{ searchErrorMessage }}
      </p>
    </div>
  </main>
</template>
