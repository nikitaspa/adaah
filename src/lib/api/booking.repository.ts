import { BookingRequest } from '../../types';

export interface BookingSubmissionInput {
  profileId: string;
  profileName: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface IBookingRepository {
  submitRequest(input: BookingSubmissionInput): Promise<BookingRequest>;
  getRequestById(id: string): Promise<BookingRequest | null>;
}

export class MockBookingRepository implements IBookingRepository {
  private requests: BookingRequest[] = [];

  async submitRequest(input: BookingSubmissionInput): Promise<BookingRequest> {
    // Simulating network delay to a future Laravel POST /api/v1/inquiries endpoint
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newRequest: BookingRequest = {
      id: `req-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      ...input,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.requests.push(newRequest);
    return newRequest;
  }

  async getRequestById(id: string): Promise<BookingRequest | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.requests.find((r) => r.id === id) || null;
  }
}

export const bookingRepository: IBookingRepository = new MockBookingRepository();
