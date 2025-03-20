import { Request, Response } from "express";
import User from "@models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const existingCustomer = await User.findOne({ where: { email } });
    if (existingCustomer) {
      res.status(400).json({ message: "The email already exist" });
      return;
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json({ message: "User created succefully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({ error: "Incorrect email or password" });
      return;
    }
    res.status(200).json({
      message: "Login successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
};
