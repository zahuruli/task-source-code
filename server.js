import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import sectorRouter from "./routes/sectorroute.js";
import userRouter from "./routes/userRoute.js";

//esmodulefix:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configuration:
dotenv.config();

//database connect:
connectDB();

//rest object
const app = express();

//api config:

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static path:
app.use(express.static(path.join(__dirname, "./client/dist")));

// routes:
app.use("/api/v1/sector", sectorRouter);
app.use("/api/v1/user", userRouter);

// rest Api:
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });

//Port:

const PORT = process.env.PORT || 8000;
const HostName = "127.0.0.1";

//server listening:

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} at http://${HostName}:${PORT}`
      .bgCyan.red
  );
});
