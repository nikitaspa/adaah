import { Service } from '../types';

export const mockServices: Service[] = [
  {
    id: 'srv-companionship',
    slug: 'companionship',
    name: 'Companionship',
    categoryId: 'cat-independent',
    categoryName: 'Independent Companions',
    shortDescription: 'Dedicated one-on-one time characterized by intelligent conversation, mutual respect, and relaxing presence.',
    description:
      'Private companionship designed for individuals seeking genuine connection, attentive listening, and dignified company in a serene, private environment in Hyderabad.',
    typicalDuration: '2 to 4 hours',
    priceEstimate: '₹8,000 – ₹18,000',
    whatToExpect: [
      'Unrushed, attentive conversation in complete privacy',
      'Option for incall at luxury hotel suites or outcall to upscale residences',
      'Strict adherence to mutual comfort, consent, and total discretion',
    ],
    popular: true,
    profileCount: 22,
    coverImage: '/images/profiles/profile-001.webp',
    faqs: [
      {
        question: 'How far in advance should I book companionship?',
        answer: 'We recommend reserving at least 3 to 6 hours in advance for local Hyderabad appointments, or 24 hours for prime weekend slots.',
      },
      {
        question: 'Is discretion guaranteed for residential outcalls?',
        answer: 'Yes. All companions arrive independently in private transportation with subtle, elegant attire ensuring total anonymity.',
      },
    ],
  },
  {
    id: 'srv-dinner-companion',
    slug: 'dinner-companion',
    name: 'Dinner Companion',
    categoryId: 'cat-dinner',
    categoryName: 'Dinner Companions',
    shortDescription: 'Charming accompaniment for fine dining, rooftop cocktail lounges, and culinary tastings.',
    description:
      'Turn an ordinary dinner into an unforgettable culinary affair. Ideal for visiting executives dining alone or hosts seeking an eloquent, poised companion across Banjara Hills and Jubilee Hills restaurants.',
    typicalDuration: '3 to 5 hours',
    priceEstimate: '₹10,000 – ₹25,000',
    whatToExpect: [
      'Impeccable table manners, dining etiquette, and conversational charm',
      'Knowledge of world cuisine, fine wines, and Hyderabad gastronomical hotspots',
      'Seamless arrival, discreet departures, and attentive company throughout',
    ],
    popular: true,
    profileCount: 16,
    coverImage: '/images/profiles/profile-010.webp',
    faqs: [
      {
        question: 'Who arranges the restaurant reservation?',
        answer: 'Clients typically book their preferred restaurant. However, companions or our concierge can provide recommendations for discreet, quiet tables.',
      },
    ],
  },
  {
    id: 'srv-travel-companion',
    slug: 'travel-companion',
    name: 'Travel Companion',
    categoryId: 'cat-travel',
    categoryName: 'Travel Companions',
    shortDescription: 'Cultured companion for domestic holidays, scenic weekend resorts, or cross-city travel.',
    description:
      'Seamless company for weekend getaways, wellness resorts, or private holidays departing from Hyderabad. Relax with a worldly, engaging partner who elevates your travel experience.',
    typicalDuration: '24 to 72 hours',
    priceEstimate: '₹35,000 – ₹85,000 / day',
    whatToExpect: [
      'Pre-travel coordination and shared itinerary planning',
      'Separate private accommodations or mutually agreed luxury suite stays',
      'Graceful adaptation to travel schedules, flights, and leisure activities',
    ],
    popular: true,
    profileCount: 8,
    coverImage: '/images/profiles/profile-011.webp',
    faqs: [
      {
        question: 'How are travel expenses managed?',
        answer: 'In addition to the companion’s daily honorarium, all travel, lodging, and dining expenses are arranged and covered by the client in advance.',
      },
    ],
  },
  {
    id: 'srv-social-companion',
    slug: 'social-companion',
    name: 'Social & Event Companion',
    categoryId: 'cat-event',
    categoryName: 'Event Companions',
    shortDescription: 'Poised presence for corporate banquets, high-society galas, private viewings, and celebrations.',
    description:
      'Arrive with a captivating partner suited to high-profile gatherings where social ease and polished presentation matter. Our event companions ensure you navigate any room with confidence.',
    typicalDuration: '4 to 6 hours',
    priceEstimate: '₹15,000 – ₹30,000',
    whatToExpect: [
      'Tailored dress code from black-tie formal to upscale cocktail',
      'Articulate conversational skills across business, culture, and arts',
      'Total confidentiality regarding your professional and personal life',
    ],
    popular: false,
    profileCount: 11,
    coverImage: '/images/profiles/profile-004.webp',
    faqs: [
      {
        question: 'Can the companion blend in seamlessly with business colleagues?',
        answer: 'Absolutely. Event companions are well-educated professionals who converse effortlessly on a wide variety of topics.',
      },
    ],
  },
  {
    id: 'srv-weekend-getaway',
    slug: 'weekend-getaway',
    name: 'Weekend Getaway Partner',
    categoryId: 'cat-travel',
    categoryName: 'Travel Companions',
    shortDescription: 'Extended weekend escape accompaniment to luxury villas, heritage resorts, and scenic retreats.',
    description:
      'Unplug from the daily grind with a charming companion. Whether exploring luxury heritage stays in Gandipet or lakeside resorts around Hyderabad, enjoy relaxing, restorative time together.',
    typicalDuration: '48 hours (Friday – Sunday)',
    priceEstimate: '₹50,000 – ₹1,20,000',
    whatToExpect: [
      'Relaxed, unrushed itinerary suited to your pace',
      'Private poolside lounging, gourmet dinners, and leisure activities',
      'Dedicated companionship with personalized attention',
    ],
    popular: false,
    profileCount: 7,
    coverImage: '/images/profiles/profile-005.webp',
    faqs: [
      {
        question: 'What advance booking is required for weekend getaways?',
        answer: 'Please book at least 48 to 72 hours in advance to allow for itinerary coordination and schedule clearance.',
      },
    ],
  },
];
