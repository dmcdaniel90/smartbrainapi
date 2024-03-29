const express = require("express");
const app = express();
const helmet = require("helmet");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const corsOptions = {
  origin: "https://smartbrain-devinmcdaniel-399f2624a5c3.herokuapp.com",
  optionsSuccessStatus: 200,
};

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Success");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImageSubmit(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen((port = process.env.PORT || 3000), () => {
  console.log(`App running on port ${port}`);
});
