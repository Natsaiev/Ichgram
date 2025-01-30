import User from "../models/User.js";

const followUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Проверка подписки
        if (currentUser.following.includes(userId)) {
            return res.status(400).json({ message: "You are already following this user" });
        }


        currentUser.following.push(userId);
        await currentUser.save();


        await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } });
        await User.findByIdAndUpdate(userId, { $inc: { followersCount: 1 } });

        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const unfollowUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Проверка подписки
        if (!currentUser.following.includes(userId)) {
            return res.status(400).json({ message: "You are not following this user" });
        }


        currentUser.following = currentUser.following.filter(following => following.toString() !== userId);
        await currentUser.save();


        await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } });
        await User.findByIdAndUpdate(userId, { $inc: { followersCount: -1 } });

        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { followUser, unfollowUser };