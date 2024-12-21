<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="bg-primary-color text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">🦁 Tierentdecker</router-link>
      
      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-3xl">
        ☰
      </button>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-6">
        <router-link to="/" class="nav-link">🏠 Start</router-link>
        <router-link to="/tiere" class="nav-link">🐘 Tiere</router-link>
        <router-link to="/spiel" class="nav-link">🎮 Spiel</router-link>
        <router-link to="/quiz" class="nav-link">❓ Quiz</router-link>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" 
           class="absolute top-16 left-0 right-0 bg-primary-color md:hidden">
        <div class="flex flex-col p-4 space-y-4">
          <router-link @click="toggleMenu" to="/" class="nav-link">🏠 Start</router-link>
          <router-link @click="toggleMenu" to="/tiere" class="nav-link">🐘 Tiere</router-link>
          <router-link @click="toggleMenu" to="/spiel" class="nav-link">🎮 Spiel</router-link>
          <router-link @click="toggleMenu" to="/quiz" class="nav-link">❓ Quiz</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply text-xl font-semibold hover:text-secondary-color transition-colors duration-200;
}
</style>