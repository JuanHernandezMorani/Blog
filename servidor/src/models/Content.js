const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('content', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM('paragraph', 'list', 'image'),
        allowNull: false,
      },
      data: {
        type: DataTypes.TEXT,
        defaultValue: "No data provided",
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isSubtitle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sections',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
    }, {
      timestamps: false,
    });
  };