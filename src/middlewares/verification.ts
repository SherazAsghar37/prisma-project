import { NextFunction } from "express";
import { singleton, inject } from "tsyringe";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Request, Response } from "express";
import MailService from "../services/MailService";

@singleton()
export default class Verification {
  constructor(
    @inject(MailService)
    private readonly _mailService: MailService
  ) {}

  public sendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Email and password and name is required" });
      }
      await this._mailService.sendVerificationEmail(email, password);
      return res.redirect(`/api/verify?email=${email}`);
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  };
}
