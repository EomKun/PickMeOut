/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_info', {
    profile_photo_link: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    intro_content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'user_info',
    timestamps: true,
    paranoid: true
  });
};
