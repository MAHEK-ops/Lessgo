import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors({
  origin: "*",     
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/authRoutes", authRoutes);
app.use("/api/tripRoutes", tripRoutes);
app.use("/api/chatRoutes", chatRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

export default app;
