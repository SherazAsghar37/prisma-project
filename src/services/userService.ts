import { singleton, inject } from "tsyringe";
import { User } from "../@types/user";
import UserRepository from "../repositories/userRepository";

@singleton()
export default class UserService {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}
  public signUpLocal = async (email: string, password: string) => {
    try {
      const user = await this._userRepository.createByLocal({
        email,
        password,
      });
      if (user) {
        return user as User;
      } else {
        throw new Error("Custom Error : unable to create user");
      }
    } catch (error) {
      throw new Error(`Critical Error : Something went wrong ${error}`);
    }
  };
}
