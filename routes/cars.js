const express = require("express");
const Car = require("../models/Car");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Add a car
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const car = new Car({ user: req.user, title, description, tags, images });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: "Error adding car" });
  }
});

// List cars
router.get("/", authenticate, async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cars" });
  }
});

// Other routes (update, delete) follow a similar pattern
module.exports = router;
