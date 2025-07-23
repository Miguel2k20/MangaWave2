import { dataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = dataSource.getRepository(User)