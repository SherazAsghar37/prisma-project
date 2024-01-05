"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const JWT_Utils_1 = __importDefault(require("../utils/JWT_Utils"));
const tsyringe_1 = require("tsyringe");
let AuthMiddleware = class AuthMiddleware {
    constructor(_JWT_UTILS) {
        this._JWT_UTILS = _JWT_UTILS;
        this.authenticateLocal = (req, res, next) => {
            const _JWT_UTILS = new JWT_Utils_1.default();
            passport_1.default.authenticate("local", (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(HttpStatusCode_1.default.BAD_REQUEST).json("some error");
                }
                return res.status(HttpStatusCode_1.default.OK).json({
                    token: _JWT_UTILS.generateToken(user),
                });
            })(req, res, next);
        };
        this.authenticateGoogle = (req, res, next) => {
            passport_1.default.authenticate("google", (err, user, info) => {
                console.log(err);
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(HttpStatusCode_1.default.BAD_REQUEST).json("some error");
                }
                console.log("google => ", user);
                return res.status(HttpStatusCode_1.default.OK).json({
                    token: this._JWT_UTILS.generateToken(user),
                });
            })(req, res, next);
        };
        this.googleCallback = (req, res, next) => {
            passport_1.default.authenticate("google", (err, user, info) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if (!user) {
                    return res.status(HttpStatusCode_1.default.BAD_REQUEST).json("some error");
                }
                const token = this._JWT_UTILS.generateToken(user);
                res.render("GoogleLoginSuccess.ejs", {
                    token: token,
                });
            })(req, res, next);
        };
        this.facebookCallback = (req, res, next) => {
            passport_1.default.authenticate("facebook", (err, user, info) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if (!user) {
                    return res.status(HttpStatusCode_1.default.BAD_REQUEST).json("some error");
                }
                const token = this._JWT_UTILS.generateToken(user);
                res.render("GoogleLoginSuccess.ejs", {
                    token: token,
                });
            })(req, res, next);
        };
        this.isLoggedIn = (req, res, next) => {
            try {
                const token = this._JWT_UTILS.extractToken(req);
                const decodedToken = this._JWT_UTILS.verifyToken(token);
                if (!decodedToken) {
                    return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json({
                        message: "Invalid token",
                    });
                }
                req.user = decodedToken;
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.isGoogleConnected = () => { };
        this.isFacebookConnected = () => { };
    }
};
AuthMiddleware = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(JWT_Utils_1.default)),
    __metadata("design:paramtypes", [JWT_Utils_1.default])
], AuthMiddleware);
exports.default = AuthMiddleware;
