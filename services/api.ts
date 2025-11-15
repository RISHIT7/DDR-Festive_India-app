import { Festival, Experience, Host, MapPOI, Review, StoryTrail, Zone, LiveEvent } from '../types';

// MOCK DATA
export const MOCK_HOSTS: Host[] = [
  { id: 'host-1', name: 'Rohan Sharma', avatar: 'https://picsum.photos/seed/rohan-sharma/200/200', verified: true, bio: 'A passionate historian and storyteller from Kolkata, guiding through the city\'s heritage for 10 years.', languages: ['English', 'Bengali', 'Hindi'], rating: 4.9, totalReviews: 124 },
  { id: 'host-2', name: 'Priya Patel', avatar: 'https://picsum.photos/seed/priya-patel/200/200', verified: true, bio: 'An art student specializing in traditional crafts. I love sharing the intricate details of festival artistry.', languages: ['English', 'Gujarati'], rating: 4.8, totalReviews: 88 },
  { id: 'host-3', name: 'Sanjay Singh', avatar: 'https://picsum.photos/seed/sanjay-singh/200/200', verified: false, bio: 'Local guide from Prayagraj, with deep knowledge of the Kumbh Mela rituals.', languages: ['Hindi', 'English'], rating: 4.7, totalReviews: 210 },
  { id: 'host-4', name: 'Anjali Verma', avatar: 'https://picsum.photos/seed/anjali-verma/200/200', verified: true, bio: 'A Vrindavan local and a devotee of Krishna, sharing the playful spirit of Holi for over 15 years.', languages: ['Hindi', 'Brajbhasha', 'English'], rating: 4.9, totalReviews: 312 },
  { id: 'host-5', name: 'Vikram Singh Rathore', avatar: 'https://picsum.photos/seed/vikram-rathore/200/200', verified: true, bio: 'Professional photographer specializing in festival and cultural photography. Let me help you capture the magic.', languages: ['English', 'Hindi'], rating: 5.0, totalReviews: 95 },
  { id: 'host-6', name: 'Aarti Mishra', avatar: 'https://picsum.photos/seed/aarti-mishra/200/200', verified: true, bio: 'Varanasi-born guide with deep connections to the ghats and the spiritual traditions of Diwali.', languages: ['Hindi', 'English', 'French'], rating: 4.8, totalReviews: 180 },
];

export const MOCK_POIS: MapPOI[] = [
  { id: 'poi-1', type: 'toilet', name: 'Clean Toilet Block A', coord: [88.357, 22.535], zoneId: 'zone-1' },
  { id: 'poi-2', type: 'water', name: 'Filtered Water Station 1', coord: [88.358, 22.536], zoneId: 'zone-1' },
  { id: 'poi-3', type: 'firstaid', name: 'First Aid Post', coord: [88.359, 22.534], zoneId: 'zone-2' },
  { id: 'poi-4', type: 'help', name: 'Help Desk', coord: [88.357, 22.533], zoneId: 'zone-1' },
];

export const MOCK_LIVE_EVENTS: LiveEvent[] = [
    { id: 'live-1', festivalId: 'durga-puja-kolkata-2025', title: 'Flash Mob Dance', coord: [88.3585, 22.5345], description: 'A surprise dance performance is happening now!' },
    { id: 'live-2', festivalId: 'durga-puja-kolkata-2025', title: 'Dhunuchi Naach', coord: [88.3575, 22.5335], description: 'Traditional incense burner dance competition in progress.' },
    { id: 'live-3', festivalId: 'diwali-varanasi-2025', title: 'Special Ganga Aarti', coord: [83.01, 25.30], description: 'A grander aarti ceremony is now live at Dashashwamedh Ghat.' },
];

