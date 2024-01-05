import { Provider } from "../@types/providers";
import { User } from "../@types/user";
import db from "../utils/db.server";

export default class GoogleRepository {
  public createGoogleForUser = async (
    uid: string,
    provider: Provider["google"]
  ): Promise<boolean> => {
    try {
      const newUser = await db.google.create({
        data: {
          google_id: provider.google_id,
          access_token: provider.access_token,
          refresh_token: provider.refresh_token,
          user: {
            connect: { uid: uid },
          },
        },
      });
      if (newUser) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  public createUserByGoogle = async (
    email: string,
    provider: Provider["google"]
  ): Promise<User | null> => {
    try {
      const newUser = await db.user.create({
        data: {
          email,
          google: {
            create: {
              google_id: provider.google_id,
              access_token: provider.access_token,
              refresh_token: provider.refresh_token,
            },
          },
          author: {
            create: {},
          },
        },
      });
      if (newUser) {
        return newUser as User;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
