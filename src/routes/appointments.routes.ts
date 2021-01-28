import { Router } from "express";
import { parseISO } from "date-fns";

// import Appointment from "../model/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

/** Esta criando o vetor de appointments */
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;
    /** Apenas transformando a data */
    const parsedDate = parseISO(date);

    const appointment = new CreateAppointmentService(
      appointmentsRepository
    ).execute({
      provider,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
