<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const incorrectAttempts = ref<number[]>([]);
const showCorrectAnswer = ref(false);
const correctAnimal = ref<typeof animals[0] | null>(null);

// Wrong answer sound
const wrongSound = new Audio('/sounds/wrong.mp3');

const checkAnswer = async (animalId: number) => {
  if (incorrectAttempts.value.includes(animalId)) return; // Prevent clicking on wrong answers

  if (animalId === targetAnimal.value.id) {
    correctAnimal.value = targetAnimal.value;
    showCorrectAnswer.value = true;

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Speak the animal name with article
    const speech = new SpeechSynthesisUtterance(`der ${targetAnimal.value.name}`);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);

    // Reset after animation
    setTimeout(newQuiz, 2500);
  } else {
    // Play wrong sound
    try {
      await wrongSound.play();
    } catch (error) {
      console.error('Could not play wrong sound:', error);
    }
    incorrectAttempts.value.push(animalId);
  }
};

const newQuiz = () => {
  showCorrectAnswer.value = false;
  correctAnimal.value = null;
  quizAnimals.value = shuffleArray(animals).slice(0, 4);
  targetAnimal.value = getRandomItem(quizAnimals.value);
  incorrectAttempts.value = [];

  // Ask the question
  const question = new SpeechSynthesisUtterance(`Wo ist ${targetAnimal.value.artikel} ${targetAnimal.value.name}?`);
  question.lang = 'de-DE';
  window.speechSynthesis.speak(question);
};

const isCorrect = (animalId: number) => {
  if (incorrectAttempts.value.includes(animalId)) return false;
  return null;
};

onMounted(() => {
  newQuiz();
});
</script>

<template>
  <div class="fixed inset-0 bg-background-color">
    <!-- Question Display -->
    <div class="absolute top-4 left-0 right-0 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-primary-color">
        Wo ist {{ targetAnimal.artikel }} {{ targetAnimal.name }}?
      </h2>
    </div>

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
    <div class="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 p-2 pt-16">
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