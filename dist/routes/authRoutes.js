"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../middlewares/validation"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const authRouter = express_1.default.Router();
const validation = tsyringe_1.container.resolve(validation_1.default);
const authController = tsyringe_1.container.resolve(authController_1.default);
const authMiddleware = tsyringe_1.container.resolve(AuthMiddleware_1.default);
authRouter
    .route("/signup/password")
    .get(validation.userLoginValidator, authController.signUp);
authRouter
    .route("/login/password")
    .get(validation.userLoginValidator, authMiddleware.authenticateLocal, authController.signUp);
exports.default = authRouter;
