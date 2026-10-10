/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Bed,
  Utensils,
  Coffee,
  Wifi,
  Car,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Shield,
  Star,
  Menu,
  X,
  ChevronRight,
  Settings,
  Edit,
  Plus,
  Trash2,
  Info,
  Clock,
  Lock,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Check,
  Building,
  Dumbbell,
  Tv,
  Wine,
  ArrowRight
} from 'lucide-react';

// Default initial data
interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  bedType: string;
  description: string;
  image: string;
  amenities: string[];
  available: boolean;
}

interface Reservation {
  id: string;
  roomName: string;
  guestName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
  specialRequests?: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isSample: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const INITIAL_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Standard Single Room',
    price: 4500,
    capacity: 1,
    bedType: 'Single Bed',
    description: 'Cozy and quiet room designed for solo travelers seeking comfort, high-speed Wi-Fi, and work convenience.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning', 'TV', 'Desk'],
    available: true
  },
  {
    id: '2',
    name: 'Standard Double Room',
    price: 5500,
    capacity: 2,
    bedType: 'Double Bed',
    description: 'Spacious room featuring a comfortable double bed, modern en-suite bathroom, and city views.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Parking', 'Air Conditioning', 'TV', 'Room Service'],
    available: true
  },
  {
    id: '3',
    name: 'Twin Room',
    price: 6000,
    capacity: 2,
    bedType: '2 Twin Beds',
    description: 'Ideal for colleagues or friends travelling together, equipped with two comfortable twin beds and premium amenities.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Parking', 'Air Conditioning', 'TV', 'Tea/Coffee'],
    available: true
  },
  {
    id: '4',
    name: 'Deluxe King Room',
    price: 6608,
    capacity: 2,
    bedType: 'King Size Bed',
    description: 'Our signature deluxe experience with an expansive king bed, upscale seating area, and panoramic views of Addis Ababa.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['King Bed', 'Free Wi-Fi', 'Breakfast', 'Airport Transport', 'Gym Access', 'Mini Bar'],
    available: true
  },
  {
    id: '5',
    name: 'Executive Room',
    price: 7500,
    capacity: 2,
    bedType: 'King Size Bed',
    description: 'Designed for business leaders, offering extra workspace, high-end luxury linens, and complimentary executive lounge privileges.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['Executive Lounge', 'King Bed', 'Free Wi-Fi', 'Breakfast', 'Airport Pickup', 'Room Service'],
    available: true
  },
  {
    id: '6',
    name: 'Family Room',
    price: 8500,
    capacity: 4,
    bedType: '1 King & 2 Twin Beds',
    description: 'Generously proportioned multi-bed suite tailored for families looking for space, relaxation, and top-tier hospitality.',
    image: '/images/hotel_room_deluxe_1791640608938.jpg',
    amenities: ['Multi-bed Suite', 'Free Wi-Fi', 'Breakfast', 'Kitchenette corner', 'Air Conditioning', 'TV'],
    available: true
  },
  {
    id: '7',
    name: 'Jacuzzi Suite',
    price: 10000,
    capacity: 2,
    bedType: 'King Size Bed',
    description: 'Ultimate luxury featuring a private hydrotherapy jacuzzi bathtub, lavish king bedroom, and premium city views.',
    image: '/images/hotel_jacuzzi_suite_1791640636718.jpg',
    amenities: ['Private Jacuzzi', 'King Bed', 'Free Wi-Fi', 'Champagne on arrival', 'Breakfast', 'Airport Transfer'],
    available: true
  }
];

const INITIAL_FAQS: FAQ[] = [
  { id: '1', question: 'What time is check-in?', answer: 'Check-in begins at 2:00 PM. Early check-in is subject to availability.' },
  { id: '2', question: 'What time is check-out?', answer: 'Check-out time is 12:00 PM (Noon). Late check-out can be requested at the reception.' },
  { id: '3', question: 'Is breakfast included in the room rate?', answer: 'Yes, a delicious continental and traditional Ethiopian breakfast buffet is complimentary with all room bookings.' },
  { id: '4', question: 'Is airport transportation available?', answer: 'Yes! We offer complimentary or scheduled airport pickup and drop-off from Bole International Airport upon prior request.' },
  { id: '5', question: 'How can I make a reservation?', answer: 'You can book instantly online through our website, or contact us directly via WhatsApp at +251 993 821 442.' },
  { id: '6', question: 'What is the cancellation policy?', answer: 'Free cancellation up to 24 hours before your scheduled arrival date.' }
];

