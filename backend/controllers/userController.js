import User from "../models/User.js";

const getProfile = async (req, res) => {
    try {
        console.log("Получен запрос на профиль от пользователя:", req.user?._id);

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            followersCount: user.followersCount,
            followingCount: user.followingCount
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



const updateProfile = async (req, res) => {
    try {
        const { username, bio, avatar } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, bio, avatar },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "Пользователь не найден" });

        res.json({
            username: updatedUser.username,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar
        });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при обновлении профиля" });
    }
};

export { getProfile, updateProfile };