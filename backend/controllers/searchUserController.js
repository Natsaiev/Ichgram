import User from "../models/User.js";

const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {

        const user = await User.findOne({ username });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { getUserByUsername };