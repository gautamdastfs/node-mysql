import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export const createUserTable = async () => {
  await User.sync();
};

export const insertUser = async (name, email) => {
  const user = await User.create({ name, email });
  return user.toJSON();
};

export const findAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    order: [["id", "DESC"]],
  });
};

export const findUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
  });
  return user ? user.toJSON() : null;
};

export const updateUserById = async (id, name, email) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update({ name, email });
  return user.toJSON();
};

export const deleteUserById = async (id) => {
  const deletedCount = await User.destroy({
    where: { id },
  });
  return deletedCount > 0;
};
