import { Reservation } from "../interfaces/trainData";
import { BookingReferenceService } from "../services/bookingReference";
import { TrainDataService } from "../services/trainData";

export class ReservationService {
  constructor(
    private bookingReferenceService: BookingReferenceService,
    private trainDataService: TrainDataService
  ) {}

  async reserve(trainId: string, seatCount: number) {
    // Step 1: get a booking reference
    const bookingReference =
      await this.bookingReferenceService.generateBookingReference();

    // Step 2: fetch train data
    const train = await this.trainDataService.getDataFromTrain(trainId);
    const seatsInTrain = Object.values(train.seats);

    // TODO: do not hard-code coach number
    const availableSeats = seatsInTrain
      .filter((s) => s.coach === "A")
      .filter((s) => !s.booking_reference); // BUG: Empty = ""

    // Step 4: make reservation
    const toReserve = availableSeats.slice(0, seatCount);
    const seatIds = toReserve.map((s) => `${s.seat_number}${s.coach}`);
    const reservation: Reservation = {
      booking_reference: bookingReference,
      seats: seatIds,
      train_id: trainId,
    };

    await this.trainDataService.reserveSeatsInTrain(reservation);

    return reservation;
  }
}
