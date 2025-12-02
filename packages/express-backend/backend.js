// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getIncidents } from "./incident-services.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//express-backend/.env
dotenv.config({ path: path.join(__dirname, ".env") });

import {
  getUsers,
  findUserById,
  addUser,
  findUserByNameAndJob,
  deleteUserById,
  findUserByUsername,
} from "./user-services.js";

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 8085;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login route
app.options("/login", async (req, res) => {
  const { username, password } = req.body;

  // error check if no username or password are filled out
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await findUserByUsername(username);

    // if there is no user OR password mismatch -> unauthorized
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password"});
    }

    const userObj = user.toObject ? user.toObject() : user;
    const { password: _pw, ...safeUser } = userObj;

    return res.json({
      message: "Login successful",
      user: safeUser,
    });
  }
  catch(err) {
      console.err("Login error:", err);
      return res 
        .status(500)
        .json({ message: "server error during login." });
    }
})

// Register account route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("/register body:", req.body);

  // if the user doesn't provide a username or password then return an error message
  if (!username || !password) {
    return res 
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // check if the username already exists
    const existing = await findUserByUsername(username);
    if (existing) {
      return res 
        .status(409)
        .json({ message: "Username already taken." });
    }

    // if not existing --> add user to DB
    const newUser = await addUser({ username, password });

    const newUserObj = newUser.toObject ? newUser.toObject() : newUser;
    const { password: _pw, ...safeUser } = newUserObj;

    // registration is successful
    return res.status(201).json({
      message: "Registration successful",
      user: safeUser,
    });

    // error checking
  } catch (err) {
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }


});

// Don't allow user to be logged in if they have not signed up
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("/login body:", req.body);

  if (!username || !password) {
    return res 
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // look for user in the DB
    const user = await findUserByUsername(username);

    // if there isn't a user then return an error message
    if (!user) {
      return res 
        .status(401)
        .json({ message: "Invalid username or password." });
    }

    // if the password doesn't match then return an error
    if (user.password !== password) {
      return res  
        .status(401)
        .json({ message: "invalid username or password." });
    }

    // credentials are correct --> success
    const userObj = user.toObject ? user.toObject() : user;
    const { password: _pw, ...safeUser } = userObj;

    return res.json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res 
      .status(500)
      .json({ message: "server error during login. "})
  }


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
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send(err.message));
});

// GET /users/:id fetching the user by mongoDB id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(500).json(err.message));
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
    console.log(`Server listening at http://localhost:${PORT}`),
  );
} catch (err) {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
}

// GET /incidents
app.get("/api/incidents", (req, res) => {
  const { status, severity } = req.query;

  getIncidents({ status, severity })
    .then((incidents) => res.json({ incidents_list: incidents }))
    .catch((err) => res.status(500).send(err.message));
});
