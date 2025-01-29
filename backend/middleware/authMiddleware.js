import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    console.log("🔹 JWT_SECRET из .env:", process.env.JWT_SECRET);
    console.log("Request Headers:", req.headers);

    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        console.log("Extracted Token:", token);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);

            req.user = await User.findById(decoded.id).select("-password");
            console.log("User from DB:", req.user);

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Error verifying token:", error);

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }

            return res.status(401).json({ message: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Authorization token not found" });
    }
};

export default protect;

