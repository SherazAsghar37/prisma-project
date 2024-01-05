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
const db_server_1 = __importDefault(require("./utils/db.server"));
function getAuthors() {
    return [
        {
            full_name: "sheraz",
            bio: "xyz",
            followers_count: 1,
            following_count: 2,
        },
        {
            full_name: "Shahmeer",
            bio: "fas",
            followers_count: 112,
            following_count: 122,
        },
        {
            full_name: "Ali",
            bio: "fsa",
            followers_count: 12,
            following_count: 221,
        },
    ];
}
function getBooks() {
    return [
        {
            title: "string",
            is_fiction: true,
            date_published: new Date(),
        },
        {
            title: "as",
            is_fiction: false,
            date_published: new Date(),
        },
        {
            title: "asf",
            is_fiction: true,
            date_published: new Date(),
        },
    ];
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(getAuthors().map((author) => {
            return db_server_1.default.author.create({
                data: {
                    full_name: author.full_name,
                    followers_count: author.followers_count,
                    following_count: author.following_count,
                    bio: author.bio,
                },
            });
        }));
        let author = yield db_server_1.default.author.findFirst({
            where: {
                full_name: "sheraz",
            },
        });
        console.log(author);
        yield Promise.all(getBooks().map((books) => {
            return db_server_1.default.book.create({
                data: {
                    title: books.title,
                    is_fiction: books.is_fiction,
                    date_published: books.date_published,
                    author_id: author.profile_id,
                },
            });
        }));
    });
}
seed();
