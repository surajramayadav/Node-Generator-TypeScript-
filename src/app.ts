
import express from "express";
const app = express();
import errorMiddleware from "./middleware/error";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
const user = require("./route/userRoute"), userAuth = require("./route/userAuthRoute")

const corsOptions = {
  // origin: "http://localhost:8081",
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: false }));
app.use(express.static(__dirname + "/upload"));

app.use("/api/v1/user", user), app.use("/api/v1/user/auth", userAuth)

// app.get("/logo.png", (req, res) => {
//   res.sendFile(path.join(__dirname, "logo.png"));
// });
app.get("/", (req, res) => {
  res.send('Working...');
});
// Middleware For error
app.use(errorMiddleware);

export default app