import { IBookingReferenceService } from "../../interfaces/bookingReference";

export class FakeBookingReferenceService implements IBookingReferenceService {
  private _count: number;

  constructor() {
    this._count = 123456789;
  }

  async generateBookingReference(): Promise<string> {
    this._count += 1;
    return this._count.toString();
  }
}
