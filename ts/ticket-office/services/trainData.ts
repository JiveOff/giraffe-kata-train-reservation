import { AlreadyBookedException } from "../exceptions/AlreadyBookedException";
import { ITrainDataService, Reservation, Train } from "../interfaces/trainData";

export class TrainDataService implements ITrainDataService {
  async getDataFromTrain(trainId: string): Promise<Train> {
    const response = await fetch(
      `http://localhost:8081/data_for_train/${trainId}`
    );
    if (!response.ok) {
      throw new Error("Error while fetching train");
    }

    return await response.json();
  }

  async reserveSeatsInTrain(reservation: Reservation): Promise<Train> {
    const response = await fetch(`http://localhost:8081/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new AlreadyBookedException(await response.text());
      }

      throw new Error("Error while reserving seat.");
    }

    return await response.json();
  }

  async resetTrain(trainId: string): Promise<void> {
    const response = await fetch(`http://localhost:8081/reset/${trainId}`, {
      method: "POST",
    });
    await response.text();
  }
}
