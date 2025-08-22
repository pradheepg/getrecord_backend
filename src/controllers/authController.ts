import { Request, Response } from "express";
import{config} from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);  
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
        }

        // console.log(password, user.password);
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password == user.password;
        if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
        { id: user._id, email: user.email }, 
        config.JWT_SECRET,
        { expiresIn: "1h" } 
        );

        res.json({ token });
    } catch (err) {
    res.status(400).json({ error: err });
  }
};
