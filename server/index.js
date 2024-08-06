import express from "express";

// import cookie from 'cookies-parser'
// cookieParser = require("cookie-parser");
import multer from "multer";
import session from "express-session";
import cookie from "express-session";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import DefaultData from "./default.js";
import DefaultBrands from "./default_brand.js";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cookieParser from "cookie-parser";
import cart from "./model/cart_schema.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = 8001;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(cookie());
app.use(cookieParser());

app.use("/photo", express.static("photo"));

app.use("/", Router);

// cart
// app.use('/api',cart_route);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
await Connection(USERNAME, PASSWORD);

app.listen(port, () => console.log("server is running"));

DefaultData();
DefaultBrands();
