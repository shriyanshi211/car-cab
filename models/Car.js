const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }], // Array of image URLs
});

module.exports = mongoose.model("Car", CarSchema);
