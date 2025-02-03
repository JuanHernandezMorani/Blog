module.exports = (sequelize, DataTypes) => {
    sequelize.define('section', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
    }, {
      timestamps: false,
    });
  };