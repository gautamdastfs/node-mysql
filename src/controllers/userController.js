import { UniqueConstraintError } from "sequelize";
import * as UserModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const newUser = await UserModel.insertUser(name, email);
    return res.status(201).json(newUser);
  } catch (error) {
    if (
      error instanceof UniqueConstraintError ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(409).json({ error: "Email already exists." });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const updatedUser = await UserModel.updateUserById(id, name, email);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (
      error instanceof UniqueConstraintError ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(409)
        .json({ error: "Email already taken by another user." });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const isDeleted = await UserModel.deleteUserById(req.params.id);

    if (!isDeleted) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
