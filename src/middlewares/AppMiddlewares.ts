import express, { Application, Request, Response } from "express";
import monitor from "express-status-monitor";
import compression from "compression";
import session from "express-session";
import cors from "cors";
import NodeMailer from "../nodemailer/NodeMailer";
function AppMiddlewares() {
  const app: Application = express();
  const statusMonitor = monitor({
    path: "/status",
  });
  app.use(statusMonitor);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({}));
  app.use(
    compression({
      level: -1,
      memLevel: 9,
      threshold: 0,
      filter: (req: Request, res: Response) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return true;
      },
    })
  );
  app.use(
    session({
      // this should be changed to something cryptographically secure for production
      secret: "Secret_key",
      resave: false,
      saveUninitialized: false,
    })
  );
  new NodeMailer();
  return app;
}
export default AppMiddlewares;
