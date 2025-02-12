import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import protect from "./middleware/authMiddleware.js";



const PORT = process.env.PORT || 3000;
const app = express();


const corsOptions = {
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/user", protect, userRoutes);




mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(" Error connecting to MongoDB:", error));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));