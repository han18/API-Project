import "./localEnv.js";
import express from "express";
import morgan from "morgan";
import { conn } from "./db/conn.js";
conn();
import usersRoutes from "./routes/users.js";
// import cors from "cors";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

const PORT = process.env.PORT || 3100;
console.log(process.env.ATLAS_URI);

// this links the router files of users
app.use("/api/users", usersRoutes);

//==========================
// Main root
app.get("/", (req, res) => {
  res.send("This is the main root!");
});

app.listen("PORT", () => {
  console.log(`Server working on PORT: ${PORT}`);
});
