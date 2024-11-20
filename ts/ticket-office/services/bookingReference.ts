import fetch from "node-fetch";
import { IBookingReferenceService } from "../interfaces/bookingReference";

export class BookingReferenceService implements IBookingReferenceService {
  async generateBookingReference(): Promise<string> {
    const response = await fetch("http://localhost:8082/booking_reference");
    if (response.ok) {
      return await response.text();
    }

    throw new Error("Something went wrong");
  }
}
