<script setup lang="ts">
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const incorrectAttempts = ref<number[]>([]);
const showCorrectAnswer = ref(false);
const correctAnimal = ref<typeof animals[0] | null>(null);

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
    correctAnimal.value = targetAnimal.value;
    showCorrectAnswer.value = true;

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
  showCorrectAnswer.value = false;
  correctAnimal.value = null;
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
    <!-- Correct Answer Overlay -->
    <div v-if="showCorrectAnswer && correctAnimal"
      class="fixed inset-0 flex flex-col items-center justify-center bg-background-color/90 z-50">
      <div class="transform scale-150 mb-8">
        <div class="text-[200px] animate-bounce">
          {{ correctAnimal.icon }}
        </div>
      </div>
      <h2 class="text-4xl font-bold text-primary-color">
        der {{ correctAnimal.name }}
      </h2>
    </div>

    <!-- Quiz Grid -->
    <div class="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
      <QuizCard v-for="animal in quizAnimals" :key="animal.id" :animal="animal" :is-correct="isCorrect(animal.id)"
        @select="checkAnswer(animal.id)" />
    </div>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>