export const categories = ['Gardener', 'Explorer', 'Builder', 'Entertainer']

export const specialtiesByCategory = {
  Gardener: ['Flower Care', 'Tree Planting', 'Landscaping'],
  Explorer: ['Bug Hunting', 'Fossil Finding', 'Fishing'],
  Builder: ['Furniture Design', 'Home Design', 'Island Construction'],
  Entertainer: ['Music', 'Fashion', 'Art'],
}

export const personalities = [
  'Normal',
  'Peppy',
  'Lazy',
  'Jock',
  'Snooty',
  'Cranky',
  'Smug',
]

export const categoryIcons = {
  Gardener: '🌿',
  Explorer: '🐚',
  Builder: '🏡',
  Entertainer: '🎵',
}

export const personalityEmojis = {
  Normal: '🌼',
  Peppy: '💖',
  Lazy: '🍰',
  Jock: '💪',
  Snooty: '💅',
  Cranky: '☕',
  Smug: '✨',
}

// These are starter profile illustrations, not official game artwork.
// Replace image_url values with image URLs you have permission to use.
export const starterVillagers = [
  {
    id: 'demo-rosie',
    name: 'Rosie',
    category: 'Entertainer',
    specialty: 'Music',
    personality: 'Peppy',
    favorite_activity: 'Singing by the beach',
    favorite_phrase: "To the president of the Rosie Fan club!",
    image_url: '',
    created_at: '2026-10-01T12:00:00.000Z',
    demo: true,
    emoji: '🐱',
    color: 'pink',
  },
  {
    id: 'demo-julian',
    name: 'Julian',
    category: 'Entertainer',
    specialty: 'Fashion',
    personality: 'Smug',
    favorite_activity: 'Watching the sunset',
    favorite_phrase: "I feel like we need more dancing happening now. Shoom! OK, that's a little better.",
    image_url: '',
    created_at: '2026-09-28T12:00:00.000Z',
    demo: true,
    emoji: '🦄',
    color: 'blue',
  },
  {
    id: 'demo-tom-nook',
    name: 'Tom Nook',
    category: 'Builder',
    specialty: 'Island Construction',
    personality: 'Normal',
    favorite_activity: 'Planning island improvements',
    favorite_phrase: "I'll be there with Bells on! Ho ho!",
    image_url: '',
    created_at: '2026-09-24T12:00:00.000Z',
    demo: true,
    emoji: '🦝',
    color: 'sand',
  },
  {
    id: 'demo-isabelle',
    name: 'Isabelle',
    category: 'Gardener',
    specialty: 'Flower Care',
    personality: 'Normal',
    favorite_activity: 'Watering the flowers',
    favorite_phrase: 'Have a lovely day!',
    image_url: '',
    created_at: '2026-09-20T12:00:00.000Z',
    demo: true,
    emoji: '🐶',
    color: 'mint',
  },
]
