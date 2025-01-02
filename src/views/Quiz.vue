<script setup lang="ts">
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';
import QuizCard from '../components/quiz/QuizCard.vue';
import { Animal, animals } from '../data/animals';
import { shuffleArray, getRandomItem } from '../utils/quiz';

const quizAnimals = ref(shuffleArray(animals).slice(0, 4));
const targetAnimal = ref(getRandomItem(quizAnimals.value));
const incorrectAttempts = ref<number[]>([]);
const showCorrectAnswer = ref(false);
const correctAnimal = ref<Animal | null>(null);

// Wrong answer sound
const wrongSound = new Audio('/sounds/wrong.mp3');
let currentAudio: HTMLAudioElement | null = null;

const checkAnswer = async (animalId: number, animalSound: string) => {
  if (incorrectAttempts.value.includes(animalId)) return; // Prevent clicking on wrong answers

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Zurück zum Anfang
  }

  if (animalId === targetAnimal.value.id) {
    correctAnimal.value = targetAnimal.value;
    showCorrectAnswer.value = true;

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const speech = new SpeechSynthesisUtterance(`${targetAnimal.value.artikel} ${targetAnimal.value.name}`);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);

    // Play correct sound
    currentAudio = new Audio(animalSound);

    try {
      await currentAudio.play();
    } catch (error) {
      console.error('Could not play audio:', error);
    }

    // Reset after animation
    setTimeout(() => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null; // Reset current audio
      }
      newQuiz();
    }, 3000);

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
    <!-- <div class="absolute top-4 left-0 right-0 text-center">
      <a href="/">
        <h2 class="text-xl md:text-2xl font-bold text-primary-color">
          Wo ist {{ targetAnimal.artikel }} {{ targetAnimal.name }}?
        </h2>
      </a>
    </div> -->

    <!-- Correct Answer Overlay -->
    <div v-if="showCorrectAnswer && correctAnimal"
      class="fixed inset-0 flex flex-col items-center justify-center bg-background-color/90 z-50">
      <div class="transform scale-150 mb-8">
        <div class="text-[100px] animate-bounce">
          {{ correctAnimal.icon }}
        </div>
      </div>
      <h2 class="text-4xl font-bold text-primary-color">
        {{ correctAnimal.artikel }} {{ correctAnimal.name }}
      </h2>
    </div>

    <!-- Quiz Grid -->
    <div class="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
      <QuizCard v-for="animal in quizAnimals" :key="animal.id" :animal="animal" :is-correct="isCorrect(animal.id)"
        @select="checkAnswer(animal.id, animal.sound)" />
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