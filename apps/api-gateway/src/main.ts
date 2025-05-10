import express from "express";
import * as path from "path";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swwaggerUi from "swagger-ui-express";
import axios from "axios";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../../../packages/error-handler/error-middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());
app.set("trust proxy", 1);

//Apply rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: any) => {
    // Limit each IP to 100 requests per windowMs
    if (req.headers["x-api-key"] === process.env.API_KEY) {
      return 1000;
    }
    return 100;
  }, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req: any) => req.ip,
});

app.use(limiter);
app.use(errorMiddleware);

app.get("/gateway-health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});

app.use("/", proxy("http://localhost:6001"));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);
