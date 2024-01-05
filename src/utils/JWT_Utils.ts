import jwt, { JwtPayload } from "jsonwebtoken";
import HttpStatusCode from "./HttpStatusCode";
import { Request } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class JWTUtils {
  private secret_key: jwt.Secret = "Happy Birthday sound";

  public generateToken(data: any) {
    return jwt.sign(data, this.secret_key, {
      algorithm: "HS256",
      // expiresIn: "10d"
    });
  }

  public verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret_key) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error(
          `Error : Token is expired, StatusCode: ${HttpStatusCode.UNAUTHORIZED}`
        );
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error(
          `Error : "Invalid token", StatusCode: ${HttpStatusCode.UNAUTHORIZED}`
        );
      } else if (error instanceof jwt.NotBeforeError) {
        throw new Error(
          `Error : "Token not yet active", StatusCode: ${HttpStatusCode.UNAUTHORIZED}`
        );
      } else {
        // Handle other unexpected errors
        throw new Error(
          `Error :  "Token verification error", StatusCode: ${HttpStatusCode.INTERNAL_SERVER_ERROR}`
        );
      }
    }
  }

  public extractToken(req: Request): string {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error(
        `Error : "Authentication header required", StatusCode: ${HttpStatusCode.UNAUTHORIZED}`
      );
    }
    const token = authorization.slice("Bearer ".length);
    if (!token) {
      throw new Error(
        `Error : "Authentication token is required", StatusCode: ${HttpStatusCode.UNAUTHORIZED}`
      );
    }
    return token;
  }
}
