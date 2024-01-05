import "reflect-metadata";
import AppMiddlewares from "./middlewares/AppMiddlewares";
import authRouter from "./routes/authRoutes";
import staticRouter from "./routes/static";
import path from "path";
import PassportConfig from "./passport/PassportConfig";
const port = process.env.PORT || 8000;

const app = AppMiddlewares();

new PassportConfig(app);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/api", authRouter);
app.use("/api", staticRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
