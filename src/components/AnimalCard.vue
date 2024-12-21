<script setup lang="ts">
interface Animal {
  id: number;
  name: string;
  image: string;
  habitat: string;
  fact: string;
  sound: string;
}

defineProps<{
  animal: Animal;
}>();

const playSound = (soundUrl: string) => {
  const audio = new Audio(soundUrl);
  audio.play();
};
</script>

<template>
  <div class="card">
    <img :src="animal.image" :alt="animal.name" class="w-full h-48 object-cover rounded-xl mb-4">
    <h2 class="text-2xl font-bold text-primary-color mb-2">{{ animal.name }}</h2>
    <p class="text-lg mb-2"><strong>Lebensraum:</strong> {{ animal.habitat }}</p>
    <p class="text-lg mb-4"><strong>Wusstest du?</strong> {{ animal.fact }}</p>
    <button 
      @click="playSound(animal.sound)"
      class="animal-sound-btn w-full flex items-center justify-center gap-2"
    >
      <span>🔊</span> Tiergeräusch abspielen
    </button>
  </div>
</template>