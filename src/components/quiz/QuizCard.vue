<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Animal } from '../../data/animals';

defineProps<{
  animal: Animal;
  isCorrect: boolean | null;
}>();

defineEmits<{
  (e: 'select'): void;
}>();
</script>

<template>
  <button @click="$emit('select')" class="quiz-card relative" :class="{
    'border-red-500 bg-red-100': isCorrect === false
  }">
    <div class="text-[15vh]">{{ animal.icon }}</div>

    <!-- Wrong Answer Overlay -->
    <div v-if="isCorrect === false" class="absolute inset-0 flex items-center justify-center bg-white/80">
      <span class="text-[15vh]">❌</span>
    </div>
  </button>
</template>

<style scoped>
.quiz-card {
  @apply w-full h-full flex items-center justify-center rounded-xl border-4 border-gray-200 bg-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl;
}
</style>