/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_file: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'default.jpg'
    }
  }, {
    tableName: 'userinfo',
    timestamps: true,		// createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
