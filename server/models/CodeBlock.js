import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "postgres://codeblocks_0g0b_user:jr7uxTmX3nrQrqBFPMU2zAOiBPlsds0k@dpg-cp5m4221hbls73fi2j1g-a.oregon-postgres.render.com/codeblocks_0g0b",
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const CodeBlock = sequelize.define(
  "codeblocs",
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
