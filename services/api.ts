
import { Festival, Experience, Host, MapPOI, Review, StoryTrail } from '../types';

// MOCK DATA
export const MOCK_HOSTS: Host[] = [
  { id: 'host-1', name: 'Rohan Sharma', avatar: 'https://i.pravatar.cc/150?u=host1', verified: true, bio: 'A passionate historian and storyteller from Kolkata, guiding through the city\'s heritage for 10 years.', languages: ['English', 'Bengali', 'Hindi'], rating: 4.9, totalReviews: 124 },
  { id: 'host-2', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=host2', verified: true, bio: 'An art student specializing in traditional crafts. I love sharing the intricate details of festival artistry.', languages: ['English', 'Gujarati'], rating: 4.8, totalReviews: 88 },
  { id: 'host-3', name: 'Sanjay Singh', avatar: 'https://i.pravatar.cc/150?u=host3', verified: false, bio: 'Local guide from Prayagraj, with deep knowledge of the Kumbh Mela rituals.', languages: ['Hindi', 'English'], rating: 4.7, totalReviews: 210 },
];

export const MOCK_POIS: MapPOI[] = [
  { id: 'poi-1', type: 'toilet', name: 'Clean Toilet Block A', coord: [88.357, 22.535], zoneId: 'zone-1' },
  { id: 'poi-2', type: 'water', name: 'Filtered Water Station 1', coord: [88.358, 22.536], zoneId: 'zone-1' },
  { id: 'poi-3', type: 'firstaid', name: 'First Aid Post', coord: [88.359, 22.534], zoneId: 'zone-2' },
  { id: 'poi-4', type: 'help', name: 'Help Desk', coord: [88.357, 22.533], zoneId: 'zone-1' },
];

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1', festivalId: 'durga-puja-kolkata-2025', title: 'Kumartuli Idol-Making Workshop', priceINR: 1200, durationMins: 90, maxGroupSize: 8, languages: ['English', 'Bengali'],
    includes: ['Clay & tools', 'Artisan guide', 'Chai'], excludes: ['Transportation'], meetPoint: {id: 'meet-1', type:'meet', name: 'Kumartuli Ghat', coord: [88.372, 22.597]}, hostId: 'host-1',
    media: ['https://picsum.photos/seed/exp1a/600/400', 'https://picsum.photos/seed/exp1b/600/400'], rating: 4.9, ratingCount: 82,
    safetyBadges: ['Certified Safe', 'Crowd-safe Route'], slots: [{ start: '2025-10-10T10:00:00', seats: 8 }, { start: '2025-10-10T14:00:00', seats: 5 }],
    description: 'Get your hands dirty and learn the ancient art of idol making from master artisans in Kumartuli, the potters\' quarter of Kolkata.',
    tags: ['Art', 'Cultural', 'Hands-on'],
  },
  {
    id: 'exp-2', festivalId: 'durga-puja-kolkata-2025', title: 'Pandals of South Kolkata Tour', priceINR: 800, durationMins: 120, maxGroupSize: 15, languages: ['English', 'Hindi'],
    includes: ['Guided tour', 'Entry passes'], excludes: ['Food'], meetPoint: {id: 'meet-2', type:'meet', name: 'Rashbehari Crossing', coord: [88.350, 22.512]}, hostId: 'host-1',
    media: ['https://picsum.photos/seed/exp2a/600/400', 'https://picsum.photos/seed/exp2b/600/400'], rating: 4.8, ratingCount: 150,
    safetyBadges: ['Women-safe Corridor'], slots: [{ start: '2025-10-10T18:00:00', seats: 10 }, { start: '2025-10-10T21:00:00', seats: 3 }],
    description: 'Witness the spectacle of light and art in the famous theme-based pandals of South Kolkata. A visual treat you won\'t forget.',
    tags: ['Tour', 'Spiritual', 'Nightlife'],
  },
  {
    id: 'exp-3', festivalId: 'dwarka-dussehra-2025', title: 'Behind the Scenes of Ramleela', priceINR: 750, durationMins: 60, maxGroupSize: 10, languages: ['Hindi', 'English'],
    includes: ['Backstage access', 'Meet the actors'], excludes: [], meetPoint: {id: 'meet-3', type:'meet', name: 'Dwarka Sector 10 Ramleela Ground Gate', coord: [77.055, 28.577]}, hostId: 'host-2',
    media: ['https://picsum.photos/seed/exp3a/600/400'], rating: 4.7, ratingCount: 45, safetyBadges: ['Certified Safe'],
    slots: [{ start: '2025-10-12T17:00:00', seats: 10 }],
    description: 'Get an exclusive look at the preparations, makeup, and costumes of a traditional Ramleela performance.',
    tags: ['Cultural', 'Performance', 'Family-friendly'],
  },
  {
    id: 'exp-4', festivalId: 'kumbh-prayagraj-2025', title: 'Sacred Dip with a Sadhu', priceINR: 2000, durationMins: 180, maxGroupSize: 4, languages: ['English', 'Hindi'],
    includes: ['Spiritual guidance', 'Puja items', 'Safe passage to ghat'], excludes: ['Donations'], meetPoint: {id: 'meet-4', type:'meet', name: 'Triveni Sangam Boat Point', coord: [81.89, 25.45]}, hostId: 'host-3',
    media: ['https://picsum.photos/seed/exp4a/600/400'], rating: 4.9, ratingCount: 205, safetyBadges: ['Certified Safe', 'Crowd-safe Route'],
    slots: [{ start: '2025-01-15T04:00:00', seats: 4 }, { start: '2025-01-26T04:00:00', seats: 2 }],
    description: 'Experience the spiritual core of the Kumbh Mela. A local Sadhu will guide you through the rituals of the holy dip at the Sangam.',
    tags: ['Spiritual', 'Ritual', 'Adventure'],
  }
];

