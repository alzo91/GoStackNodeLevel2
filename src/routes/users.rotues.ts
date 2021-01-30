import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
const usersRouter = Router();

/** Esta criando o vetor de appointments */
// const appointmentsRepository = new AppointmentsRepository();

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default usersRouter;
