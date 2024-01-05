"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve("./views"));
const port = process.env.PORT || 8000;
app.use("/api", authRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
