import { Request, Response } from "express";
import User from "@models/userModel";

// destrcuturar lo quev eien del fron endt para poder usarlo
// verfiicar si existe en la base dato, si existe tnocers led digo qye ya exister
// crear el usaruoi y indicnarle que el usuario fuec creado

// para login necesito el body que seria lo que veien del front end
// neceisto buscarlo en la base de dato y si aparece entoncs lo dejo pasar
//  si el usaurio que esta en la base de dato no match di contrasena oincorrecta
// verifca rque la contras esea la mis a

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const existingCustomer = await User.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: "The email already register" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User created succefully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Inccorect password" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }
    return res.status(200).json({ message: "Login succfuelly", user });
  } catch (error) {
    return res.status(500).json({ error: "Error login " });
  }
};
