import { Seat } from "../seat";

export type Train = {
  seats: Record<string, Seat>;
};

export type Reservation = {
  train_id: string;
  seats: string[];
  booking_reference: string;
};

export interface ITrainDataService {
  getDataFromTrain(trainId: string): Promise<Train>;
  reserveSeatsInTrain(reservation: Reservation): Promise<Train>;
  resetTrain(trainId: string): Promise<void>;
}
