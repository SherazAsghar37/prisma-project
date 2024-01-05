import express from "express";

const staticRouter = express.Router();
staticRouter.route("/home").get((req, res) => {
  return res.render("home");
});
staticRouter.route("/signup").get((req, res) => {
  return res.render("signup");
});

staticRouter.route("/login").get((req, res) => {
  return res.render("login");
});

staticRouter.route("/verify").get(async (req, res) => {
  const email = await req.query.email;
  return res.render("MailVerification", {
    email: email,
  });
});
export default staticRouter;
