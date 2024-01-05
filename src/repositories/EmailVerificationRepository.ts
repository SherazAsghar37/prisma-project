import { EmailVerificationToken } from "../@types/email_verification_token";
import db from "../utils/db.server";
export default class EmailVerificationRepository {
  public crateToken = async (
    data: EmailVerificationToken
  ): Promise<EmailVerificationToken | null> => {
    try {
      const newToken = await db.emailVerifiacitonToken.create({
        data: {
          password: data.password as string,
          email: data.email as string,
          otp: data.otp as number,
        },
      });
      if (newToken) {
        return newToken as EmailVerificationToken;
      } else {
        return null;
      }
    } catch (error) {
      //   console.log(error);
      return null;
    }
  };
  public updateToken = async (
    data: Pick<EmailVerificationToken, "email" | "otp">
  ): Promise<EmailVerificationToken | null> => {
    try {
      const newToken = await db.emailVerifiacitonToken.update({
        where: {
          email: data.email as string,
        },
        data: {
          otp: data.otp as number,
        },
      });
      console.log(newToken);
      if (newToken) {
        return newToken as EmailVerificationToken;
      } else {
        return null;
      }
    } catch (error) {
      //   console.log(error);
      return null;
    }
  };

  public verifyToken = async (
    email: string,
    otp: number
  ): Promise<EmailVerificationToken | null> => {
    try {
      const newToken = await db.emailVerifiacitonToken.findUnique({
        where: {
          email: email as string,
          otp: otp,
        },
      });
      if (newToken) {
        return newToken as EmailVerificationToken;
      } else {
        return null;
      }
    } catch (error) {
      //   console.log(error);
      return null;
    }
  };
}
