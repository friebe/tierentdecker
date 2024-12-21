<script setup lang="ts">
import { ref } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';
import { onMounted } from 'vue';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const selectedAnimal = ref<number | null>(null);
const feedback = ref<string>('');

const speakQuestion = (artikel: string, name: string) => {
  const speech = new SpeechSynthesisUtterance(`Wo ist ${artikel} ${name}?`);
  speech.lang = 'de-DE';
  window.speechSynthesis.speak(speech);
}

onMounted(() => {
  targetAnimal.value = getRandomItem(quizAnimals.value);
  document.addEventListener('click', enableSpeech, { once: true });
});

const enableSpeech = () => {
  document.removeEventListener('click', enableSpeech);
  speakQuestion(targetAnimal.value.artikel, targetAnimal.value.name);
};

const checkAnswer = (animalId: number) => {
  selectedAnimal.value = animalId;

  if (animalId === targetAnimal.value.id) {
    feedback.value = 'Super gemacht! 🎉';
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    feedback.value = 'Versuch es noch einmal! 💪';
  }

  // Nach 2 Sekunden neues Quiz starten
  setTimeout(newQuiz, 2000);
};

const newQuiz = () => {
  quizAnimals.value = shuffleArray(animals).slice(0, 4);
  targetAnimal.value = getRandomItem(quizAnimals.value);
  selectedAnimal.value = null;
  feedback.value = '';
  speakQuestion(targetAnimal.value.artikel, targetAnimal.value.name)
};

const isCorrect = (animalId: number) => {
  if (selectedAnimal.value === null) return null;
  return selectedAnimal.value === animalId;
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-primary-color mb-4">
        Wo ist {{ targetAnimal.artikel }} {{ targetAnimal.name }}?
      </h1>
      <p class="text-xl text-gray-600" v-if="feedback">
        {{ feedback }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      <QuizCard v-for="animal in quizAnimals" :key="animal.id" :animal="animal" :is-correct="isCorrect(animal.id)"
        @select="checkAnswer(animal.id)" />
    </div>
  </div>
</template>