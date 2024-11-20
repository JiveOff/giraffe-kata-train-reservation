import express from "express";
import morgan from "morgan";
import { ReservationController } from "./controllers/reservation";
import { BookingReferenceService } from "./services/bookingReference";
import { ReservationService } from "./services/reservation";
import { TrainDataService } from "./services/trainData";

const port = 8083;

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

const bookingReferenceService = new BookingReferenceService();
const trainDataService = new TrainDataService();

const reservationService = new ReservationService(
  bookingReferenceService,
  trainDataService
);

const controller = new ReservationController(reservationService);

app.post("/reserve", controller.reserve);

app.listen(port, () => {
  console.log(`Ticket Office listening on port ${port}`);
});
