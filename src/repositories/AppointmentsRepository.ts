import { isEqual } from "date-fns";
import Appointment from "../model/Appointment";

/** Detentor de realizar as nossas operações. */
interface CreateAppointmentDTO {
  id: string;
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointmentInSameDate || null;
  }

  public create({
    provider,
    date,
  }: Omit<CreateAppointmentDTO, "id">): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
