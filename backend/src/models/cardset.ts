import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

const CardSet = sequelize.define(
  "CardSet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    visibility: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "private",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    tableName: "card_sets",
  }
);

User.hasMany(CardSet, { foreignKey: "userId" });
CardSet.belongsTo(User, { foreignKey: "userId" });

export default CardSet;
