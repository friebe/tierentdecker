<script setup lang="ts">
import { ref } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const incorrectAttempts = ref<number[]>([]);

const speakQuestion = (artikel: string, name: string) => {
  const speech = new SpeechSynthesisUtterance(`Wo ist ${artikel} ${name}?`);
  speech.lang = 'de-DE';
  window.speechSynthesis.speak(speech);
}

const checkAnswer = (animalId: number) => {
  if (animalId === targetAnimal.value.id) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(newQuiz, 1500);
  } else {
    incorrectAttempts.value.push(animalId);
  }
};

const newQuiz = () => {
  quizAnimals.value = shuffleArray(animals).slice(0, 4);
  targetAnimal.value = getRandomItem(quizAnimals.value);
  incorrectAttempts.value = [];

  speakQuestion(targetAnimal.value.artikel, targetAnimal.value.name)
};

const isCorrect = (animalId: number) => {
  if (incorrectAttempts.value.includes(animalId)) return false;
  return null;
};
</script>

<template>
  <div class="fixed inset-0 bg-background-color flex flex-col items-center justify-center p-4">
    <div class="text-center mb-4">
      <h1 class="text-3xl md:text-4xl font-bold text-primary-color">
        Wo ist {{ targetAnimal.artikel }} {{ targetAnimal.name }}?
      </h1>
    </div>

    <div class="w-full h-[70vh] max-w-5xl mx-auto">
      <div class="grid grid-cols-2 gap-4 h-full">
        <QuizCard v-for="animal in quizAnimals" :key="animal.id" :animal="animal" :is-correct="isCorrect(animal.id)"
          @select="checkAnswer(animal.id)" />
      </div>
    </div>
  </div>
</template>