import User from "../models/User.js";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
    const { username, email, fullName, password } = req.body;
    try {
        const userExists = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({
            username,
            email,
            fullName,
            password
        });

        await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
            }
        });

    } catch (error) {
        console.log('Error registering user', error);
        res.status(500).json({message: "Something went wrong"});
    }

}

export { registerUser };