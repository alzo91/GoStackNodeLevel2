import { startOfHour } from "date-fns";
import Appointment from "../model/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**  */
interface IRequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  /** */
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: IRequestDTO): Appointment {
    /** Regra de negocio da aplicação poderia ser de 15, 30, 45 minutos  */
    const initialDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      initialDate
    );

    if (!!findAppointmentInSameDate) {
      throw Error(`This appointment is already booked`);
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: initialDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
