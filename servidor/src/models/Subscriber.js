const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subscriber', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      suscriptionDay: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      timestamps: false,
    });
  };