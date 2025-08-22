import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "supersecretkey";

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error: any) {
    console.error("Error in admin signup:", error);
    return res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.error("Error in admin login:", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      return res.status(200).json({
        message: "User fetched successfully",
        status: 200,
        user,
      });
    }

    const users = await User.find();

    return res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      count: users.length,
      users,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users",
      status: 500,
      error: error.message,
    });
  }
};
