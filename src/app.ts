import "reflect-metadata";
import AppMiddlewares from "./middlewares/AppMiddlewares";
import authRouter from "./routes/authRoutes";
import staticRouter from "./routes/static";
import path from "path";
import PassportConfig from "./passport/PassportConfig";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();
const port = process.env.PORT || 8000;

const app = AppMiddlewares();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
// const upload = multer({ dest: "./uploads" });

new PassportConfig(app);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/api", authRouter);
app.use("/api", staticRouter);
app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.render("home");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