export const MOCK_EXPERIENCES: Experience[] = [
  // Durga Puja
  {
    id: 'exp-1', festivalId: 'durga-puja-kolkata-2025', title: 'Kumartuli Idol-Making Workshop', priceINR: 1200, durationMins: 90, maxGroupSize: 8, languages: ['English', 'Bengali'],
    includes: ['Clay & tools', 'Artisan guide', 'Chai'], excludes: ['Transportation'], meetPoint: {id: 'meet-1', type:'meet', name: 'Kumartuli Ghat', coord: [88.372, 22.597]}, hostId: 'host-1',
    media: ['https://picsum.photos/seed/kumartuli-workshop-1/800/600', 'https://picsum.photos/seed/kumartuli-workshop-2/800/600'], rating: 4.9, ratingCount: 82,
    safetyBadges: ['Certified Safe', 'Crowd-safe Route'], slots: [{ start: '2025-10-10T10:00:00', seats: 8 }, { start: '2025-10-10T14:00:00', seats: 5 }],
    description: 'Get your hands dirty and learn the ancient art of idol making from master artisans in Kumartuli, the potters\' quarter of Kolkata.',
    tags: ['Art', 'Cultural', 'Hands-on'],
  },
  {
    id: 'exp-2', festivalId: 'durga-puja-kolkata-2025', title: 'Pandals of South Kolkata Tour', priceINR: 800, durationMins: 120, maxGroupSize: 15, languages: ['English', 'Hindi'],
    includes: ['Guided tour', 'Entry passes'], excludes: ['Food'], meetPoint: {id: 'meet-2', type:'meet', name: 'Rashbehari Crossing', coord: [88.350, 22.512]}, hostId: 'host-1',
    media: ['https://picsum.photos/seed/pandal-hopping-1/800/600', 'https://picsum.photos/seed/pandal-hopping-2/800/600'], rating: 4.8, ratingCount: 150,
    safetyBadges: ['Women-safe Corridor'], slots: [{ start: '2025-10-10T18:00:00', seats: 10 }, { start: '2025-10-10T21:00:00', seats: 3 }],
    description: 'Witness the spectacle of light and art in the famous theme-based pandals of South Kolkata. A visual treat you won\'t forget.',
    tags: ['Tour', 'Spiritual', 'Nightlife'],
  },
  {
    id: 'exp-7', festivalId: 'durga-puja-kolkata-2025', title: 'Bengali Festival Feast', priceINR: 1800, durationMins: 150, maxGroupSize: 10, languages: ['English', 'Bengali'],
    includes: ['Multi-course meal', 'Chef interaction', 'Cultural context'], excludes: ['Alcoholic beverages'], meetPoint: {id: 'meet-7', type:'meet', name: 'Ballygunge Place Restaurant', coord: [88.36, 22.52]}, hostId: 'host-1',
    media: ['https://picsum.photos/seed/bengali-feast/800/600'], rating: 4.9, ratingCount: 95,
    safetyBadges: ['Hygiene Certified'], slots: [{ start: '2025-10-11T13:00:00', seats: 10 }, { start: '2025-10-12T20:00:00', seats: 8 }],
    description: 'Indulge in an authentic multi-course Bengali meal, from Luchi and Kosha Mangsho to Mishti Doi, and learn the stories behind each dish.',
    tags: ['Foodie', 'Cultural', 'Luxury'],
  },
  // Dussehra
  {
    id: 'exp-3', festivalId: 'dwarka-dussehra-2025', title: 'Behind the Scenes of Ramleela', priceINR: 750, durationMins: 60, maxGroupSize: 10, languages: ['Hindi', 'English'],
    includes: ['Backstage access', 'Meet the actors'], excludes: [], meetPoint: {id: 'meet-3', type:'meet', name: 'Dwarka Sector 10 Ramleela Ground Gate', coord: [77.055, 28.577]}, hostId: 'host-2',
    media: ['https://picsum.photos/seed/ramleela-backstage/800/600'], rating: 4.7, ratingCount: 45, safetyBadges: ['Certified Safe'],
    slots: [{ start: '2025-10-12T17:00:00', seats: 10 }],
    description: 'Get an exclusive look at the preparations, makeup, and costumes of a traditional Ramleela performance.',
    tags: ['Cultural', 'Performance', 'Family-friendly'],
  },
  // Kumbh Mela
  {
    id: 'exp-4', festivalId: 'kumbh-prayagraj-2025', title: 'Sacred Dip with a Sadhu', priceINR: 2000, durationMins: 180, maxGroupSize: 4, languages: ['English', 'Hindi'],
    includes: ['Spiritual guidance', 'Puja items', 'Safe passage to ghat'], excludes: ['Donations'], meetPoint: {id: 'meet-4', type:'meet', name: 'Triveni Sangam Boat Point', coord: [81.89, 25.45]}, hostId: 'host-3',
    media: ['https://picsum.photos/seed/kumbh-mela-dip/800/600'], rating: 4.9, ratingCount: 205, safetyBadges: ['Certified Safe', 'Crowd-safe Route'],
    slots: [{ start: '2025-01-15T04:00:00', seats: 4 }, { start: '2025-01-26T04:00:00', seats: 2 }],
    description: 'Experience the spiritual core of the Kumbh Mela. A local Sadhu will guide you through the rituals of the holy dip at the Sangam.',
    tags: ['Spiritual', 'Ritual', 'Adventure'],
  },
  // Holi
  {
    id: 'exp-5', festivalId: 'holi-vrindavan-2026', title: 'Lathmar Holi Photo Tour', priceINR: 2500, durationMins: 180, maxGroupSize: 6, languages: ['English', 'Hindi'],
    includes: ['Professional photography guide', 'Safety briefing', 'Protective gear for camera'], excludes: ['Camera equipment'], meetPoint: {id: 'meet-5', type:'meet', name: 'Banke Bihari Temple Gate 2', coord: [77.69, 27.58]}, hostId: 'host-5',
    media: ['https://picsum.photos/seed/lathmar-holi/800/600'], rating: 5.0, ratingCount: 78,
    safetyBadges: ['Expert Guide', 'Crowd-safe Route'], slots: [{ start: '2026-03-18T10:00:00', seats: 6 }],
    description: 'Capture the unique and boisterous Lathmar Holi in Barsana, where women playfully beat men with sticks. A dream for photographers.',
    tags: ['Adventure', 'Photography', 'Cultural'],
  },
  {
    id: 'exp-6', festivalId: 'holi-vrindavan-2026', title: 'Natural Color Making Workshop', priceINR: 1500, durationMins: 120, maxGroupSize: 10, languages: ['English', 'Hindi'],
    includes: ['All materials (flowers, herbs)', 'Guidance from experts', 'Take-home colors'], excludes: [], meetPoint: {id: 'meet-6', type:'meet', name: 'Friends of Vrindavan Ashram', coord: [77.70, 27.57]}, hostId: 'host-4',
    media: ['https://picsum.photos/seed/holi-color-making/800/600'], rating: 4.9, ratingCount: 110,
    safetyBadges: ['Certified Safe', 'Family-friendly'], slots: [{ start: '2026-03-22T14:00:00', seats: 10 }],
    description: 'Learn to make your own safe, fragrant, and eco-friendly Holi colors (gulal) from flowers, herbs, and spices.',
    tags: ['Art', 'Hands-on', 'Eco-friendly', 'Family-friendly'],
  },
  // Diwali
  {
    id: 'exp-8', festivalId: 'diwali-varanasi-2025', title: 'Sunrise Ganga Boat Ride & Aarti', priceINR: 1500, durationMins: 120, maxGroupSize: 8, languages: ['English', 'Hindi', 'French'],
    includes: ['Private boat', 'Local guide', 'Morning tea'], excludes: ['Tips'], meetPoint: {id: 'meet-8', type:'meet', name: 'Assi Ghat', coord: [83.00, 25.28]}, hostId: 'host-6',
    media: ['https://picsum.photos/seed/diwali-ganga-boat-ride/800/600'], rating: 4.9, ratingCount: 250,
    safetyBadges: ['Certified Safe'], slots: [{ start: '2025-11-01T05:30:00', seats: 8 }],
    description: 'Witness the magical Dev Deepawali sunrise from a boat on the Ganges, as thousands of diyas light up the ancient ghats.',
    tags: ['Spiritual', 'Photography', 'Tour'],
  },
  {
    id: 'exp-9', festivalId: 'diwali-varanasi-2025', title: 'Varanasi Old City Food Walk', priceINR: 1200, durationMins: 150, maxGroupSize: 6, languages: ['English', 'Hindi'],
    includes: ['8+ food tastings', 'Expert food guide'], excludes: ['Transportation'], meetPoint: {id: 'meet-9', type:'meet', name: 'Godowlia Crossing', coord: [82.99, 25.31]}, hostId: 'host-6',
    media: ['https://picsum.photos/seed/varanasi-food-walk/800/600'], rating: 4.8, ratingCount: 130,
    safetyBadges: ['Hygiene Certified'], slots: [{ start: '2025-11-01T17:00:00', seats: 6 }],
    description: 'Explore the labyrinthine lanes of Varanasi and savor its iconic street food, from crispy kachoris to creamy lassi and delectable sweets.',
    tags: ['Foodie', 'Cultural', 'Tour'],
  },
];

