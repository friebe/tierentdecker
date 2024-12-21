<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold text-primary-color mb-4">
        Willkommen bei Tierentdecker! 🦁
      </h1>
      <p class="text-xl md:text-2xl text-gray-600">
        Entdecke die spannende Welt der Tiere!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div @click="router.push('/tiere')" 
           class="card cursor-pointer bg-white hover:bg-gray-50">
        <h2 class="text-2xl font-bold mb-2">🐘 Tierkarten</h2>
        <p>Lerne verschiedene Tiere und ihre Geräusche kennen!</p>
      </div>

      <div @click="router.push('/spiel')" 
           class="card cursor-pointer bg-white hover:bg-gray-50">
        <h2 class="text-2xl font-bold mb-2">🎮 Tierspiel</h2>
        <p>Spiele lustige Spiele mit den Tieren!</p>
      </div>

      <div @click="router.push('/quiz')" 
           class="card cursor-pointer bg-white hover:bg-gray-50">
        <h2 class="text-2xl font-bold mb-2">❓ Tierquiz</h2>
        <p>Teste dein Wissen über die Tierwelt!</p>
      </div>
    </div>
  </div>
</template>