const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  userEmail: { type: String, required: true },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
