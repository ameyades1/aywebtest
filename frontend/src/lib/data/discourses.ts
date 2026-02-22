export interface Discourse {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

export const FEATURED_DISCOURSES: Discourse[] = [
  {
    id: '01',
    number: '01',
    category: 'Vedic Scripture',
    title: 'Decoding the Ganapati Atharvashirsha',
    description: 'Unlock the hidden wisdom of Ganesh Atharvashirsha — integrate the qualities of Ganapati into your life for clarity, wisdom, and inner strength.',
    href: 'https://learn.antaryogfoundation.in/p/decoding-ganapati-atharvashirsha',
  },
  {
    id: '02',
    number: '02',
    category: 'Dharma & Prosperity',
    title: 'Daan: Your Key to Ultimate Success and Liberation',
    description: 'Master the ancient art of giving described in sacred scriptures — reveal how conscious Daan unlocks material prosperity and spiritual liberation.',
    href: 'https://learn.antaryogfoundation.in/p/daan-donation-your-key-to-ultimate-success-and-liberation-advanced-course',
  },
  {
    id: '03',
    number: '03',
    category: 'Relationships',
    title: 'Removing Negativities in Relationships',
    description: 'A 4-step formula from the Shiv Puran to cleanse past sins, shield yourself from negativity, and build empowered, harmonious relationships.',
    href: 'https://learn.antaryogfoundation.in/p/removing-negativities-in-relationships',
  },
  {
    id: '04',
    number: '04',
    category: 'Vedic Astrology',
    title: 'Understanding Lord Shani: Friend or Enemy?',
    description: 'Decode Saturn\'s karmic influence through the rare Shani Mahatmya discourse — understand why Shani is actually your greatest spiritual teacher.',
    href: 'https://learn.antaryogfoundation.in/p/understanding-lord-shani-friend-or-enemy',
  },
]
