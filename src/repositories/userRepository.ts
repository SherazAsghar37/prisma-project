import { User } from "../@types/user";
import db from "../utils/db.server";
export default class UserRepository {
  public createByLocal = async (
    data: Pick<User, "email" | "password">
  ): Promise<User> => {
    try {
      const newUser = await db.user.create({
        data: {
          email: data.email as string,
          password: data.password as string,
          author: {
            create: {},
          },
        },
      });

      if (newUser) {
        return newUser as User;
      } else {
        throw new Error("An known error occured while creating a user");
      }
    } catch (error) {
      throw new Error("error");
    }
  };

  public getByCreadentials = async (
    data: Pick<User, "email" | "password">
  ): Promise<User | null> => {
    try {
      const { email, password } = data;
      const newUser = await db.user.findUnique({
        where: {
          email,
          password,
        },
      });
      if (newUser) {
        return newUser as User;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  public getByEmail = async (email: string): Promise<User | null> => {
    try {
      const newUser = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (newUser) {
        return newUser as User;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  public getByGoogleId = async (google_id: string): Promise<User | null> => {
    try {
      const newUser = await db.user.findUnique({
        where: {
          google_id,
        },
      });
      if (newUser) {
        return newUser as User;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  public getByFacebookId = async (
    facebook_id: string
  ): Promise<User | null> => {
    try {
      const newUser = await db.user.findUnique({
        where: {
          facebook_id,
        },
      });
      if (newUser) {
        return newUser as User;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
}
