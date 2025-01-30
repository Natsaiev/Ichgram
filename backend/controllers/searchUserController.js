import User from "../models/User.js";

const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        // Ищем пользователя по username
        const user = await User.findOne({ username });

        // Если пользователь не найден
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Если пользователь найден
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { getUserByUsername };