const INITIAL_REVIEWS: Review[] = [
  { id: '1', author: 'Sample Guest (Tadesse M.)', rating: 5, comment: 'Beautiful room, friendly staff and a very comfortable stay. The hotel was also in a convenient location near 22 Mazoria.', date: 'October 2026', isSample: true },
  { id: '2', author: 'Sample Guest (Dr. Sarah K.)', rating: 5, comment: 'The room was spacious and clean, and breakfast was excellent with authentic Ethiopian coffee. I would definitely stay again.', date: 'September 2026', isSample: true },
  { id: '3', author: 'Sample Guest (Michael B.)', rating: 5, comment: 'We really enjoyed the atmosphere, restaurant and comfortable room. Great experience in Addis Ababa!', date: 'September 2026', isSample: true }
];

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<'home' | 'rooms' | 'amenities' | 'restaurant' | 'gallery' | 'reviews' | 'location' | 'faq' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Booking Widget & Modal state
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1); // 1: Dates & Guests, 2: Guest Details, 3: Confirmation
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-17');
  const [guestCount, setGuestCount] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSuccessModal, setBookingSuccessModal] = useState<Reservation | null>(null);

  // Gallery Filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'rooms' | 'jacuzzi' | 'restaurant' | 'interiors' | 'views'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Load persisted data & scroll listener
  useEffect(() => {
    const savedRooms = localStorage.getItem('newday_rooms');
    if (savedRooms) {
      try { setRooms(JSON.parse(savedRooms)); } catch (e) { console.error(e); }
    }
    const savedRes = localStorage.getItem('newday_reservations');
    if (savedRes) {
      try { setReservations(JSON.parse(savedRes)); } catch (e) { console.error(e); }
    }

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveRooms = (updated: Room[]) => {
    setRooms(updated);
    localStorage.setItem('newday_rooms', JSON.stringify(updated));
  };

  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    localStorage.setItem('newday_reservations', JSON.stringify(updated));
  };

  // Calculate nights
  const calculateNights = (inDate: string, outDate: string) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleStartBooking = (room: Room) => {
    setSelectedRoomForBooking(room);
    setBookingStep(1);
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setSpecialRequests('');
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomForBooking) return;

    const nights = calculateNights(checkInDate, checkOutDate);
    const totalPrice = selectedRoomForBooking.price * nights;

    const newRes: Reservation = {
      id: 'NDH-' + Math.floor(100000 + Math.random() * 900000),
      roomName: selectedRoomForBooking.name,
      guestName,
      phone: guestPhone,
      email: guestEmail,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount,
      totalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      specialRequests
    };

    const updated = [newRes, ...reservations];
    saveReservations(updated);
    setSelectedRoomForBooking(null);
    setBookingSuccessModal(newRes);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1A17] font-sans antialiased selection:bg-[#2C4A3E] selection:text-white relative">
      {/* Scroll-triggered Info Banner */}
      {scrolled && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1A17]/95 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-2xl border border-white/20 text-xs flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> 22 Mazoria Djibouti Street, Addis Ababa</span>
          <span>|</span>
          <a href="tel:+251993821442" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +251 993 821 442</a>
          <span className="hidden sm:inline">· Official New Day Hotel Portal · Explore More</span>
        </div>
      )}

      {/* Header / Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE4DD] px-4 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-3 text-left group">
            <div className="w-11 h-11 rounded-lg overflow-hidden bg-white border border-[#EAE4DD] flex items-center justify-center shadow-sm">
              <img
                src="https://user19731.na.imgto.link/public/20261010/8a7ad0ac674506c38d11bba3-55209d571f93e9975a352badebb00ad6.avif"
                alt="New Day Hotel Logo"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-[#1C1A17] group-hover:text-[#2C4A3E] transition-colors">
                NEW DAY HOTEL
              </span>
              <span className="block text-[10px] tracking-widest text-[#78716C] uppercase font-medium">
                Addis Ababa · Explore More
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#57534E]">
            <button onClick={() => setActiveTab('home')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'home' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('rooms')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'rooms' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Rooms & Suites</button>
            <button onClick={() => setActiveTab('amenities')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'amenities' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Amenities</button>
            <button onClick={() => setActiveTab('restaurant')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'restaurant' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Restaurant</button>
            <button onClick={() => setActiveTab('gallery')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'gallery' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Gallery</button>
            <button onClick={() => setActiveTab('reviews')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'reviews' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Reviews</button>
            <button onClick={() => setActiveTab('location')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'location' ? 'text-[#2C4A3E] font-semibold' : ''}`}>Location</button>
            <button onClick={() => setActiveTab('faq')} className={`hover:text-[#1C1A17] transition-colors whitespace-nowrap shrink-0 ${activeTab === 'faq' ? 'text-[#2C4A3E] font-semibold' : ''}`}>FAQ</button>
          </nav>

          {/* Zone 3: Primary Action & Admin */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-lg border border-[#D6CFC7] hover:bg-[#F5F1EA] transition-colors text-[#57534E] ${activeTab === 'admin' ? 'bg-[#2C4A3E] text-white border-[#2C4A3E]' : ''}`}
              title="Staff Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C4A3E] hover:bg-[#1E332B] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C1A17] hover:bg-[#F5F1EA] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#FDFBF7] border-b border-[#EAE4DD] p-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Home</button>
            <button onClick={() => { setActiveTab('rooms'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Rooms & Suites</button>
            <button onClick={() => { setActiveTab('amenities'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Amenities</button>
            <button onClick={() => { setActiveTab('restaurant'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Restaurant</button>
            <button onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Gallery</button>
            <button onClick={() => { setActiveTab('reviews'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Reviews</button>
            <button onClick={() => { setActiveTab('location'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">Location & Contact</button>
            <button onClick={() => { setActiveTab('faq'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-[#F0ECE4]">FAQ</button>
            <button onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium text-[#2C4A3E]">Staff Admin Dashboard</button>
          </div>
        )}
      </header>

      {/* Main Content Router */}
      <main>
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-[#1C1A17] text-white px-4 py-20 overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-55">
                <img
                  src="/images/hotel_exterior_dusk_1791640598426.jpg"
                  alt="New Day Hotel Exterior Addis Ababa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D4AF37] text-xs font-semibold tracking-wider uppercase border border-white/20">
                  22 Mazoria Djibouti Street, Addis Ababa
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif">
                  NEW DAY HOTEL
                </h1>
                <p className="text-xl sm:text-2xl text-[#EFECE6] font-light max-w-2xl mx-auto tracking-wide">
                  Comfort. Convenience. A better way to stay in Addis Ababa.
                </p>

                {/* Quick Booking Widget in Hero */}
                <div className="bg-white/95 backdrop-blur-md text-[#1C1A17] p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left border border-white/40">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2C4A3E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2C4A3E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Guests</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2C4A3E] outline-none"
                    >
                      <option value={1}>1 Guest (Single)</option>
                      <option value={2}>2 Guests (Double/Twin)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Guests (Family)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => setActiveTab('rooms')}
                      className="w-full bg-[#2C4A3E] hover:bg-[#1E332B] text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      Check Availability <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <a
                    href="https://wa.me/251993821442"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all"
                  >
                    WhatsApp +251 993 821 442
                  </a>
                  <a
                    href="tel:+251993821442"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                  <a
                    href="mailto:newdayhotel.addis@gmail.com"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  >
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                </div>
              </div>
            </section>

            {/* Experience Section: More Than A Room */}
            <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Experience New Day</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1C1A17]">MORE THAN A ROOM</h2>
                <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto" />
                <p className="text-[#57534E] text-base">
                  Located in the vibrant heart of Addis Ababa at 22 Mazoria, New Day Hotel combines modern international hospitality with authentic Ethiopian warmth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="h-48 rounded-xl overflow-hidden">
                    <img src="/images/hotel_room_deluxe_1791640608938.jpg" alt="Comfortable Rooms" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1A17]">Comfortable Rooms</h3>
                  <p className="text-sm text-[#57534E]">Clean, spacious accommodation with plush bedding, high-speed Wi-Fi, and modern amenities for a relaxing stay.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="h-48 rounded-xl overflow-hidden">
                    <img src="/images/hotel_restaurant_dining_1791640624953.jpg" alt="Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1A17]">Exquisite Dining</h3>
                  <p className="text-sm text-[#57534E]">Savor authentic local Ethiopian delicacies and international culinary masterpieces in our refined restaurant and bar.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="h-48 rounded-xl overflow-hidden">
                    <img src="/images/hotel_jacuzzi_suite_1791640636718.jpg" alt="Relaxation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1A17]">Relaxation & Jacuzzi</h3>
                  <p className="text-sm text-[#57534E]">Unwind in our premium suites featuring private hydrotherapy jacuzzi bathtubs and serene spa-like environments.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="h-48 rounded-xl overflow-hidden">
                    <img src="/images/hotel_exterior_dusk_1791640598426.jpg" alt="Addis Ababa Views" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1A17]">Prime Addis Views</h3>
                  <p className="text-sm text-[#57534E]">Enjoy breathtaking skyline views of Addis Ababa right from your room window and our rooftop viewing areas.</p>
                </div>
              </div>
            </section>

            {/* Featured Rooms Teaser */}
            <section className="bg-[#F4EFE6] py-24 px-4 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Accommodation</span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1C1A17] mt-1">FEATURED ROOMS & SUITES</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('rooms')}
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#2C4A3E] hover:text-[#1E332B]"
                  >
                    View All Rooms <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {rooms.slice(0, 3).map((room) => (
                    <div key={room.id} className="bg-white rounded-2xl overflow-hidden border border-[#EAE4DD] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="h-56 overflow-hidden relative">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-[#1C1A17]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                            ETB {room.price.toLocaleString()} / night
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-4 text-xs text-[#78716C]">
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Up to {room.capacity} Guests</span>
                            <span>·</span>
                            <span>{room.bedType}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#1C1A17] font-serif">{room.name}</h3>
                          <p className="text-sm text-[#57534E] line-clamp-2">{room.description}</p>
                        </div>
                      </div>
                      <div className="p-6 pt-0 flex items-center justify-between border-t border-[#F0ECE4] mt-4 pt-4">
                        <button
                          onClick={() => { setActiveTab('rooms'); }}
                          className="text-xs font-semibold text-[#2C4A3E] hover:underline"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleStartBooking(room)}
                          className="bg-[#2C4A3E] hover:bg-[#1E332B] text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'rooms' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Our Accommodations</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">ROOMS & RATES</h1>
              <p className="text-[#57534E] text-base">
                Choose from our range of meticulously designed rooms and suites, tailored for comfort, business, or family stays in Addis Ababa.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-2xl overflow-hidden border border-[#EAE4DD] shadow-sm flex flex-col sm:flex-row">
                  <div className="sm:w-1/2 h-64 sm:h-auto relative">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-[#2C4A3E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ETB {room.price.toLocaleString()} / night
                    </div>
                  </div>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-[#78716C]">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {room.capacity} Guests</span>
                        <span>·</span>
                        <span>{room.bedType}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1C1A17] font-serif">{room.name}</h3>
                      <p className="text-sm text-[#57534E]">{room.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {room.amenities.map((am, i) => (
                          <span key={i} className="bg-[#F5F1EA] text-[#57534E] px-2.5 py-0.5 rounded text-xs font-medium">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between">
                      <span className="text-xs text-[#78716C] font-medium">Free Cancellation Available</span>
                      <button
                        onClick={() => handleStartBooking(room)}
                        className="bg-[#2C4A3E] hover:bg-[#1E332B] text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Hotel Facilities</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">WORLD-CLASS AMENITIES</h1>
              <p className="text-[#57534E] text-base">
                Everything you need for a seamless and luxurious stay in Addis Ababa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Wifi className="w-6 h-6 text-[#2C4A3E]" />, title: 'Free High-Speed Wi-Fi', desc: 'Seamless internet access across all rooms and public areas.' },
                { icon: <Coffee className="w-6 h-6 text-[#2C4A3E]" />, title: 'Complimentary Breakfast', desc: 'Fresh local and international breakfast buffet served daily.' },
                { icon: <Car className="w-6 h-6 text-[#2C4A3E]" />, title: 'Secure Parking', desc: 'Ample parking space with 24/7 security surveillance.' },
                { icon: <Utensils className="w-6 h-6 text-[#2C4A3E]" />, title: 'Fine Restaurant & Bar', desc: 'Authentic Ethiopian cuisine and international drinks.' },
                { icon: <Dumbbell className="w-6 h-6 text-[#2C4A3E]" />, title: 'Fitness Center', desc: 'Modern gym equipment to keep up with your fitness routine.' },
                { icon: <Building className="w-6 h-6 text-[#2C4A3E]" />, title: 'Airport Shuttle', desc: 'Reliable transport to and from Bole International Airport.' },
                { icon: <Clock className="w-6 h-6 text-[#2C4A3E]" />, title: '24/7 Reception', desc: 'Multilingual front desk ready to assist you at any hour.' },
                { icon: <Sparkles className="w-6 h-6 text-[#2C4A3E]" />, title: 'Room Service', desc: 'Prompt and courteous in-room dining and housekeeping.' },
                { icon: <Tv className="w-6 h-6 text-[#2C4A3E]" />, title: 'Smart TV & Cable', desc: 'Wide selection of international news and entertainment channels.' },
                { icon: <Bed className="w-6 h-6 text-[#2C4A3E]" />, title: 'Air Conditioning', desc: 'Individual climate control in every room and suite.' },
                { icon: <Wine className="w-6 h-6 text-[#2C4A3E]" />, title: 'Jacuzzi & Suites', desc: 'Luxurious hydrotherapy tubs for ultimate relaxation.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm hover:shadow-md transition-shadow space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F1EA] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1A17]">{item.title}</h3>
                  <p className="text-sm text-[#57534E]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'restaurant' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Culinary Experience</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">DINE AT NEW DAY HOTEL</h1>
              <p className="text-[#57534E] text-base">
                Experience authentic Ethiopian hospitality and exquisite international dishes prepared by our master chefs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-serif text-[#1C1A17]">A Feast for the Senses</h2>
                <p className="text-[#57534E] leading-relaxed">
                  Our restaurant offers a warm, sophisticated ambiance with comfortable seating and ambient pendant lighting. Whether you are starting your morning with our freshly brewed Ethiopian coffee and breakfast buffet or enjoying a romantic evening dinner, our dining room provides an unforgettable culinary journey.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-xl border border-[#EAE4DD]">
                    <h4 className="font-bold text-[#1C1A17]">Breakfast Buffet</h4>
                    <p className="text-xs text-[#57534E] mt-1">6:30 AM – 10:30 AM daily</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#EAE4DD]">
                    <h4 className="font-bold text-[#1C1A17]">Dinner & Bar</h4>
                    <p className="text-xs text-[#57534E] mt-1">5:00 PM – 11:30 PM daily</p>
                  </div>
                </div>
                <div>
                  <a
                    href="tel:+251993821442"
                    className="inline-flex items-center gap-2 bg-[#2C4A3E] hover:bg-[#1E332B] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition-all"
                  >
                    Reserve a Table <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-64 rounded-2xl overflow-hidden shadow-md">
                  <img src="/images/hotel_restaurant_dining_1791640624953.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-md mt-8">
                  <img src="/images/hotel_room_deluxe_1791640608938.jpg" alt="Dining Experience" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Visual Tour</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">HOTEL GALLERY</h1>
              <p className="text-[#57534E] text-base">
                Explore our rooms, jacuzzi suites, restaurant, dining area, and hotel interiors.
              </p>

              {/* Filter tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {(['all', 'rooms', 'jacuzzi', 'restaurant', 'interiors', 'views'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${galleryFilter === cat ? 'bg-[#2C4A3E] text-white' : 'bg-white text-[#57534E] border border-[#D6CFC7] hover:bg-[#F5F1EA]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: '/images/hotel_exterior_dusk_1791640598426.jpg', title: 'Exterior at Dusk', cat: 'views' },
                { src: '/images/hotel_room_deluxe_1791640608938.jpg', title: 'Deluxe King Room', cat: 'rooms' },
                { src: '/images/hotel_restaurant_dining_1791640624953.jpg', title: 'Restaurant & Dining', cat: 'restaurant' },
                { src: '/images/hotel_jacuzzi_suite_1791640636718.jpg', title: 'Jacuzzi Suite Bathroom', cat: 'jacuzzi' },
                { src: '/images/hotel_reception_lobby_1791640649045.jpg', title: 'Reception & Lobby', cat: 'interiors' },
                { src: '/images/hotel_room_deluxe_1791640608938.jpg', title: 'Standard Room Interior', cat: 'rooms' }
              ]
                .filter(item => galleryFilter === 'all' || item.cat === galleryFilter)
                .map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(img.src)}
                    className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold text-sm">{img.title}</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-6 right-6 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <img src={lightboxImage} alt="Fullscreen preview" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Guest Testimonials</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">WHAT OUR GUESTS SAY</h1>
              <p className="text-[#57534E] text-base">
                Read authentic experiences shared by travelers who stayed at New Day Hotel, Addis Ababa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-8 rounded-2xl border border-[#EAE4DD] shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#1C1A17] italic text-sm leading-relaxed">"{rev.comment}"</p>
                  </div>
                  <div className="border-t border-[#F0ECE4] pt-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1C1A17]">{rev.author}</span>
                    <span className="text-[#78716C]">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Payment Notice Section as requested in prompt */}
            <div className="max-w-4xl mx-auto bg-[#F4EFE6] border border-[#D6CFC7] p-8 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#2C4A3E]" />
                <h3 className="text-lg font-bold text-[#1C1A17]">DEMO PAYMENT ACCOUNT & POLICIES</h3>
              </div>
              <p className="text-sm text-[#57534E]">
                Bank: <strong>New Day Hotel Demo Bank</strong><br />
                Account Name: <strong>NEW DAY HOTEL</strong><br />
                Account Number: <strong>0000000000</strong><br />
                Reference: <strong>DEMO-BOOKING</strong>
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium">
                ⚠️ DEMO PAYMENT — Replace with the hotel's official payment information before launch. Never present the demo account as a real bank account.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Find Us</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">LOCATION & CONTACT</h1>
              <p className="text-[#57534E] text-base">
                Conveniently located at 22 Mazoria Djibouti Street, Addis Ababa, Ethiopia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-[#EAE4DD] shadow-sm space-y-6">
                  <h3 className="text-2xl font-bold font-serif text-[#1C1A17]">NEW DAY HOTEL</h3>
                  <div className="space-y-4 text-sm text-[#57534E]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#2C4A3E] shrink-0 mt-0.5" />
                      <span>22 Mazoria Djibouti Street, Addis Ababa, Ethiopia (Hayahulet area)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#2C4A3E] shrink-0" />
                      <a href="tel:+251993821442" className="hover:text-[#2C4A3E] font-semibold">+251 993 821 442</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#2C4A3E] shrink-0" />
                      <a href="mailto:newdayhotel.addis@gmail.com" className="hover:text-[#2C4A3E] font-semibold">newdayhotel.addis@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href="https://wa.me/251993821442"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all flex items-center gap-2"
                    >
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:+251993821442"
                      className="bg-[#2C4A3E] hover:bg-[#1E332B] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all flex items-center gap-2"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl border border-[#EAE4DD] shadow-sm space-y-6">
                <h3 className="text-2xl font-bold font-serif text-[#1C1A17]">Send Us a Message</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! We will get back to you shortly.'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Your Name</label>
                    <input required type="text" className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]" placeholder="Abebe Kebede" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Phone or Email</label>
                    <input required type="text" className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]" placeholder="+251 911 ..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Message</label>
                    <textarea required rows={4} className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]" placeholder="How can we help you?" />
                  </div>
                  <button type="submit" className="w-full bg-[#2C4A3E] hover:bg-[#1E332B] text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wider shadow-md transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="py-16 max-w-4xl mx-auto px-4 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Got Questions?</span>
              <h1 className="text-4xl font-bold font-serif text-[#1C1A17]">FREQUENTLY ASKED QUESTIONS</h1>
              <p className="text-[#57534E] text-base">
                Everything you need to know about staying at New Day Hotel.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm space-y-2">
                  <h3 className="text-lg font-bold text-[#1C1A17] flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#2C4A3E] shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[#57534E] pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="py-16 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EAE4DD] pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2C4A3E]">Management Portal</span>
                <h1 className="text-3xl font-bold font-serif text-[#1C1A17]">STAFF ADMIN DASHBOARD</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#2C4A3E]/10 text-[#2C4A3E] px-3 py-1.5 rounded-lg font-semibold">
                  Logged in as Manager
                </span>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm">
                <span className="text-xs font-semibold text-[#78716C] uppercase">Total Reservations</span>
                <p className="text-3xl font-bold text-[#1C1A17] mt-2">{reservations.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm">
                <span className="text-xs font-semibold text-[#78716C] uppercase">Active Room Types</span>
                <p className="text-3xl font-bold text-[#1C1A17] mt-2">{rooms.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EAE4DD] shadow-sm">
                <span className="text-xs font-semibold text-[#78716C] uppercase">Hotel Contact</span>
                <p className="text-lg font-bold text-[#2C4A3E] mt-2">+251 993 821 442</p>
              </div>
            </div>

            {/* Reservations Management */}
            <div className="bg-white p-8 rounded-2xl border border-[#EAE4DD] shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Recent Guest Reservations</h2>
              {reservations.length === 0 ? (
                <p className="text-sm text-[#78716C] py-8 text-center">No reservations recorded yet. Bookings made on the website will appear here instantly.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#EAE4DD] text-[#78716C] font-semibold text-xs uppercase">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Guest Name</th>
                        <th className="pb-3">Room</th>
                        <th className="pb-3">Dates</th>
                        <th className="pb-3">Total (ETB)</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE4]">
                      {reservations.map((res) => (
                        <tr key={res.id}>
                          <td className="py-4 font-mono font-medium text-[#2C4A3E]">{res.id}</td>
                          <td className="py-4 font-medium text-[#1C1A17]">{res.guestName} <br /><span className="text-xs text-[#78716C]">{res.phone}</span></td>
                          <td className="py-4 text-[#57534E]">{res.roomName}</td>
                          <td className="py-4 text-xs text-[#57534E]">{res.checkIn} to {res.checkOut}</td>
                          <td className="py-4 font-bold text-[#1C1A17]">ETB {res.totalPrice.toLocaleString()}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              {res.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Room Price & Availability Management */}
            <div className="bg-white p-8 rounded-2xl border border-[#EAE4DD] shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Manage Rooms & Prices (ETB)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room, idx) => (
                  <div key={room.id} className="p-4 rounded-xl border border-[#EAE4DD] space-y-3 bg-[#FDFBF7]">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#1C1A17]">{room.name}</h4>
                      <span className="text-xs font-semibold bg-[#2C4A3E]/10 text-[#2C4A3E] px-2 py-0.5 rounded">
                        {room.bedType}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] uppercase font-semibold text-[#78716C] mb-1">Nightly Price (ETB)</label>
                        <input
                          type="number"
                          value={room.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const updated = rooms.map(r => r.id === room.id ? { ...r, price: val } : r);
                            saveRooms(updated);
                          }}
                          className="w-full bg-white border border-[#D6CFC7] rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                        />
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={room.available}
                            onChange={(e) => {
                              const val = e.target.checked;
                              const updated = rooms.map(r => r.id === room.id ? { ...r, available: val } : r);
                              saveRooms(updated);
                            }}
                            className="rounded text-[#2C4A3E] focus:ring-[#2C4A3E]"
                          />
                          Available
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking Flow Modal */}
      {selectedRoomForBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative space-y-6 my-8">
            <button
              onClick={() => setSelectedRoomForBooking(null)}
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#1C1A17] p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#2C4A3E] uppercase tracking-wider">Secure Reservation</span>
              <h2 className="text-2xl font-bold font-serif text-[#1C1A17]">Book: {selectedRoomForBooking.name}</h2>
              <p className="text-sm text-[#57534E]">ETB {selectedRoomForBooking.price.toLocaleString()} per night · {selectedRoomForBooking.bedType}</p>
            </div>

            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Number of Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                  >
                    {[...Array(selectedRoomForBooking.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-[#F5F1EA] rounded-xl space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{calculateNights(checkInDate, checkOutDate)} Night(s)</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1C1A17] pt-2 border-t border-[#D6CFC7]">
                    <span>Total Stay Price:</span>
                    <span className="text-[#2C4A3E]">ETB {(selectedRoomForBooking.price * calculateNights(checkInDate, checkOutDate)).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingStep(2)}
                  className="w-full bg-[#2C4A3E] hover:bg-[#1E332B] text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wider transition-colors"
                >
                  Continue to Guest Details
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <form onSubmit={handleCompleteBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Abebe Kebede"
                    className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Phone Number / WhatsApp</label>
                    <input
                      required
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+251 911 ..."
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="guest@example.com"
                      className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Estimated Arrival Time</label>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] uppercase mb-1">Special Requests (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Airport pickup, high floor, etc."
                    className="w-full bg-[#FDFBF7] border border-[#D6CFC7] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                  />
                </div>

                {/* Demo Payment Notice */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
                  <p className="font-bold">DEMO PAYMENT ACCOUNT</p>
                  <p>Bank: New Day Hotel Demo Bank | Acc: 0000000000</p>
                  <p className="text-[11px] text-amber-700">⚠️ Request Booking mode enabled. No actual payment required now.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="w-1/3 bg-[#F5F1EA] hover:bg-[#EAE4DD] text-[#1C1A17] font-semibold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#2C4A3E] hover:bg-[#1E332B] text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wider shadow-md transition-all"
                  >
                    Request Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif text-[#1C1A17]">Booking Confirmed!</h2>
              <p className="text-sm text-[#57534E]">Thank you for choosing New Day Hotel. Your reservation has been successfully registered.</p>
            </div>
            <div className="bg-[#FDFBF7] p-4 rounded-xl text-left text-xs space-y-2 border border-[#EAE4DD]">
              <div className="flex justify-between">
                <span className="text-[#78716C]">Reference ID:</span>
                <span className="font-mono font-bold text-[#2C4A3E]">{bookingSuccessModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Guest:</span>
                <span className="font-semibold text-[#1C1A17]">{bookingSuccessModal.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Room:</span>
                <span className="font-semibold text-[#1C1A17]">{bookingSuccessModal.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Dates:</span>
                <span className="font-semibold text-[#1C1A17]">{bookingSuccessModal.checkIn} to {bookingSuccessModal.checkOut}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE4DD]">
                <span className="text-[#78716C]">Total Price:</span>
                <span className="font-bold text-[#1C1A17]">ETB {bookingSuccessModal.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => setBookingSuccessModal(null)}
              className="w-full bg-[#2C4A3E] hover:bg-[#1E332B] text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-md"
            >
              Done / Return to Home
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1C1A17] text-[#EFECE6] pt-16 pb-12 px-4 lg:px-8 border-t border-[#2C2925]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-white tracking-wide">NEW DAY HOTEL</h3>
            <p className="text-sm text-[#A8A29E] leading-relaxed">
              Comfort. Convenience. A better way to stay in Addis Ababa. Located at 22 Mazoria Djibouti Street.
            </p>
            <p className="text-xs text-[#D4AF37] font-medium">Explore More</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#A8A29E]">
              <li><button onClick={() => setActiveTab('rooms')} className="hover:text-white transition-colors">Rooms & Suites</button></li>
              <li><button onClick={() => setActiveTab('amenities')} className="hover:text-white transition-colors">Amenities</button></li>
              <li><button onClick={() => setActiveTab('restaurant')} className="hover:text-white transition-colors">Restaurant</button></li>
              <li><button onClick={() => setActiveTab('gallery')} className="hover:text-white transition-colors">Gallery</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Support & Info</h4>
            <ul className="space-y-2 text-sm text-[#A8A29E]">
              <li><button onClick={() => setActiveTab('location')} className="hover:text-white transition-colors">Location & Directions</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={() => setActiveTab('reviews')} className="hover:text-white transition-colors">Guest Reviews</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">Staff Dashboard</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <div className="space-y-2 text-sm text-[#A8A29E]">
              <p>22 Mazoria Djibouti Street<br />Addis Ababa, Ethiopia</p>
              <p><a href="tel:+251993821442" className="hover:text-white transition-colors">+251 993 821 442</a></p>
              <p><a href="mailto:newdayhotel.addis@gmail.com" className="hover:text-white transition-colors">newdayhotel.addis@gmail.com</a></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#2C2925] flex flex-col sm:flex-row justify-between items-center text-xs text-[#A8A29E]">
          <p>© {new Date().getFullYear()} New Day Hotel, Addis Ababa. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
