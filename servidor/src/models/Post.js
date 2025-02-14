const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFjlLQscjGBEFJm2nvByQu_-vOs3TjDcnQA&s',
    },
    backgroundColor: {
      type: DataTypes.STRING,
      defaultValue: '#FFFFFF',
    },
    fontColor: {
      type: DataTypes.STRING,
      defaultValue: '#000000',
    },
    collaborators: {
      type: DataTypes.STRING,
      defaultValue: 'Dev',
    },
    publicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft',
    }
  }, {
    timestamps: false,
  });
};