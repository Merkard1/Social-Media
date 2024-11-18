const fs = require("fs");
const path = require("path");

const cors = require("cors");
const express = require("express"); // Ensure express is installed
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
server.use(cors());

// Add a delay to all requests
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500);
  });
  next();
});

// Use body parser middleware to handle JSON requests
server.use(express.json());

// Middleware to check for authorization header
server.use((req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Auth Error" });
  }
  next();
});

// Handle login route without authorization
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "db.json"), "utf-8"),
  );
  const { users } = db;

  const userFromDB = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (userFromDB) {
    const token = jwt.sign(
      { username: userFromDB.username },
      "your-secret-key",
      { expiresIn: "1h" },
    );
    return res.status(200).json({ ...userFromDB, token });
  }

  return res.status(403).json({ message: "Auth Error" });
});

// Default middleware
server.use(jsonServer.defaults());
server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log("Server connected to: ", PORT);
});
