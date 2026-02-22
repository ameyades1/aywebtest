export interface Program {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

export const PROGRAMS: Program[] = [
  {
    id: '1',
    number: '01',
    title: 'Discourses',
    description: 'Deep dive into Vedanta teachings and spiritual wisdom from ancient scriptures, guided by Acharya Upendra Ji\'s profound insights.',
    imageUrl: '/assets/images/founder/8bR0jsdCRK2DhCGklmBR_Guru+Brochure++page+10+Img+1.jpg',
    imageAlt: 'Vedanta Discourses',
    href: 'https://learn.antaryogfoundation.in/l/products?sortKey=recommended&sortDirection=asc&page=1',
  },
  {
    id: '2',
    number: '02',
    title: 'Naadi Jyotish',
    description: 'Ancient spiritual astrology for divine life guidance. Discover your karmic path through sacred Naadi leaf readings and consultations.',
    imageUrl: '/assets/images/founder/dyECDDLQ56nRvpzpeNNw_Guru+Brochure++page+5+Img+6.jpg',
    imageAlt: 'Naadi Jyotish - Spiritual Astrology',
    href: 'https://learn.antaryogfoundation.in/p/naadi-jyotish',
  },
  {
    id: '3',
    number: '03',
    title: 'Science of Healing',
    description: 'Discover ancient healing methodologies for holistic wellness, integrating body, mind, and spirit through time-tested practices.',
    imageUrl: '/assets/images/founder/0lY9wgWTRg6HFVVmykR4_Guru+Brochure++page+17+Img+1.jpg',
    imageAlt: 'Ancient Healing Sciences',
    href: 'https://payment.antaryogfoundation.in/soh',
  },
  {
    id: '4',
    number: '04',
    title: 'Vastu Rupantaran',
    description: 'Transform your living and working spaces through ancient Vastu principles for harmonious energy flow and prosperity.',
    imageUrl: '/assets/images/founder/GV3pzYbBSDOkZrTaWXpq_Guru+Brochure++page+20+Img+1.jpg',
    imageAlt: 'Vastu Rupantaran - Space Transformation',
    href: 'https://vasturupantaran.antaryogfoundation.in/',
  },
  {
    id: '5',
    number: '05',
    title: 'Nirjanwas',
    description: 'Journeys that heal the body, refresh the mind, and awaken the soul.',
    imageUrl: '/assets/programs/nirjanwas.jpg',
    imageAlt: 'Nirjanwas - Sacred Yatra',
    href: 'https://nirjanvas.antaryogfoundation.in/',
  },
]
