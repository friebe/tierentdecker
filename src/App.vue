<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-background-color">
    <Navigation />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>