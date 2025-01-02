<script setup lang="ts">
import AnimalCard from '../components/AnimalCard.vue';
import { animals } from '../data/animals.ts';

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl md:text-4xl font-bold text-primary-color mb-8 text-center">
      Entdecke die Tiere! 🦁
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimalCard v-for="animal in animals" :key="animal.id" :animal="animal" />
    </div>
  </div>
</template>
