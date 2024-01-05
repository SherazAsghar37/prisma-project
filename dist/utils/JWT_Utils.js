"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatusCode_1 = __importDefault(require("./HttpStatusCode"));
const tsyringe_1 = require("tsyringe");
let JWTUtils = class JWTUtils {
    constructor() {
        this.secret_key = "Happy Birthday sound";
    }
    generateToken(data) {
        return jsonwebtoken_1.default.sign(data, this.secret_key, {
            algorithm: "ES256",
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret_key);
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error(`Error : Token is expired, StatusCode: ${HttpStatusCode_1.default.UNAUTHORIZED}`);
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error(`Error : "Invalid token", StatusCode: ${HttpStatusCode_1.default.UNAUTHORIZED}`);
            }
            else if (error instanceof jsonwebtoken_1.default.NotBeforeError) {
                throw new Error(`Error : "Token not yet active", StatusCode: ${HttpStatusCode_1.default.UNAUTHORIZED}`);
            }
            else {
                throw new Error(`Error :  "Token verification error", StatusCode: ${HttpStatusCode_1.default.INTERNAL_SERVER_ERROR}`);
            }
        }
    }
    extractToken(req) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error(`Error : "Authentication header required", StatusCode: ${HttpStatusCode_1.default.UNAUTHORIZED}`);
        }
        const token = authorization.slice("Bearer ".length);
        if (!token) {
            throw new Error(`Error : "Authentication token is required", StatusCode: ${HttpStatusCode_1.default.UNAUTHORIZED}`);
        }
        return token;
    }
};
JWTUtils = __decorate([
    (0, tsyringe_1.autoInjectable)()
], JWTUtils);
exports.default = JWTUtils;
