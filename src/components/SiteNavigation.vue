<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="sticky top-0 bg-[#596FB7] shadow-lg">
    <nav
      class="flex flex-col sm:flex-row items-center gap-4 text-white py-6 px-5 md:px-10"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <v-icon name="fa-sun" scale="2" />
          <p class="text-xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <v-icon
          name="bi-info-circle-fill"
          class="cursor-pointer hover:scale-150 duration-200"
          scale="1.4"
        />
        <v-icon
          name="bi-plus-circle-fill"
          class="cursor-pointer hover:scale-150 duration-200"
          scale="1.4"
        />
      </div>
    </nav>
  </header>
</template>
