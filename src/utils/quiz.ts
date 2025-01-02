import { Ref } from 'vue';

export function shuffleArray<T>(array: Ref<T[]>): T[] {
  if (array.value.length <= 1) return array.value; // Keine Notwendigkeit zu mischen
  const newArray = [...array.value]; // Kopie des Arrays
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Elemente vertauschen
  }
  return newArray;
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}