export const MOCK_FESTIVALS: Festival[] = [
  {
    id: 'fest-1', slug: 'durga-puja-kolkata-2025', name: 'Durga Puja 2025', city: 'Kolkata', state: 'West Bengal',
    dates: { start: '2025-10-09', end: '2025-10-13' }, heroImage: 'https://picsum.photos/seed/durga-puja/1200/800',
    summary: 'Experience the grandeur of Durga Puja in the City of Joy. A vibrant celebration of art, culture, and devotion.',
    zones: [
      { id: 'zone-1', name: 'Cultural', color: '#3B82F6', bounds: [[88.357, 22.535], [88.359, 22.535], [88.359, 22.533], [88.357, 22.533]], crowdDensity: 'medium' },
      { id: 'zone-2', name: 'Food', color: '#EF4444', bounds: [[88.359, 22.534], [88.361, 22.534], [88.361, 22.532], [88.359, 22.532]], crowdDensity: 'high' },
    ],
    schedule: [
      { id: 'sch-1', title: 'Inauguration Ceremony', start: '2025-10-09T18:00:00', end: '2025-10-09T19:00:00', zoneId: 'zone-1', description: 'Official start of the festivities.' },
      { id: 'sch-2', title: 'Cultural Dance Performance', start: '2025-10-10T20:00:00', end: '2025-10-10T22:00:00', zoneId: 'zone-1', description: 'Traditional Bengali folk dances.' },
    ],
    safety: { toilets: 20, waterPoints: 15, firstAidStations: 5, womenSafeCorridors: true },
    tags: ['Cultural', 'Art', 'Foodie', 'Spiritual'],
  },
  {
    id: 'fest-4', slug: 'holi-vrindavan-2026', name: 'Holi in Vrindavan 2026', city: 'Vrindavan', state: 'Uttar Pradesh',
    dates: { start: '2026-03-18', end: '2026-03-24' }, heroImage: 'https://picsum.photos/seed/holi/1200/800',
    summary: 'The most spirited and colorful celebration of Holi in the land of Lord Krishna. An unforgettable week of joy and devotion.',
    zones: [], schedule: [], safety: { toilets: 50, waterPoints: 30, firstAidStations: 10, womenSafeCorridors: true },
    tags: ['Adventure', 'Spiritual', 'Photography', 'Cultural'],
  },
  {
    id: 'fest-5', slug: 'diwali-varanasi-2025', name: 'Dev Deepawali 2025', city: 'Varanasi', state: 'Uttar Pradesh',
    dates: { start: '2025-10-31', end: '2025-11-02' }, heroImage: 'https://picsum.photos/seed/diwali/1200/800',
    summary: 'Known as the "Diwali of the Gods," witness millions of earthen lamps (diyas) illuminate the sacred ghats of Varanasi.',
    zones: [], schedule: [], safety: { toilets: 100, waterPoints: 80, firstAidStations: 20, womenSafeCorridors: true },
    tags: ['Spiritual', 'Photography', 'Cultural', 'Ritual'],
  },
  {
    id: 'fest-2', slug: 'kumbh-prayagraj-2025', name: 'Maha Kumbh Mela 2025', city: 'Prayagraj', state: 'Uttar Pradesh',
    dates: { start: '2025-01-13', end: '2025-02-26' }, heroImage: 'https://picsum.photos/seed/kumbh-mela/1200/800',
    summary: 'The largest peaceful gathering in the world. Witness a spectacle of faith on the banks of the Triveni Sangam.',
    zones: [], schedule: [], safety: { toilets: 1000, waterPoints: 500, firstAidStations: 100, womenSafeCorridors: true },
    tags: ['Spiritual', 'Adventure', 'Ritual'],
  },
  {
    id: 'fest-3', slug: 'dwarka-dussehra-2025', name: 'Dwarka Dussehra 2025', city: 'New Delhi', state: 'Delhi',
    dates: { start: '2025-10-10', end: '2025-10-12' }, heroImage: 'https://picsum.photos/seed/dussehra/1200/800',
    summary: 'Witness the epic tale of Ramayana come to life with towering effigies of Ravana, Kumbhkaran, and Meghnad.',
    zones: [], schedule: [], safety: { toilets: 10, waterPoints: 8, firstAidStations: 2, womenSafeCorridors: false },
    tags: ['Family-friendly', 'Performance', 'Cultural'],
  }
];

