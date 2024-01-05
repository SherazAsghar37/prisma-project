import { Provider } from "../@types/providers";
import { User } from "../@types/user";
import db from "../utils/db.server";

export default class FacbookRepository {
  public createFacebookForUser = async (
    uid: string,
    provider: Provider["facebook"]
  ): Promise<boolean> => {
    try {
      const newUser = await db.facebook.create({
        data: {
          facebook_id: provider.facebook_id,
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
  public createUserByFacebook = async (
    email: string,
    provider: Provider["facebook"]
  ): Promise<User | null> => {
    try {
      const newUser = await db.user.create({
        data: {
          email,
          facebook: {
            create: {
              facebook_id: provider.facebook_id,
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
