import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  database: "world",
  username: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const CodeBlock = sequelize.define(
  "codeblocks",
  {
    serial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default CodeBlock;
