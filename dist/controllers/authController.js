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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const tsyringe_1 = require("tsyringe");
const userService_1 = __importDefault(require("../services/userService"));
let AuthController = class AuthController {
    constructor(_userServices) {
        this._userServices = _userServices;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.error) {
                return res
                    .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                    .json({ message: "Somethign went wrong" });
            }
            return res.status(HttpStatusCode_1.default.OK).json({ message: "Login Done" });
        });
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                if (!email || !password || name)
                    res
                        .status(HttpStatusCode_1.default.BAD_REQUEST)
                        .json({ message: "Email and password and name is required" });
                try {
                    yield this._userServices.signUpLocal(email, password, name);
                    res.status(HttpStatusCode_1.default.OK).json({ message: "user created" });
                }
                catch (error) {
                    next(error);
                }
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
};
AuthController = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(userService_1.default)),
    __metadata("design:paramtypes", [userService_1.default])
], AuthController);
exports.default = AuthController;
