import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET


const login = async (req, res) => {
   

    const { email, password } = req.body;

    try {
        if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
        }

        const doc = await User.findOne({email})
        if (!doc) {
            return res.status(404).json({error : "User not found"})
        }

        const isMatch = await bcrypt.compare(password , doc.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

         // Generate JWT token
        const payload = { id: doc._id , email: doc.email};
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
            maxAge: 3600000,
        }).json({
            message: "Login successful", data : {
                email : doc.email
            }})
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const verifySession = async (req, res) => {
    try {
        const docUser = await User.findById(req.user.id)
        if (!docUser) {
            return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
        }

        return res.json({
            message: "Session valid", data : {
                email : docUser.email
            }})
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Session expired or invalid. Please login again.' });
    }
}

const logout = async (req, res) => {
    return res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    }).json({ message: 'Logout successfull', })
}

export { login , verifySession , logout}