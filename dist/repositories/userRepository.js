"use strict";
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
const db_server_1 = __importDefault(require("../utils/db.server"));
class UserRepository {
    constructor() {
        this.createByLocal = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield db_server_1.default.user.create({
                    data: {
                        email: data.email,
                        password: data.password,
                        author: {
                            create: {},
                        },
                    },
                });
                if (newUser) {
                    return newUser;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return null;
            }
        });
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield db_server_1.default.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (newUser) {
                    return newUser;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = UserRepository;
