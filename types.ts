
export interface Festival {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  dates: { start: string; end: string };
  heroImage: string;
  summary: string;
  zones: Zone[];
  schedule: FestivalEvent[];
  safety: SafetySummary;
  i18nKeys?: string[];
  tags: string[];
}

export interface Zone {
  id: string;
  name: "Cultural" | "Food" | "Ritual" | "Kids";
  color: string;
  bounds: [number, number][]; // Simplified from GeoJSON for this mock
  crowdDensity?: 'low' | 'medium' | 'high';
}

export interface FestivalEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  zoneId: string;
  description: string;
}

export interface SafetySummary {
  toilets: number;
  waterPoints: number;
  firstAidStations: number;
  womenSafeCorridors: boolean;
}

export interface Experience {
  id: string;
  festivalId: string;
  title: string;
  priceINR: number;
  durationMins: number;
  maxGroupSize: number;
  languages: string[];
  includes: string[];
  excludes: string[];
  meetPoint: MapPOI;
  hostId: string;
  media: string[];
  rating: number;
  ratingCount: number;
  safetyBadges: string[];
  slots: { start: string; seats: number }[];
  description: string;
  tags: string[];
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  bio: string;
  languages: string[];
  rating: number;
  totalReviews: number;
}

export interface MapPOI {
  id: string;
  type: "toilet" | "water" | "stage" | "help" | "meet" | "firstaid";
  name: string;
  coord: [number, number];
  zoneId?: string;
  description?: string;
}

export interface Review {
  id: string;
  experienceId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  items: { 
    experienceId: string; 
    slot: string; 
    qty: number;
    price: number;
    title: string;
  }[];
  totalINR: number;
  status: "paid" | "refunded";
  qrCodePng: string; // Typically a data URL or path
  orderDate: string;
}

export interface CartItem {
  experience: Experience;
  slot: string;
  qty: number;
}

export interface StoryTrail {
  id: string;
  festivalId: string;
  title: string;
  steps: StoryStep[];
}

export interface StoryStep {
  id: string;
  title: string;
  image: string;
  audioUrl: string; // Placeholder for audio file
  transcript: string;
}

export interface LiveEvent {
    id: string;
    festivalId: string;
    title: string;
    coord: [number, number];
    description: string;
}