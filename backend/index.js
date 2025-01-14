import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/auth/', authRoutes);

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})