export const MOCK_FESTIVALS: Festival[] = [
  {
    id: 'fest-1', slug: 'durga-puja-kolkata-2025', name: 'Durga Puja 2025', city: 'Kolkata', state: 'West Bengal',
    dates: { start: '2025-10-09', end: '2025-10-13' }, heroImage: 'https://picsum.photos/seed/durga/1200/500',
    summary: 'Experience the grandeur of Durga Puja in the City of Joy. A vibrant celebration of art, culture, and devotion.',
    zones: [
      { id: 'zone-1', name: 'Cultural', color: 'bg-blue-500', bounds: [[88.357, 22.535], [88.359, 22.535], [88.359, 22.533], [88.357, 22.533]] },
      { id: 'zone-2', name: 'Food', color: 'bg-red-500', bounds: [[88.359, 22.534], [88.361, 22.534], [88.361, 22.532], [88.359, 22.532]] },
    ],
    schedule: [
      { id: 'sch-1', title: 'Inauguration Ceremony', start: '2025-10-09T18:00:00', end: '2025-10-09T19:00:00', zoneId: 'zone-1', description: 'Official start of the festivities.' },
      { id: 'sch-2', title: 'Cultural Dance Performance', start: '2025-10-10T20:00:00', end: '2025-10-10T22:00:00', zoneId: 'zone-1', description: 'Traditional Bengali folk dances.' },
    ],
    safety: { toilets: 20, waterPoints: 15, firstAidStations: 5, womenSafeCorridors: true },
    tags: ['Cultural', 'Art', 'Foodie', 'Spiritual'],
  },
  {
    id: 'fest-2', slug: 'kumbh-prayagraj-2025', name: 'Maha Kumbh Mela 2025', city: 'Prayagraj', state: 'Uttar Pradesh',
    dates: { start: '2025-01-13', end: '2025-02-26' }, heroImage: 'https://picsum.photos/seed/kumbh/1200/500',
    summary: 'The largest peaceful gathering in the world. Witness a spectacle of faith on the banks of the Triveni Sangam.',
    zones: [], schedule: [], safety: { toilets: 1000, waterPoints: 500, firstAidStations: 100, womenSafeCorridors: true },
    tags: ['Spiritual', 'Adventure', 'Ritual'],
  },
  {
    id: 'fest-3', slug: 'dwarka-dussehra-2025', name: 'Dwarka Dussehra 2025', city: 'New Delhi', state: 'Delhi',
    dates: { start: '2025-10-10', end: '2025-10-12' }, heroImage: 'https://picsum.photos/seed/dussehra/1200/500',
    summary: 'Witness the epic tale of Ramayana come to life with towering effigies of Ravana, Kumbhkaran, and Meghnad.',
    zones: [], schedule: [], safety: { toilets: 10, waterPoints: 8, firstAidStations: 2, womenSafeCorridors: false },
    tags: ['Family-friendly', 'Performance', 'Cultural'],
  }
];

