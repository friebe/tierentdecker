export interface Animal {
  id: number;
  name: string;
  icon: string;
  artikel: string;
}

export const animals: Animal[] = [
  {
    id: 1,
    name: "Löwe",
    icon: "🦁",
    artikel: "der"
  },
  {
    id: 2,
    name: "Elefant",
    icon: "🐘",
    artikel: "der"
  },
  {
    id: 3,
    name: "Pinguin",
    icon: "🐧",
    artikel: "der"
  },
  {
    id: 4,
    name: "Giraffe",
    icon: "🦒",
    artikel: "die"
  }
];