export const MOCK_REVIEWS: Review[] = [
    {id: 'rev-1', experienceId: 'exp-1', author: 'Jane Doe', rating: 5, comment: 'Absolutely amazing! Rohan was so knowledgeable. A must-do in Kolkata.', date: '2024-10-12'},
    {id: 'rev-2', experienceId: 'exp-1', author: 'John Smith', rating: 4, comment: 'Great experience, though a bit crowded. Learned a lot.', date: '2024-10-11'},
    {id: 'rev-3', experienceId: 'exp-2', author: 'Emily White', rating: 5, comment: 'The pandals were breathtaking. Our guide made it so easy to navigate.', date: '2024-10-11'},
    {id: 'rev-4', experienceId: 'exp-5', author: 'Alex Johnson', rating: 5, comment: 'Vikram is a genius. He got us to the best spots for photos and kept us safe. The pictures are unbelievable!', date: '2025-03-20'},
    {id: 'rev-5', experienceId: 'exp-6', author: 'Maria Garcia', rating: 5, comment: 'So much fun for the whole family. My kids loved making colors from flowers. A truly special Holi memory.', date: '2025-03-23'},
    {id: 'rev-6', experienceId: 'exp-8', author: 'Kenji Tanaka', rating: 5, comment: 'Seeing the ghats light up from the boat was a spiritual experience I will never forget. Aarti was a wonderful guide.', date: '2024-11-02'},

];

