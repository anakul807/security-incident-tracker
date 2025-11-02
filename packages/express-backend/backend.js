// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//express-backend/.env
dotenv.config({ path: path.join(__dirname, ".env") });

import {
  getUsers,
  findUserById,
  addUser,
  findUserByNameAndJob,
  deleteUserById
} from "./user-services.js";

const app = express();


app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 8085;

app.get("/", (req, res) =>
 {
    res.send("Hello World!");
 })

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    let query; 

    if (name && job) {
      query = findUserByNameAndJob(name, job);
    } else {
      query = getUsers(name, job);
    }

    query
      .then((users) => res.send({ users_list: users}))
      .catch((err) => res.status(500).send(err.message));
    
});

// GET /users/:id fetching the user by mongoDB id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  findUserById(id)
    .then(user => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch(err => res.status(500).json(err.message));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  addUser(userToAdd)
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserById(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

if (!uri) {
console.error("Missing MONGO_URI in .env");
process.exit(1);
}

try {
await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
console.log("Connected to MongoDB (Atlas)");
app.listen(PORT, () =>
console.log(`Server listening at http://localhost:${PORT}`)
);
} catch (err) {
console.error("MongoDB connection error:", err.message);
process.exit(1);
}




