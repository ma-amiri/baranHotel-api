import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import roomsRoute from "./controllers/rooms_router.js";
import usersRoute from "./controllers/user_router.js";
import registerRoute from "./controllers/register_router.js";
import cookieParser from "cookie-parser";
import hotelsRoute from "./controllers/hotels_router.js";
import sequelize from "./config/connection.js";
import path from "path";
import morgan from "morgan";
import "./config/database.js";
import "./nodemailer/nodemailer.js";
import multer from "multer";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(errorHandler);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.get("/items/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const item = {
    id: itemId,
    name: "Sample Item",
    description: "This is a sample item fetched from the database.",
  };

  res.json(item);
});

app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
// app.get("/upload",(req,res) => {
//    res.render("upload")
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/pulic/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res, next) {
    const file=req.file
  res.status(200).json(file.filename);
});

// fixme: error handler
app.use((err, req, res, next) => {
  console.error("myerror", err.stack);
  res.status(500).send("Something broke!");
});

export default app;
