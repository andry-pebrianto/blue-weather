<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteNavigationVue from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#435585]">
    <SiteNavigationVue />
    <RouterView />
  </div>
</template>
