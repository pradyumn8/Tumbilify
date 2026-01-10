import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Controllers for user Registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // find user with email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        return res.json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

}

// Controllers for user Login  
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // find user with email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        return res.json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// Controller for user Logout
export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((error: any) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    })
    return res.json({ message: 'User logged out successfully' });
}

// Controller for user verify
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}