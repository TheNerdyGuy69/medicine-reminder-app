const express = require("express")
const dotenv = require("dotenv")
const Medicine = require("./models/Medicine");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api", (req,res)=>{
    res.send("API is running!");
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
});