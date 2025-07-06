const express = require("express")
const dotenv = require("dotenv")
const Medicine = require("./models/Medicine");
const mongoose = require("mongoose");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/medicines/add", async (req, res) => {
  try {
    const { name, time, date, userEmail } = req.body;

    if (!name || !time || !date || !userEmail) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMedicine = new Medicine({ name, time, date, userEmail });
    await newMedicine.save();

    res.status(201).json({ message: "Medicine added successfully", data: newMedicine });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


app.get("/api", (req,res)=>{
    res.send("API is running!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);

});