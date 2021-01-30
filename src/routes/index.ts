import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.rotues";

const routes = Router();

// routes.use(json());
routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);

export default routes;
