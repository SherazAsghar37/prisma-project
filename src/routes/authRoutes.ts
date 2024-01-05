import express from "express";
import AuthController from "../controllers/authController";
import { container } from "tsyringe";
import Validation from "../middlewares/validation";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import passport from "passport";
import Verification from "../middlewares/verification";

const authRouter = express.Router();
const validation = container.resolve(Validation);
const verification = container.resolve(Verification);
const authController = container.resolve(AuthController);
const authMiddleware = container.resolve(AuthMiddleware);

authRouter
  .route("/signup/password")
  .post(validation.userLoginValidator, verification.sendVerification);

authRouter
  .route("/signup/password/verify")
  .post(authController.otpVerification, authController.signUp);
authRouter
  .route("/login/password")
  .post(
    validation.userLoginValidator,
    authMiddleware.authenticateLocal,
    authController.login
  );

authRouter.route("/login/google").get(passport.authenticate("google"));

authRouter.route("/login/google/callback").get(authMiddleware.googleCallback);

authRouter.route("/login/facebook").get(passport.authenticate("facebook"));

authRouter
  .route("/login/facebook/callback")
  .get(authMiddleware.facebookCallback);

export default authRouter;
