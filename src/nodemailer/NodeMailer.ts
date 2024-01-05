import { singleton } from "tsyringe";
import nodemailer from "nodemailer";

@singleton()
export default class NodeMailer {
  private declare _transporter: nodemailer.Transporter;
  constructor() {
    this.mailConfig();
  }
  public mailConfig = () => {
    try {
      this._transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "sherazasgher37@gmail.com",
          pass: "wrzz gipl duko oirv",
        },
      });
    } catch (error) {
      console.log("Mail Configuration error : ", error);
    }
  };

  public mailer = async (email: string, code: Number) => {
    // send mail with defined transport object
    try {
      return await this._transporter.sendMail({
        from: "sherazasgher37@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Email verification for node-auth", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Your verification code is : ${code}</p>`, // html body
      });
    } catch (error) {
      throw new Error(`Email Sending Error : ${error}`);
    }
  };

  public generateRandomCode = (): Number => {
    const randomDecimal = Math.random();
    const sixDigitCode = Math.floor(randomDecimal * 1000000);
    return sixDigitCode;
  };
}
