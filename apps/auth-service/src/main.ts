import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:6001",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

const server = app.listen(port, host, () => {
  console.log(`Auth service is running at http://${host}:${port}`);
});

server.on("error", (error) => {
  console.error("Error starting server:", error);
});
