<script setup lang="ts">
import { ref } from 'vue';
import AnimalCard from '../components/AnimalCard.vue';

const animals = ref([
  {
    id: 1,
    name: "Löwe",
    image: "/images/lion.jpg",
    habitat: "Afrikanische Savanne",
    fact: "Löwen können bis zu 8 km weit brüllen!",
    sound: "/sounds/lion.mp3"
  },
  {
    id: 2,
    name: "Elefant",
    image: "/images/elephant.jpg",
    habitat: "Afrikanische Savanne und Wälder",
    fact: "Elefanten können nicht springen!",
    sound: "/sounds/elephant.mp3"
  },
  {
    id: 3,
    name: "Pinguin",
    image: "/images/penguin.jpg",
    habitat: "Antarktis",
    fact: "Pinguine können bis zu 20 Minuten unter Wasser bleiben!",
    sound: "/sounds/penguin.mp3"
  },
  {
    id: 4,
    name: "Giraffe",
    image: "/images/giraffe.jpg",
    habitat: "Afrikanische Savanne",
    fact: "Giraffen haben genau so viele Halswirbel wie Menschen: sieben!",
    sound: "/sounds/giraffe.mp3"
  }
]);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl md:text-4xl font-bold text-primary-color mb-8 text-center">
      Entdecke die Tiere! 🦁
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimalCard 
        v-for="animal in animals" 
        :key="animal.id" 
        :animal="animal"
      />
    </div>
  </div>
</template>