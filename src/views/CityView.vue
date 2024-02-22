<script setup lang="ts">
import AsyncCityView from "@/components/AsyncCityView.vue";
</script>

<template>
  <main>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <h1 class="text-center mt-10 text-white text-2xl">Loading...</h1>
      </template>
    </Suspense>
  </main>
</template>
