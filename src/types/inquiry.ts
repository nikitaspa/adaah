export interface Inquiry {
  id: string;
  profileId: string;
  profileName: string;
  serviceId?: string;
  serviceName?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  locationArea?: string;
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  currency?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: string;
}

export type BookingRequest = Inquiry;
