import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../model/User";
import authConfig from "../configs/auth";
interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticationUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    if (!userExists) {
      throw new Error(`Incorrect email/password combination!`);
    }

    const passwordMatched = await compare(password, userExists.password);

    if (!passwordMatched) {
      throw new Error(`Incorrect email/password combination!`);
    }
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, { expiresIn, subject: userExists.id });

    return { user: userExists, token };
  }
}

export default AuthenticationUserService;
