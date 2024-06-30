import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Solopayne",
    resave: false,
    saveUninitialized: true,
  })
);
const port = 3000;

app.use((req, res, next) => {
  if (!req.session.userName) {
    req.session.userName = "Guest";
  }
  next();
});

app.get("/", (req, res) => {
  res.render("intro.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs", { userName: req.session.userName });
});

app.post("/welcome", (req, res) => {
  const { userName } = req.body;
  req.session.userName = userName || req.session.userName;
  res.render("index.ejs", { userName: req.session.userName });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { userName: req.session.userName });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { userName: req.session.userName });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
