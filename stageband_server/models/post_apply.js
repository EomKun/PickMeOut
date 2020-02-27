/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_apply', {
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    video_link: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'post_apply',
    timestamps: true,       // createAt, updatedAt
    paranoid: true          // deletedAt
  });
};