export const MOCK_STORY_TRAILS: StoryTrail[] = [
    {
        id: 'story-1',
        festivalId: 'durga-puja-kolkata-2025',
        title: 'The Legend of Mahishasura',
        steps: [
            { id: 's1-1', title: 'The Rise of the Demon King', image: 'https://picsum.photos/seed/mahishasura-rise/800/600', audioUrl: '', transcript: 'In ancient times, the buffalo demon Mahishasura gained a boon of invincibility from Lord Brahma... no man or god could kill him. Drunk with power, he waged war on the heavens.'},
            { id: 's1-2', title: 'The Creation of Durga', image: 'https://picsum.photos/seed/durga-creation/800/600', audioUrl: '', transcript: 'The defeated gods combined their divine energies, creating a formidable goddess, Durga. Each god gifted her their most powerful weapons.'},
            { id: 's1-3', title: 'The Final Battle', image: 'https://picsum.photos/seed/durga-battle/800/600', audioUrl: '', transcript: 'A fierce battle raged for nine days and nine nights. On the tenth day, Durga, riding her lion, vanquished Mahishasura, restoring peace. This victory is celebrated as Durga Puja.'}
        ]
    },
    {
        id: 'story-2',
        festivalId: 'holi-vrindavan-2026',
        title: 'The Divine Romance of Radha-Krishna',
        steps: [
            { id: 's2-1', title: 'The Playful Prank', image: 'https://picsum.photos/seed/krishna-prank/800/600', audioUrl: '', transcript: 'Young Krishna, conscious of his dark blue skin, worried if the fair-skinned Radha would like him. On his mother\'s playful advice, he decided to approach Radha and color her face in any color he wanted.'},
            { id: 's2-2', title: 'A Festival of Colors', image: 'https://picsum.photos/seed/radha-krishna-holi/800/600', audioUrl: '', transcript: 'This mischievous act of coloring Radha\'s face blossomed into a tradition. The playful coloring between them and their companions, the Gopis, is remembered and celebrated as Holi, a festival of love, colors, and joy.'},
            { id: 's2-3', title: 'Lathmar Holi: A Unique Twist', image: 'https://picsum.photos/seed/lathmar-tradition/800/600', audioUrl: '', transcript: 'In Radha\'s village, Barsana, the tradition evolved. Women playfully beat the men from Krishna\'s village with sticks (lathis), who try to shield themselves, reenacting the playful chase. This unique celebration is known as Lathmar Holi.'}
        ]
    },
    {
        id: 'story-3',
        festivalId: 'diwali-varanasi-2025',
        title: 'The River of Light',
        steps: [
            { id: 's3-1', title: 'The Return of the Gods', image: 'https://picsum.photos/seed/gods-return-varanasi/800/600', audioUrl: '', transcript: 'Dev Deepawali, the "Diwali of the Gods," is celebrated on the full moon a fortnight after the main Diwali. It is believed that on this day, the gods descend to Earth to bathe in the sacred Ganges at Varanasi.'},
            { id: 's3-2', title: 'A Million Earthen Lamps', image: 'https://picsum.photos/seed/varanasi-diyas/800/600', audioUrl: '', transcript: 'To welcome the deities, the people of Varanasi decorate the ancient ghats with millions of earthen lamps, or diyas. The steps leading down to the river shimmer and glow, creating a celestial pathway.'},
            { id: 's3-3', title: 'A Spectacle of Devotion', image: 'https://picsum.photos/seed/ganga-aarti-diwali/800/600', audioUrl: '', transcript: 'The evening culminates in the grand Ganga Aarti, a meticulously choreographed ritual of fire, incense, and chants. The reflection of countless lamps on the flowing river creates an unforgettable, divine spectacle.'}
        ]
    },
    {
        id: 'story-4',
        festivalId: 'kumbh-prayagraj-2025',
        title: 'The Nectar of Immortality',
        steps: [
            { id: 's4-1', title: 'The Cosmic Churn', image: 'https://picsum.photos/seed/cosmic-churn/800/600', audioUrl: '', transcript: 'Long ago, gods and demons churned the cosmic ocean to obtain Amrit, the nectar of immortality. As the pot (Kumbh) of nectar emerged, a great struggle for its possession began.'},
            { id: 's4-2', title: 'The Divine Chase', image: 'https://picsum.photos/seed/divine-chase-amrit/800/600', audioUrl: '', transcript: 'During the chase, which lasted for twelve divine days (twelve human years), four drops of the precious nectar fell to Earth at four specific locations: Prayagraj, Haridwar, Ujjain, and Nashik.'},
            { id: 's4-3', title: 'A Sacred Pilgrimage', image: 'https://picsum.photos/seed/kumbh-pilgrimage/800/600', audioUrl: '', transcript: 'To commemorate this event, the Kumbh Mela is held at these four sites. Pilgrims believe that by bathing in the sacred rivers at these spots during the festival, they can cleanse their sins and move closer to salvation.'}
        ]
    }
];


