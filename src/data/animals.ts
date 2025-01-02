import { ref } from 'vue'

export interface Animal {
  id: number;
  name: string;
  habitat: string;
  fact: string;
  sound: string;
  icon: string;
  artikel: string;
  image: string;
}

export const animals = ref([
  {
    id: 1,
    name: "Löwe",
    image: "/images/loewe.jpg",
    habitat: "Afrikanische Savanne",
    fact: "Löwen können bis zu 8 km weit brüllen!",
    sound: "/sounds/loewe.mp3",
    icon: "🦁",
    artikel: "der"
  },
  {
    id: 2,
    name: "Elefant",
    image: "/images/elefant.jpg",
    habitat: "Afrikanische Savanne und Wälder",
    fact: "Elefanten können nicht springen!",
    sound: "/sounds/elefant.mp3",
    icon: "🐘",
    artikel: "der"
  },
  {
    id: 3,
    name: "Affe",
    image: "/images/affe.jpg",
    habitat: "Tropische Regenwälder, Savannen und Bergregionen",
    fact: "Affen nutzen gezielt Gesichtsausdrücke wie ein Lächeln, das bei ihnen oft Unterwerfung oder Nervosität signalisiert.",
    sound: "/sounds/affe.mp3",
    icon: "🦧",
    artikel: "der"
  },
  {
    id: 4,
    name: "Giraffe",
    image: "/images/giraffe.jpg",
    habitat: "Afrikanische Savanne",
    fact: "Giraffen haben genau so viele Halswirbel wie Menschen: sieben!",
    sound: "/sounds/alligator.mp3",
    icon: "🦒",
    artikel: "die"
  }
]);