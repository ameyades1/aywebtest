export interface Event {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  location: string;
  href: string;
}

export const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Navratri Celebration: Goddess Wisdom & Spiritual Protection',
    description: 'Extended festival celebration with knowledge sessions and goddess invocation practices. Join us for 11 days of sacred rituals and wisdom teachings.',
    dateRange: 'Sep 22 - Oct 2',
    location: 'Gurukul',
    href: '#',
  },
  {
    id: '2',
    title: 'Pitru-Rin Mukti Shibir: Ancestral Energy Release Intensive',
    description: '15-day intensive addressing ancestral debt through sadhana and spiritual knowledge. Transform your family lineage through sacred practices.',
    dateRange: 'Sep 7-21',
    location: 'Gurukul',
    href: '#',
  },
  {
    id: '3',
    title: 'Science of Healing: Meditation & Wellness Integration',
    description: 'Therapeutic program combining Shiva meditation with wellness assessments. Experience the science behind spiritual healing practices.',
    dateRange: 'Sep 10-11',
    location: 'Gurukul',
    href: '#',
  },
]