// API SIMULATION FUNCTIONS
const simulateNetwork = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), Math.random() * 500 + 200));

export const fetchFestivals = () => simulateNetwork(MOCK_FESTIVALS);
export const fetchFestivalBySlug = (slug: string) => simulateNetwork(MOCK_FESTIVALS.find(f => f.slug === slug));

export const fetchExperiences = (festivalId?: string) => {
    let experiences = MOCK_EXPERIENCES;
    if (festivalId) {
        const festival = MOCK_FESTIVALS.find(f => f.slug === festivalId);
        if (festival) {
            experiences = MOCK_EXPERIENCES.filter(e => e.festivalId === festival.slug);
        }
    }
    return simulateNetwork(experiences);
}
export const fetchExperienceById = (id: string) => simulateNetwork(MOCK_EXPERIENCES.find(e => e.id === id));

export const fetchHostById = (id: string) => simulateNetwork(MOCK_HOSTS.find(h => h.id === id));
export const fetchReviewsByExperienceId = (id: string) => simulateNetwork(MOCK_REVIEWS.filter(r => r.experienceId === id));
export const fetchPoisByFestivalSlug = (slug: string) => simulateNetwork(MOCK_POIS); // Simplified for demo
export const fetchStoryTrailByFestivalSlug = (slug: string) => simulateNetwork(MOCK_STORY_TRAILS.find(st => st.festivalId === slug));

// Mock function to simulate live data updates
export const fetchLiveFestivalData = (slug: string) => {
    const festival = MOCK_FESTIVALS.find(f => f.slug === slug);
    if (!festival) return simulateNetwork({ zones: [], events: [] });

    // Simulate crowd density changes
    const updatedZones = festival.zones.map(zone => {
        const densities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
        return { ...zone, crowdDensity: densities[Math.floor(Math.random() * densities.length)] };
    });

    // Simulate random live events popping up
    const liveEventsForFestival = MOCK_LIVE_EVENTS.filter(e => e.festivalId === slug);
    const randomLiveEvents = liveEventsForFestival.filter(() => Math.random() > 0.5);

    return simulateNetwork({ zones: updatedZones, events: randomLiveEvents });
};


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