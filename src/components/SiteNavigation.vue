<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(false);
const toggleModal = () => (modalActive.value = !modalActive.value);
</script>

<template>
  <header class="sticky top-0 bg-[#596FB7] shadow-lg">
    <nav
      class="flex flex-col sm:flex-row items-center gap-4 text-white py-6 px-5 md:px-10"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <v-icon name="fa-sun" scale="2" />
          <p class="text-xl">Blue Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <v-icon
          @click="toggleModal"
          name="bi-info-circle-fill"
          class="cursor-pointer hover:scale-150 duration-200"
          scale="1.4"
        />
      </div>

      <BaseModal @toggle="toggleModal" :modal-active="modalActive">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
          </ol>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
