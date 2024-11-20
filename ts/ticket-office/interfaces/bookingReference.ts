export interface IBookingReferenceService {
  generateBookingReference(): Promise<string>;
}
