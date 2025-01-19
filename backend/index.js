import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import cors from 'cors';


const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:4000', // Разрешаем запросы с фронтенда
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
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