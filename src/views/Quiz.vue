<script setup lang="ts">
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const incorrectAttempts = ref<number[]>([]);

onMounted(() => {
  newQuiz();
});

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
    const speech = new SpeechSynthesisUtterance(`Richtig!!`);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);

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
  if (incorrectAttempts.value.includes(animalId)) {
    const speech = new SpeechSynthesisUtterance(`Leider falsch`);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);

    return false;
  }

  return null;
};
</script>

<template>
  <div class="fixed inset-0 bg-background-color">
    <div class="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
      <QuizCard v-for="animal in quizAnimals" :key="animal.id" :animal="animal" :is-correct="isCorrect(animal.id)"
        @select="checkAnswer(animal.id)" />
    </div>
  </div>
</template>