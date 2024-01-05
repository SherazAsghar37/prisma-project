import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import { inject, singleton } from "tsyringe";
import UserService from "../services/userService";
import MailService from "../services/MailService";

interface CustomRequest extends Request {
  err?: any;
}

@singleton()
export default class AuthController {
  constructor(
    @inject(MailService)
    private readonly _mailService: MailService,

    @inject(UserService)
    private readonly _userServices: UserService
  ) {}
  public login = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.err) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Somethign went wrong" });
    }
    return res.status(HttpStatusCode.OK).json({ message: "Login Done" });
  };

  public otpVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { otp, email } = req.body;
    otp = parseInt(otp);
    try {
      if (!otp || !email) {
        return res.render("MailVerification", {
          response: " Otp required",
          email: email,
        });
      }
      const optToken = await this._mailService.verifyToken(email, otp);
      if (!optToken) {
        return res.render("MailVerification", {
          response: "Wrong  otp",
        });
      }
      req.body.password = optToken.password;
      return next();
    } catch (error) {
      return res.render("MailVerification", {
        response: error,
        email: email,
      });
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      await this._userServices.signUpLocal(email, password);
      return res.render("home");
    } catch (error) {
      console.log(error);
      return res.end("Email already exist");
    }
  };
  public googleCallback = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.status(HttpStatusCode.OK).send("");
  };
}
