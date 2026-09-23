/**
 * Centralized SEO Keyword Strategy for Adaah (https://adaah.life)
 * Target Market: Hyderabad, Telangana, India
 * 
 * Rules:
 * - Natural, contextual usage strictly adhering to search intent.
 * - Zero keyword stuffing, zero explicit phrases, zero fake claims.
 */

export const KEYWORD_STRATEGY = {
  brand: {
    primary: 'Adaah',
    full: 'Adaah Hyderabad 18+ Private Directory',
    navigational: ['Adaah', 'Adaah Hyderabad', 'Adaah directory', 'Adaah life'],
  },

  homepage: {
    primaryH1: "Hyderabad's 18+ Private Directory",
    targetKeywords: [
      'Hyderabad 18+ private directory',
      'Hyderabad private directory',
      'Hyderabad companion directory',
      'Hyderabad escort directory',
      'escorts in Hyderabad',
      'Hyderabad escort service',
      'Hyderabad private profiles',
      'Hyderabad adult directory',
    ],
  },

  profilesListing: {
    primaryH1: 'Hyderabad 18+ Profiles',
    targetKeywords: [
      'Hyderabad escort profiles',
      'Hyderabad companion profiles',
      'Hyderabad private profiles',
      'Hyderabad directory profiles',
      'Hyderabad 18+ profiles',
      'Hyderabad adult directory',
    ],
  },

  locationsListing: {
    primaryH1: 'Hyderabad Companion Locations & Neighborhood Directories',
    targetKeywords: [
      'Hyderabad location directory',
      'Hyderabad neighborhood companion directory',
      'Hyderabad escort locations',
      'Banjara Hills to Gachibowli directory',
      'Hyderabad area directory',
    ],
  },

  locationClusters: {
    'banjara-hills': {
      primary: 'Banjara Hills directory',
      h1: '18+ Private Directory in Banjara Hills, Hyderabad',
      secondary: [
        'Banjara Hills profiles',
        'Banjara Hills private directory',
        'Banjara Hills companion directory',
        'Banjara Hills escorts',
        'escorts in Banjara Hills',
        'Banjara Hills escort service',
      ],
      relatedAreas: ['jubilee-hills', 'somajiguda', 'punjagutta', 'khairatabad'],
    },
    'jubilee-hills': {
      primary: 'Jubilee Hills directory',
      h1: '18+ Private Directory in Jubilee Hills, Hyderabad',
      secondary: [
        'Jubilee Hills profiles',
        'Jubilee Hills private directory',
        'Jubilee Hills companion directory',
        'Jubilee Hills escorts',
        'escorts in Jubilee Hills',
        'Jubilee Hills escort service',
      ],
      relatedAreas: ['banjara-hills', 'madhapur', 'gachibowli', 'hitech-city'],
    },
    'gachibowli': {
      primary: 'Gachibowli directory',
      h1: '18+ Private Directory in Gachibowli, Hyderabad',
      secondary: [
        'Gachibowli profiles',
        'Gachibowli private directory',
        'Gachibowli companion directory',
        'Gachibowli escorts',
        'escorts in Gachibowli',
        'Gachibowli escort service',
      ],
      relatedAreas: ['financial-district', 'nanakramguda', 'kondapur', 'madhapur', 'hitech-city'],
    },
    'hitech-city': {
      primary: 'Hitech City directory',
      h1: '18+ Private Directory in Hitech City, Hyderabad',
      secondary: [
        'Hitech City profiles',
        'Hitech City private directory',
        'Hitech City companion directory',
        'Hitech City escorts',
        'escorts in Hitech City',
        'Hitech City escort service',
      ],
      relatedAreas: ['madhapur', 'gachibowli', 'kondapur', 'raidurg'],
    },
    'madhapur': {
      primary: 'Madhapur directory',
      h1: '18+ Private Directory in Madhapur, Hyderabad',
      secondary: [
        'Madhapur profiles',
        'Madhapur private directory',
        'Madhapur companion directory',
        'Madhapur escorts',
        'escorts in Madhapur',
        'Madhapur escort service',
      ],
      relatedAreas: ['hitech-city', 'jubilee-hills', 'kondapur', 'gachibowli'],
    },
    'kondapur': {
      primary: 'Kondapur directory',
      h1: '18+ Private Directory in Kondapur, Hyderabad',
      secondary: [
        'Kondapur profiles',
        'Kondapur private directory',
        'Kondapur companion directory',
        'Kondapur escorts',
        'escorts in Kondapur',
        'Kondapur escort service',
      ],
      relatedAreas: ['gachibowli', 'madhapur', 'hitech-city', 'financial-district'],
    },
    'begumpet': {
      primary: 'Begumpet directory',
      h1: '18+ Private Directory in Begumpet, Hyderabad',
      secondary: [
        'Begumpet profiles',
        'Begumpet private directory',
        'Begumpet companion directory',
        'Begumpet escorts',
        'escorts in Begumpet',
      ],
      relatedAreas: ['somajiguda', 'punjagutta', 'ameerpet', 'secunderabad'],
    },
    'secunderabad': {
      primary: 'Secunderabad directory',
      h1: '18+ Private Directory in Secunderabad, Hyderabad',
      secondary: [
        'Secunderabad profiles',
        'Secunderabad private directory',
        'Secunderabad companion directory',
        'Secunderabad escorts',
        'escorts in Secunderabad',
      ],
      relatedAreas: ['begumpet', 'tarnaka', 'sainikpuri', 'himayatnagar'],
    },
    'somajiguda': {
      primary: 'Somajiguda directory',
      h1: '18+ Private Directory in Somajiguda, Hyderabad',
      secondary: [
        'Somajiguda profiles',
        'Somajiguda private directory',
        'Somajiguda companion directory',
        'Somajiguda escorts',
        'escorts in Somajiguda',
      ],
      relatedAreas: ['banjara-hills', 'punjagutta', 'khairatabad', 'begumpet'],
    },
  },

  categories: {
    primaryH1: 'Companion Categories & Specialties in Hyderabad',
    targetKeywords: [
      'independent companions Hyderabad',
      'VIP companions Hyderabad',
      'models Hyderabad',
      'travel companions Hyderabad',
      'dinner companions Hyderabad',
      'event companions Hyderabad',
    ],
  },

  services: {
    primaryH1: 'Companionship Services & Occasions in Hyderabad',
    targetKeywords: [
      'dinner date accompaniment Hyderabad',
      'VIP social companionship Hyderabad',
      'luxury travel partner Hyderabad',
      'hotel suite outcall Hyderabad',
      'incall appointment Hyderabad',
      'overnight companionship Hyderabad',
    ],
  },

  guides: {
    primaryH1: 'Hyderabad Editorial Guides, Discretion & Safety',
    targetKeywords: [
      'Hyderabad companion booking etiquette',
      'online directory safety Hyderabad',
      'privacy protection Hyderabad directory',
      'identifying verified profiles',
      'hotel suite outcall safety guide',
    ],
  },
};
