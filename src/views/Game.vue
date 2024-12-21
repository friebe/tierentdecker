<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { animals } from '../data/animals';

const currentIndex = ref(0);
const isPlaying = ref(false);
const intervalId = ref<number | null>(null);

const playAnimal = async () => {
  if (isPlaying.value) return;

  isPlaying.value = true;
  const animal = animals[currentIndex.value];

  // Spiele den Tiernamen
  const speech = new SpeechSynthesisUtterance(animal.artikel + " " + animal.name);
  speech.lang = 'de-DE';
  window.speechSynthesis.speak(speech);

  // Spiele einen Platzhalter-Sound
  const audio = new Audio('/placeholder-sound.mp3');
  await audio.play().catch(() => console.log('Platzhalter Sound konnte nicht abgespielt werden'));

  isPlaying.value = false;
};

const nextAnimal = () => {
  if (isPlaying.value) return;
  currentIndex.value = (currentIndex.value + 1) % animals.length;
  playAnimal();
};

const startAutoPlay = () => {
  if (intervalId.value) return;
  playAnimal();
  intervalId.value = setInterval(() => {
    nextAnimal();
  }, 5000); // Wechselt alle 5 Sekunden
};

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div class="fixed inset-0 bg-background-color flex items-center justify-center">
    <div class="w-full h-full flex flex-col items-center justify-center p-4">
      <!-- Tier Name -->
      <h2 class="text-4xl md:text-6xl font-bold text-primary-color mb-8">
        {{ animals[currentIndex].artikel.charAt(0).toUpperCase() + animals[currentIndex].artikel.slice(1) }}
        {{ animals[currentIndex].name }}
      </h2>

      <!-- Tier Icon -->
      <div class="text-[180px] md:text-[200px] my-44">
        {{ animals[currentIndex].icon }}
      </div>

      <!-- Steuerung -->
      <div class="flex gap-4">
        <button @click="stopAutoPlay" class="btn bg-red-500 text-white">
          Stop
        </button>
        <button @click="startAutoPlay" class="btn bg-primary-color text-white">
          Start
        </button>
        <button @click="nextAnimal" class="btn bg-secondary-color text-white" :disabled="isPlaying">
          Weiter
        </button>
      </div>
    </div>
  </div>
</template>