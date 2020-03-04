/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    favCnt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'register'
    },
    video_file: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'posts',
    timestamps: true,		// createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
