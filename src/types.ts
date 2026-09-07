export interface ScooterColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ScooterSpec {
  range: number; // in km
  topSpeed: number; // in km/h
  acceleration: string; // 0-40 km/h
  batteryCapacity: string; // e.g., '3.4 kWh'
  batteryType: string;
  motorPower: string; // e.g., '4.4 kW' or '5.5 kW'
  chargingTime: string; // e.g., '4.5 hrs (0-80%)'
  fastCharging: string; // e.g., '50 km in 15 mins'
  bootSpace: string; // e.g., '34 Litres'
  weight: string; // e.g., '108 kg'
  warranty: string; // e.g., '3 Years / 50,000 km'
  gradeability: string; // e.g., '15 degrees'
}

export interface ScooterModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  startingPrice: number;
  bookingAmount: number;
  heroImage: string;
  colors: ScooterColor[];
  specs: ScooterSpec;
  keyFeatures: string[];
  description: string;
  isPopular?: boolean;
}

export interface CartItem {
  scooter: ScooterModel;
  selectedColor: ScooterColor;
  quantity: number;
}

export interface TestRideBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  scooterModelId: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface ExperienceCenter {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  timing: string;
  type: 'Flagship Experience Center' | 'Service & Delivery Hub';
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  model: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Battery & Charging' | 'Performance & Riding' | 'Booking & Delivery' | 'Warranty & Service';
  question: string;
  answer: string;
}
