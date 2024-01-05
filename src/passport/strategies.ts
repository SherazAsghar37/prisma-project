import { inject, singleton } from "tsyringe";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import UserRepository from "../repositories/userRepository";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Request } from "express";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import GoogleRepository from "../repositories/GoogleRepository";
import FacbookRepository from "../repositories/FacebookRepository";

@singleton()
export class Strategies {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository,
    @inject(GoogleRepository)
    private readonly _googleRepository: GoogleRepository,
    @inject(FacbookRepository)
    private readonly _facebookRepository: FacbookRepository
  ) {
    this.localStartegy();
    this.googleStrategy();
    this.facebookStrategy();
  }

  private readonly localStartegy = () => {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
        },
        async (email, password, done) => {
          try {
            const user = await this._userRepository.getByCreadentials({
              email,
              password,
            });
            if (!user) {
              return done(
                `Error: User not found, StatusCode : ${HttpStatusCode.NOT_FOUND}`,
                false
              );
            }
            if (user) {
              return done(null, user);
            } else {
              return done(
                `Error: Wrong password, StatusCode : ${HttpStatusCode.BAD_REQUEST}`,
                false
              );
            }
          } catch (error) {
            return done(
              `Error: ${error}, StatusCode : ${HttpStatusCode.INTERNAL_SERVER_ERROR}`,
              false
            );
          }
        }
      )
    );
  };

  private readonly googleStrategy = () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_SECRET_KEY as string,
          callbackURL: "/api/login/google/callback",
          passReqToCallback: true,
          scope: ["email", "profile"],

          // passReqToCallback: true,
        },
        async (
          request: Request,
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: VerifyCallback
        ) => {
          try {
            // Check if a user with the provided Google ID exists
            const existingUser = await this._userRepository.getByGoogleId(
              profile.id
            );
            console.log(existingUser);
            if (existingUser) {
              // User with Google ID already exists
              return done(null, existingUser);
            }

            const email = profile.emails ? profile.emails[0].value : "";

            // Check if a user with the provided email exists
            const userWithEmail = await this._userRepository.getByEmail(email);

            if (userWithEmail) {
              // User with the provided email exists, link Google ID to the existing user
              userWithEmail.google_id = profile.id;

              // Update the user in the database
              await this._googleRepository.createGoogleForUser(
                userWithEmail.uid,
                {
                  google_id: profile?.id,
                  access_token: accessToken,
                  refresh_token: refreshToken ?? "",
                }
              );
              const updatedUser = await this._userRepository.getByGoogleId(
                profile.id
              );
              return done(null, updatedUser);
            }

            // User does not exist, create a new user with Google ID

            // Create the new user in the database
            const createdUser = await this._googleRepository.createUserByGoogle(
              email,
              {
                access_token: accessToken,
                google_id: profile?.id,
                refresh_token: refreshToken ?? "",
              }
            );

            return done(null, createdUser);
          } catch (error) {
            console.error(error); // Log the error for debugging
            return done(
              `Message : Google Authentication failed , Error: ${error}, StatusCode : ${HttpStatusCode.INTERNAL_SERVER_ERROR}`,
              false
            );
          }
        }
      )
    );
  };

  private readonly facebookStrategy = () => {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_CLIENT_ID as string,
          clientSecret: process.env.FACEBOOK_SECRET_KEY as string,
          callbackURL: "http://localhost:8000/api/login/facebook/callback", // Adjust the callback URL
          profileFields: [
            "id",
            "displayName",
            "name",
            "gender",
            "profileUrl",
            "emails",
          ],
          passReqToCallback: true,
        },
        async (
          request: Request,
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: VerifyCallback
        ) => {
          try {
            // Check if a user with the provided Facebook ID exists
            const email: string = profile.emails
              ? profile.emails[0].value
              : profile._json.email
              ? profile._json.email
              : "";
            console.log(profile);
            const existingUser = await this._userRepository.getByFacebookId(
              profile.id
            );

            if (existingUser) {
              // User with Facebook ID already exists
              return done(null, existingUser);
            }

            // Check if a user with the provided email exists
            const userWithEmail = await this._userRepository.getByEmail(email);

            if (userWithEmail) {
              // User with the provided email exists, link Facebook ID to the existing user
              userWithEmail.facebook_id = profile.id;

              // Update the user in the database
              await this._facebookRepository.createFacebookForUser(
                userWithEmail.uid,
                {
                  facebook_id: profile?.id,
                  access_token: accessToken,
                  refresh_token: refreshToken ?? "",
                }
              );
              const updatedUser = await this._userRepository.getByFacebookId(
                profile.id
              );
              return done(null, updatedUser);
            }

            // User does not exist, create a new user with Facebook ID

            // Create the new user in the database
            const createdUser =
              await this._facebookRepository.createUserByFacebook(email, {
                access_token: accessToken,
                facebook_id: profile?.id,
                refresh_token: refreshToken ?? "",
              });

            return done(null, createdUser);
          } catch (error) {
            console.error(error); // Log the error for debugging

            return done(
              `Message : Facebook Authentication failed , Error: ${error}, StatusCode : ${HttpStatusCode.INTERNAL_SERVER_ERROR}`,
              false
            );
          }
        }
      )
    );
  };
}
