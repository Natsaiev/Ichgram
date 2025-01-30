import User from "../models/User.js";

const getProfile = async (req, res) => {
    try {
        console.log("Получен запрос на профиль от пользователя:", req.user);

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user._id).select("-password"); // Получаем пользователя по ID
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            followersCount: user.followersCount,
            followingCount: user.followingCount
        });
    } catch (error) {
        console.error("Ошибка при получении профиля:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const updateProfile = async (req, res) => {
    console.log("🔹 Запрос на обновление профиля:", req.body);
    console.log("🔹 req.user:", req.user); // Проверяем, что `req.user` передан из `protect`

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const userId = req.user._id; // Используем `_id`, так как mongoose хранит ID так

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Обновляем данные профиля
        user.username = req.body.username || user.username;
        user.bio = req.body.bio || user.bio;
        user.avatar = req.body.avatar || user.avatar;

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("❌ Ошибка при обновлении профиля:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

export { getProfile, updateProfile };