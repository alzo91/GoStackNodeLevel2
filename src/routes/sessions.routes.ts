import { Router } from "express";
import AuthenticationUserService from "../services/AuthenticationUserService";
const sessionsRouter = Router();

/** Esta criando o vetor de appointments */
// const appointmentsRepository = new AppointmentsRepository();

sessionsRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUserService = new AuthenticationUserService();

    const { user, token } = await authUserService.execute({ email, password });

    return response.status(201).json({ user, token });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default sessionsRouter;
