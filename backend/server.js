import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";

//CREATE EXPRESS APP AND HTTP SERVER
const app = express();

const server = http.createServer(app);

//MIDDLEWARE SETUP
app.use(express.json({ limit: "4mb" }));
app.use(cors());

//ROUTES SETUP
app.use("/api/status", (req, res) => {
  res.send("Server is live");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//CONNECT TO MONGODB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
