import { AlreadyBookedException } from "../../exceptions/AlreadyBookedException";
import {
  ITrainDataService,
  Reservation,
  Train,
} from "../../interfaces/trainData";

export class FakeTrainDataService implements ITrainDataService {
  private _trains: Record<string, Train>;

  async loadTrain() {
    this._trains = (await import("../data/trains.json")) as unknown as Record<
      string,
      Train
    >;
  }

  async getDataFromTrain(trainId: string): Promise<Train> {
    return this._trains[trainId];
  }

  async reserveSeatsInTrain({
    train_id,
    booking_reference,
    seats,
  }: Reservation): Promise<Train> {
    const train = this._trains[train_id];

    for (const seatId of seats) {
      const seat = train.seats[seatId];
      const previousBookingReference = seat.booking_reference;
      if (
        previousBookingReference != "" &&
        previousBookingReference != booking_reference
      ) {
        throw new AlreadyBookedException(
          `Could not book '${seatId}' with '${booking_reference}' - already booked with '${previousBookingReference}'`
        );
      }
      seat.booking_reference = booking_reference;
    }

    return train;
  }

  async resetTrain(trainId: string): Promise<void> {
    const train = this._trains[trainId];

    const { seats } = train;

    for (const seatId in seats) {
      const seat = seats[seatId];
      seat.booking_reference = "";
    }
  }
}
