import { Request, Response } from "express";
import { AlreadyBookedException } from "../exceptions/AlreadyBookedException";
import { ReservationService } from "../services/reservation";

export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  async reserve(
    req: Request<{}, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    const { body } = req;
    const seatCount = body.count;
    const trainId = body.train_id;

    try {
      const reservation = await this.reservationService.reserve(
        trainId,
        seatCount
      );
      res.send(reservation);
    } catch (e) {
      if (e instanceof AlreadyBookedException) {
        res.send(e.message);
        return;
      }

      console.error(e);
      res.sendStatus(500);
      return;
    }
  }
}
