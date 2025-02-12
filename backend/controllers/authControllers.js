import User from "../models/User.js";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
    const { username, email, fullName, password } = req.body;
    console.log("Received data for registration:", req.body);

    try {
        const userExists = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        console.log("User exists:", userExists);

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            username,
            email,
            fullName,
            password
        });


        await newUser.save();
        console.log("User saved:", newUser);


        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });


        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
            }
        });

    } catch (error) {
        console.log('Error registering user', error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const loginUser = async (req, res) => {
    console.log(req.body);

    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.log('Error logging in user', error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export { registerUser, loginUser };