export const MOCK_REVIEWS: Review[] = [
    {id: 'rev-1', experienceId: 'exp-1', author: 'Jane Doe', rating: 5, comment: 'Absolutely amazing! Rohan was so knowledgeable. A must-do in Kolkata.', date: '2024-10-12'},
    {id: 'rev-2', experienceId: 'exp-1', author: 'John Smith', rating: 4, comment: 'Great experience, though a bit crowded. Learned a lot.', date: '2024-10-11'},
    {id: 'rev-3', experienceId: 'exp-2', author: 'Emily White', rating: 5, comment: 'The pandals were breathtaking. Our guide made it so easy to navigate.', date: '2024-10-11'},
];

export const MOCK_STORY_TRAILS: StoryTrail[] = [
    {
        id: 'story-1',
        festivalId: 'durga-puja-kolkata-2025',
        title: 'The Legend of Mahishasura',
        steps: [
            { id: 's1-1', title: 'The Rise of the Demon King', image: 'https://picsum.photos/seed/story1/600/400', audioUrl: '', transcript: 'In ancient times, the buffalo demon Mahishasura gained a boon of invincibility from Lord Brahma... no man or god could kill him. Drunk with power, he waged war on the heavens.'},
            { id: 's1-2', title: 'The Creation of Durga', image: 'https://picsum.photos/seed/story2/600/400', audioUrl: '', transcript: 'The defeated gods combined their divine energies, creating a formidable goddess, Durga. Each god gifted her their most powerful weapons.'},
            { id: 's1-3', title: 'The Final Battle', image: 'https://picsum.photos/seed/story3/600/400', audioUrl: '', transcript: 'A fierce battle raged for nine days and nine nights. On the tenth day, Durga, riding her lion, vanquished Mahishasura, restoring peace. This victory is celebrated as Durga Puja.'}
        ]
    }
];


// API SIMULATION FUNCTIONS
const simulateNetwork = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), Math.random() * 500 + 200));

export const fetchFestivals = () => simulateNetwork(MOCK_FESTIVALS);
export const fetchFestivalBySlug = (slug: string) => simulateNetwork(MOCK_FESTIVALS.find(f => f.slug === slug));

export const fetchExperiences = (festivalId?: string) => {
    const experiences = festivalId
        ? MOCK_EXPERIENCES.filter(e => e.festivalId === festivalId)
        : MOCK_EXPERIENCES;
    return simulateNetwork(experiences);
}
export const fetchExperienceById = (id: string) => simulateNetwork(MOCK_EXPERIENCES.find(e => e.id === id));

export const fetchHostById = (id: string) => simulateNetwork(MOCK_HOSTS.find(h => h.id === id));
export const fetchReviewsByExperienceId = (id: string) => simulateNetwork(MOCK_REVIEWS.filter(r => r.experienceId === id));
export const fetchPoisByFestivalSlug = (slug: string) => simulateNetwork(MOCK_POIS); // Simplified for demo
export const fetchStoryTrailByFestivalSlug = (slug: string) => simulateNetwork(MOCK_STORY_TRAILS.find(st => MOCK_FESTIVALS.find(f => f.slug === slug)?.id === st.festivalId));

// Mock function to "publish" a new experience
export const publishNewExperience = (exp: Omit<Experience, 'id' | 'rating' | 'ratingCount'>) => {
    const newExperience: Experience = {
        ...exp,
        id: `exp-${Date.now()}`,
        rating: 0,
        ratingCount: 0,
    };
    MOCK_EXPERIENCES.unshift(newExperience);
    return simulateNetwork(newExperience);
};
