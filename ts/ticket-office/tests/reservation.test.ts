import { describe, expect, test } from "@jest/globals";
import { ReservationService } from "../services/reservation";
import { FakeBookingReferenceService } from "./services/fakeBookingReference";
import { FakeTrainDataService } from "./services/fakeTrainData";

describe("ReservationTest", () => {
  // TODO: Fixtures

  test("booking four seats from empty train", async () => {
    //Given
    const fakeBookingReferenceService = new FakeBookingReferenceService();
    const fakeTrainDataService = new FakeTrainDataService();
    await fakeTrainDataService.loadTrain();

    const reservationService = new ReservationService(
      fakeBookingReferenceService,
      fakeTrainDataService
    );
    const trainId = "express_2000";

    //When
    const reservation = await reservationService.reserve(trainId, 4);

    //Then
    expect(reservation.train_id).toBe(trainId);
    expect(reservation.seats).toEqual(["1A", "2A", "3A", "4A"]);

    // TODO: Check if seats were reserved in the fake train data
  });

  test("booking four additional seats", async () => {
    //Given
    const fakeBookingReferenceService = new FakeBookingReferenceService();
    const fakeTrainDataService = new FakeTrainDataService();
    await fakeTrainDataService.loadTrain();

    const reservationService = new ReservationService(
      fakeBookingReferenceService,
      fakeTrainDataService
    );
    const trainId = "express_2000";

    //When
    const firstReservation = await reservationService.reserve(trainId, 4);
    const secondReservation = await reservationService.reserve(trainId, 4);

    //Then

    expect(firstReservation.train_id).toBe(trainId);
    expect(firstReservation.seats).toEqual(["1A", "2A", "3A", "4A"]);

    expect(secondReservation.train_id).toBe(trainId);
    expect(secondReservation.seats).toEqual(["5A", "6A", "7A", "8A"]);

    // TODO: Check if seats were reserved in the fake train data
  });
});
