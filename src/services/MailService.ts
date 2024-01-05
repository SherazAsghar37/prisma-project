import { inject, singleton } from "tsyringe";
import EmailVerificationRepository from "../repositories/EmailVerificationRepository";
import { EmailVerifiacitonToken } from "@prisma/client";
import NodeMailer from "../nodemailer/NodeMailer";

@singleton()
export default class MailService {
  constructor(
    @inject(EmailVerificationRepository)
    private readonly _emailVerificationRepository: EmailVerificationRepository,
    @inject(NodeMailer)
    private readonly _nodeMailer: NodeMailer
  ) {}
  public sendVerificationEmail = async (email: string, password: string) => {
    try {
      const otp = this._nodeMailer.generateRandomCode() as number;
      let dbToken = await this._emailVerificationRepository.updateToken({
        email,
        otp,
      });
      if (!dbToken) {
        dbToken = await this._emailVerificationRepository.crateToken({
          password,
          email,
          otp,
        });
      }
      console.log(otp);
      await this._nodeMailer.mailer(email, otp);

      if (dbToken) {
        return dbToken as EmailVerifiacitonToken;
      } else {
        throw new Error(
          "Custom Error : unable to create email verication token"
        );
      }
    } catch (error) {
      throw new Error(`Critical Error : Something went wrong, ${error}`);
    }
  };

  public verifyToken = async (email: string, otp: number) => {
    try {
      const dbToken = await this._emailVerificationRepository.verifyToken(
        email,
        otp
      );

      if (dbToken) {
        return dbToken as EmailVerifiacitonToken;
      } else {
        throw new Error(
          "Custom Error : unable to create email verication token"
        );
      }
    } catch (error) {
      throw new Error(`Critical Error : Something went wrong, ${error}`);
    }
  };
}
